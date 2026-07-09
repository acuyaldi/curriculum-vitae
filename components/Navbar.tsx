"use client";

import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { NAV_ITEMS } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const openedOnce = useRef(false);

  // Solidify the bar once the hero is scrolled past.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll + close drawer on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Move focus into the drawer on open; return it to the trigger on close.
  // openedOnce guards against stealing focus on the initial mount.
  useEffect(() => {
    if (open) {
      openedOnce.current = true;
      closeBtnRef.current?.focus();
    } else if (openedOnce.current) {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Trap Tab focus within the open drawer so keyboard users can't tab out
  // into the (visually hidden) page behind it.
  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Logo / name */}
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Rizvialdi Ihsan — back to top"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface font-mono text-sm font-bold text-accent transition-colors group-hover:border-accent/60">
            RI
          </span>
          <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight text-text sm:block">
            Rizvialdi Ihsan
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-md px-3 py-2 font-mono text-[0.8rem] transition-colors hover:text-text ${
                  active === item.id ? "text-accent" : "text-muted"
                }`}
              >
                <span className="text-accent/70">{"// "}</span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contact"
              className="rounded-md border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[0.8rem] font-medium text-accent transition-colors hover:bg-accent/20"
            >
              Get in touch
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="grid h-10 w-10 place-items-center rounded-md border border-line text-text transition-colors hover:border-accent/50 hover:text-accent md:hidden"
        >
          <LuMenu size={20} />
        </button>
      </nav>

      {/* Mobile drawer + overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
        inert={!open}
      >
        {/* overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* panel */}
        <div
          ref={panelRef}
          onKeyDown={trapFocus}
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col border-l border-line bg-surface shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <span className="font-mono text-xs text-muted">~/navigation</span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-text transition-colors hover:border-accent/50 hover:text-accent"
            >
              <LuX size={18} />
            </button>
          </div>
          <ul className="flex flex-col gap-1 p-4">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 rounded-lg px-3 py-3 text-lg font-medium text-text transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  <span className="font-mono text-xs text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mx-4 mt-auto mb-6 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-center font-mono text-sm font-medium text-accent"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
