import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiJest,
  SiPosthog,
  SiMockserviceworker,
} from "react-icons/si";
import { TbApi, TbBrandReactNative } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { SKILL_GROUPS } from "@/lib/content";

// Each tool's authentic brand hue, revealed on hover only — the rest state stays
// calm gray so the scan reads monochrome and the One Worklight Rule holds. Colors
// are brightened from source where the brand's own value is too dark on #191c22
// (standard dark-mode lift). Non-branded API falls back to brass; Next is
// monochrome by brand (bone); React Native shares React's mark (cyan).
const ICONS: Record<string, { Icon: IconType; brand: string }> = {
  react: { Icon: SiReact, brand: "#61dafb" },
  next: { Icon: SiNextdotjs, brand: "#e9e7e2" },
  ts: { Icon: SiTypescript, brand: "#4d90e0" },
  html: { Icon: SiHtml5, brand: "#e8613a" },
  css: { Icon: SiCss, brand: "#9a6ee0" },
  node: { Icon: SiNodedotjs, brand: "#6cc24a" },
  rest: { Icon: TbApi, brand: "#f0b132" },
  postgres: { Icon: SiPostgresql, brand: "#6b9ee6" },
  mysql: { Icon: SiMysql, brand: "#5a9fd4" },
  reactnative: { Icon: TbBrandReactNative, brand: "#61dafb" },
  posthog: { Icon: SiPosthog, brand: "#ff6224" },
  firebase: { Icon: SiFirebase, brand: "#ffa726" },
  surveyjs: { Icon: LuClipboardList, brand: "#22c9a3" },
  jest: { Icon: SiJest, brand: "#e14b52" },
  msw: { Icon: SiMockserviceworker, brand: "#ff7a45" },
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading path="skills" title="Tools I reach for" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal
            key={group.title}
            delay={i * 90}
            className="flex flex-col rounded-2xl border border-line bg-surface/60 p-6"
          >
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-display text-lg font-semibold text-text">
                {group.title}
              </h3>
              <span className="font-mono text-xs text-muted">{group.note}</span>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => {
                const entry = ICONS[skill.icon];
                const Icon = entry?.Icon;
                return (
                  <li key={skill.name}>
                    <span
                      className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/60 px-3 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-text"
                      style={
                        entry
                          ? ({ "--brand": entry.brand } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {Icon && (
                        <Icon
                          className="text-faint transition-colors group-hover:text-[color:var(--brand)]"
                          size={16}
                          aria-hidden
                        />
                      )}
                      {skill.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
