"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  LuSend,
  LuGithub,
  LuLinkedin,
  LuCircleCheck,
  LuCircleAlert,
  LuLoaderCircle,
} from "react-icons/lu";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { OriginButton } from "@/components/ui/origin-button";
import { CONTACT } from "@/lib/content";

const SOCIAL_ICONS = { github: LuGithub, linkedin: LuLinkedin } as const;

type Status = "idle" | "loading" | "success" | "error";
type FieldKey = "name" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Length caps — mirrored on the server (app/api/contact/route.ts). The client
// caps stop most abuse before a round-trip; the server enforces regardless.
const LIMITS: Record<FieldKey, number> = { name: 80, email: 254, message: 4000 };

// Shown when the message can't be delivered for reasons the sender can't see
// (network dropped, server trouble). Names a cause and points to a live escape
// hatch — the LinkedIn/GitHub links sit right beside this form.
const SEND_FALLBACK =
  "Your message didn't send — the connection may have dropped. Give it another try, or reach me on LinkedIn.";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<FieldKey[]>([]);

  // Focus targets for jumping the user to the first field that needs fixing.
  const fieldRefs = useRef<
    Partial<Record<FieldKey, HTMLInputElement | HTMLTextAreaElement | null>>
  >({});
  // In-flight request, so we can abort on unmount or when a newer submit wins.
  const abortRef = useRef<AbortController | null>(null);
  // Honeypot: hidden from humans, tempting to bots. Read at submit — a non-empty
  // value means a bot, and the server drops it. See app/api/contact/route.ts.
  const honeypotRef = useRef<HTMLInputElement>(null);
  // When the form became interactive. A submit far too soon after this is a bot;
  // the server checks the elapsed time we send alongside the message.
  const mountedAt = useRef(0);

  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Client-side validation mirrors the server checks so obvious mistakes are
  // caught before a round-trip. The server re-validates regardless. Returns the
  // message plus which fields to flag/focus, or null when the form is valid.
  const validate = (): { message: string; fields: FieldKey[] } | null => {
    const keys: FieldKey[] = ["name", "email", "message"];
    const missing = keys.filter((k) => !form[k].trim());
    if (missing.length) {
      return {
        message: "Please fill in your name, email, and message.",
        fields: missing,
      };
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      return {
        message: "Please enter a valid email address.",
        fields: ["email"],
      };
    }
    return null;
  };

  // Update a field, clear its invalid flag, and dismiss a stale error as soon
  // as the user starts correcting it.
  const updateField = (key: FieldKey, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setInvalid((prev) => prev.filter((k) => k !== key));
    if (status === "error") {
      setStatus("idle");
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const problem = validate();
    if (problem) {
      setStatus("error");
      setError(problem.message);
      setInvalid(problem.fields);
      // Take keyboard / screen-reader users straight to the first problem.
      fieldRefs.current[problem.fields[0]]?.focus();
      return;
    }

    setInvalid([]);
    setStatus("loading");
    setError(null);

    // Supersede any in-flight request so a slow earlier send can't overwrite
    // the result of this one.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          // Anti-spam signals — validated server-side, invisible to real users.
          company: honeypotRef.current?.value ?? "",
          elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : 0,
        }),
      });

      if (!res.ok) {
        // 4xx means the sender can fix it (e.g. an address we couldn't read):
        // show the server's specific reason. 5xx is on our side: fall back to a
        // message that names a cause and offers another way to reach out.
        const data = await res.json().catch(() => null);
        const reason =
          res.status < 500 && typeof data?.error === "string"
            ? data.error
            : SEND_FALLBACK;
        setStatus("error");
        setError(reason);
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      // Aborted (unmount or a newer submit) — leave state to the winner.
      if (err instanceof DOMException && err.name === "AbortError") return;
      // Request never reached the server (offline, DNS, CORS) — same fallback.
      setStatus("error");
      setError(SEND_FALLBACK);
    }
  };

  const field =
    "w-full rounded-lg border bg-surface-2/60 px-4 py-3 text-sm text-text placeholder:text-muted transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60";
  // Border + ring color swing to the error token when a field is flagged, so
  // the invalid state reads without relying on the announced message alone.
  const fieldClass = (key: FieldKey) =>
    `${field} ${
      invalid.includes(key)
        ? "border-error focus:border-error focus:ring-error/30"
        : "border-line focus:border-accent focus:ring-accent/30"
    }`;
  const describedBy = (key: FieldKey) =>
    invalid.includes(key) ? "contact-error" : undefined;

  const loading = status === "loading";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        path="contact"
        title="Let's build something"
        intro="Have a role or a project in mind? I'm always up for a conversation."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Intro + public social links (no personal email/phone/location) */}
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
            <p className="font-mono text-xs text-accent/70">{"// reach out"}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Drop a message using the form and it lands straight in my inbox —
              I usually reply within a day or two. Prefer a platform? Find me on
              the links below.
            </p>

            <div className="mt-auto flex gap-3 border-t border-line pt-6">
              {CONTACT.socials.map((social) => {
                const Icon =
                  SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface/60 text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {Icon && <Icon size={19} />}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Contact form — posts to the server-side /api/contact route */}
        <Reveal delay={100} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-8"
          >
            {/* Honeypot — moved offscreen, out of tab order, hidden from screen
                readers. Real users never see or fill it; bots do, and the server
                silently drops any submission that carries a value here. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                ref={honeypotRef}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-xs text-muted"
                >
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={LIMITS.name}
                  autoComplete="name"
                  disabled={loading}
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  ref={(el) => {
                    fieldRefs.current.name = el;
                  }}
                  aria-invalid={invalid.includes("name") || undefined}
                  aria-describedby={describedBy("name")}
                  className={fieldClass("name")}
                  placeholder="Jane Recruiter"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-xs text-muted"
                >
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={LIMITS.email}
                  autoComplete="email"
                  disabled={loading}
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  ref={(el) => {
                    fieldRefs.current.email = el;
                  }}
                  aria-invalid={invalid.includes("email") || undefined}
                  aria-describedby={describedBy("email")}
                  className={fieldClass("email")}
                  placeholder="jane@company.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs text-muted"
              >
                message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={LIMITS.message}
                disabled={loading}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                ref={(el) => {
                  fieldRefs.current.message = el;
                }}
                aria-invalid={invalid.includes("message") || undefined}
                aria-describedby={describedBy("message")}
                className={`${fieldClass("message")} resize-y`}
                placeholder="Tell me about the role or project…"
              />
            </div>

            <OriginButton type="submit" loading={loading} className="mt-5">
              {loading ? (
                <>
                  <LuLoaderCircle size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <LuSend size={16} />
                  Send message
                </>
              )}
            </OriginButton>

            {/* Status region — polite live updates for assistive tech */}
            <div aria-live="polite" className="mt-4 min-h-5">
              {status === "success" && (
                <p className="flex items-start gap-2 text-sm text-accent">
                  <LuCircleCheck size={16} className="mt-0.5 shrink-0" />
                  Message sent — I&apos;ll get back to you within a day or two.
                </p>
              )}
              {status === "error" && error && (
                <p
                  id="contact-error"
                  className="flex items-start gap-2 text-sm text-error"
                >
                  <LuCircleAlert size={16} className="mt-0.5 shrink-0" />
                  {error}
                </p>
              )}
              {status !== "success" && status !== "error" && (
                <p className="font-mono text-xs text-muted">
                  Your message goes straight to my inbox — nothing&apos;s stored on this site.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
