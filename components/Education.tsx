import { LuGraduationCap } from "react-icons/lu";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EDUCATION } from "@/lib/content";

export default function Education() {
  return (
    <section
      id="education"
      className="border-t border-line bg-surface/30"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading path="education" title="Education" />

        <div
          className={`grid gap-5 ${
            EDUCATION.length > 1 ? "sm:grid-cols-2" : "max-w-2xl"
          }`}
        >
          {EDUCATION.map((edu, i) => (
            <Reveal
              key={i}
              className="flex items-start gap-4 rounded-xl border border-line bg-surface/60 p-6 transition-colors hover:border-accent/50"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-accent">
                <LuGraduationCap size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-text">
                  {edu.institution}
                </h3>
                <p className="mt-1 text-sm text-muted">{edu.field}</p>
                <p className="mt-2 font-mono text-xs text-muted">{edu.year}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
