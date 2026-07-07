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

const ICONS: Record<string, IconType> = {
  react: SiReact,
  next: SiNextdotjs,
  ts: SiTypescript,
  html: SiHtml5,
  css: SiCss,
  node: SiNodedotjs,
  rest: TbApi,
  postgres: SiPostgresql,
  mysql: SiMysql,
  reactnative: TbBrandReactNative,
  posthog: SiPosthog,
  firebase: SiFirebase,
  surveyjs: LuClipboardList,
  jest: SiJest,
  msw: SiMockserviceworker,
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
            className="flex flex-col rounded-2xl border border-line bg-surface/50 p-6"
          >
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-display text-lg font-semibold text-text">
                {group.title}
              </h3>
              <span className="font-mono text-xs text-faint">{group.note}</span>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => {
                const Icon = ICONS[skill.icon];
                return (
                  <li key={skill.name}>
                    <span className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/60 px-3 py-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-text">
                      {Icon && (
                        <Icon
                          className="text-faint transition-colors group-hover:text-accent"
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
