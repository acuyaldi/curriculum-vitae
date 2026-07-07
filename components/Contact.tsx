"use client";

import { useState, type FormEvent } from "react";
import { LuMail, LuPhone, LuMapPin, LuSend, LuGithub, LuLinkedin } from "react-icons/lu";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { OriginButton } from "@/components/ui/origin-button";
import { CONTACT } from "@/lib/content";

const SOCIAL_ICONS = { github: LuGithub, linkedin: LuLinkedin } as const;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // UI-only: compose a mailto so the message opens in the visitor's mail client.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-lg border border-line bg-surface-2/60 px-4 py-3 text-sm text-text placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        path="contact"
        title="Let's build something"
        intro="Have a role or a project in mind? I'm always up for a conversation."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Contact details */}
        <Reveal className="lg:col-span-5">
          <ul className="space-y-4">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-accent/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface-2 text-accent">
                  <LuMail size={18} />
                </span>
                <span>
                  <span className="block font-mono text-xs text-faint">email</span>
                  <span className="text-sm text-text group-hover:text-accent">
                    {CONTACT.email}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-accent/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface-2 text-accent">
                  <LuPhone size={18} />
                </span>
                <span>
                  <span className="block font-mono text-xs text-faint">phone</span>
                  <span className="text-sm text-text group-hover:text-accent">
                    {CONTACT.phone}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-xl border border-line bg-surface/60 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface-2 text-accent">
                <LuMapPin size={18} />
              </span>
              <span>
                <span className="block font-mono text-xs text-faint">location</span>
                <span className="text-sm text-text">{CONTACT.location}</span>
              </span>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            {CONTACT.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
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
        </Reveal>

        {/* Contact form (UI only, mailto fallback) */}
        <Reveal delay={100} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-surface/50 p-6 sm:p-8"
          >
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
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
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
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
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
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} resize-y`}
                placeholder="Tell me about the role or project…"
              />
            </div>
            <OriginButton type="submit" className="mt-5">
              <LuSend size={16} />
              Send message
            </OriginButton>
            <p className="mt-3 font-mono text-xs text-faint">
              Opens in your mail client — no data is stored.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
