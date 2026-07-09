"use client";

import { useEffect } from "react";
import { CONTACT } from "@/lib/content";

// Two quiet, discoverable touches — neither blocks or nags:
//   1. A signature for anyone who opens DevTools (the audience includes engineers).
//   2. A warm document.title when the tab loses focus, restored on return.
// Module-scoped flag so the console signature prints once, even across remounts
// (React strict mode double-invokes effects in dev).
let consoleGreeted = false;

export default function Presence() {
  useEffect(() => {
    if (consoleGreeted) return;
    consoleGreeted = true;

    const linkedin = CONTACT.socials.find((s) => s.icon === "linkedin")?.href;
    const github = CONTACT.socials.find((s) => s.icon === "github")?.href;
    // Pull the live token values so the console signature can't drift from the
    // design system (console %c styling can't resolve CSS custom properties).
    const token = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || fallback;
    const accent = token("--color-accent", "#f0b132");
    const muted = token("--color-muted", "#9b978f");
    const brand = `color:${accent};font:600 13px/1.5 ui-monospace,monospace`;
    const dim = `color:${muted};font:400 12px/1.6 ui-monospace,monospace`;

    // Echoes the typed-object motif from the hero card.
    console.log("%cconst rizvialdi = { openToWork: true };", brand);
    console.log(
      [
        "Thanks for reading the source.",
        "Frontend roles or a build worth shipping? Let's talk.",
        linkedin && `→ ${linkedin}`,
        github && `→ ${github}`,
      ]
        .filter(Boolean)
        .join("\n"),
      dim,
    );
  }, []);

  useEffect(() => {
    const original = document.title;
    const away = "See you soon — Rizvialdi";
    const onVisibility = () => {
      document.title = document.hidden ? away : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);

  return null;
}
