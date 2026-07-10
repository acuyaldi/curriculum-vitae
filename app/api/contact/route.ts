import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimum time (ms) between the form becoming interactive and a submit. Humans
// filling three fields never beat this; bots that POST instantly do.
const MIN_SUBMIT_MS = 2500;

// Per-IP rate limit, built once per server instance. Only when Upstash is
// configured — absent env (e.g. local dev, or a deploy without it) skips
// limiting while the honeypot/timing/origin defenses stay active.
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(3, "10 m"),
        prefix: "contact",
        analytics: true,
      })
    : null;

// Real client IP behind Vercel's proxy. x-forwarded-for is a comma list; the
// first entry is the originating client.
function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// A same-origin browser fetch always sends an Origin header that matches the
// request Host. Cross-site POSTs (curl scripts, other pages) fail this. Works
// across Vercel preview URLs since both values track the deployment's own host.
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // Reject cross-site POSTs before doing any work.
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We couldn't read your message. Please try again." },
      { status: 400 },
    );
  }

  const { name, email, message, company, elapsedMs } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    company?: unknown;
    elapsedMs?: unknown;
  };

  // Silent spam drops: return 200 so a bot learns nothing. A human never trips
  // these — the honeypot is invisible and the timing gate is far below a real
  // fill. Log server-side so a false positive is at least traceable.
  if (typeof company === "string" && company.trim() !== "") {
    console.warn("Contact: honeypot filled — dropped.");
    return NextResponse.json({ success: true }, { status: 200 });
  }
  if (typeof elapsedMs === "number" && elapsedMs > 0 && elapsedMs < MIN_SUBMIT_MS) {
    console.warn(`Contact: submitted in ${elapsedMs}ms (< ${MIN_SUBMIT_MS}) — dropped.`);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Per-IP rate limit — runs after the free local checks so honeypot/timing
  // bots never spend Redis quota. Fail open: an Upstash hiccup must not block a
  // real message.
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(getClientIp(request));
      if (!success) {
        return NextResponse.json(
          {
            error:
              "Too many messages from this connection. Please wait a few minutes and try again.",
          },
          { status: 429 },
        );
      }
    } catch (err) {
      console.error("Rate limit check failed:", err);
    }
  }

  // Validate: all three fields required, and email must look like an address.
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Length caps mirror the client field limits (components/Contact.tsx). Guard
  // here too — a direct POST can bypass the browser maxLength entirely.
  if (
    name.trim().length > 80 ||
    email.trim().length > 254 ||
    message.trim().length > 4000
  ) {
    return NextResponse.json(
      { error: "That message is longer than the form accepts. Please shorten it." },
      { status: 400 },
    );
  }

  // Fail gracefully (500) if the deployment hasn't configured its env yet,
  // rather than throwing an opaque error. Log which var is missing so a Vercel
  // 500 points straight at the unset environment variable.
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TARGET_EMAIL) {
    const missing = [
      !process.env.RESEND_API_KEY && "RESEND_API_KEY",
      !process.env.CONTACT_TARGET_EMAIL && "CONTACT_TARGET_EMAIL",
    ]
      .filter(Boolean)
      .join(", ");
    console.error(`Contact: email not configured — missing ${missing}.`);
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  // Constructed here (not at module scope) so a missing key can't throw at
  // import time — which would break `next build` on an unconfigured deploy.
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@rizvialdicv.web.id",
      to: process.env.CONTACT_TARGET_EMAIL,
      replyTo: cleanEmail,
      subject: `New message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p style="margin:0"><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
          <p style="margin:0"><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p style="margin:16px 0 4px"><strong>Message:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(cleanMessage)}</p>
        </div>
      `,
    });

    // Resend reports send failures via the returned `error`, not by throwing.
    if (error) {
      console.error("Resend send failed:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Resend threw:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
