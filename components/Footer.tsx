import { LuGithub, LuLinkedin, LuArrowUp } from "react-icons/lu";
import { CONTACT } from "@/lib/content";

const SOCIAL_ICONS = { github: LuGithub, linkedin: LuLinkedin } as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-text"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md border border-line bg-surface font-mono text-xs font-bold text-accent">
              RI
            </span>
            Rizvialdi Ihsan
          </a>
          <p className="mt-3 text-xs text-muted">
            © {year} Rizvialdi Ihsan · Frontend Developer. Built with Next.js &amp;
            Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {CONTACT.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {Icon && <Icon size={18} />}
              </a>
            );
          })}
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <LuArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
