import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EXPERIENCE } from "@/lib/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-line bg-surface/30"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          path="experience"
          title="Where I've been building"
          intro="Eight years across product teams — from UI/UX design into deep frontend engineering."
        />

        <ol className="relative ml-1.5 border-l border-line pl-6 sm:ml-2 sm:pl-10">
          {EXPERIENCE.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.company}-${job.period}`}
              delay={i * 60}
              className="relative pb-12 last:pb-0"
            >
              {/* timeline node */}
              <span
                className={`absolute -left-[calc(1.5rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full border-2 sm:-left-[calc(2.5rem+7px)] ${
                  job.current
                    ? "border-accent bg-accent"
                    : "border-line bg-surface-2"
                }`}
                aria-hidden
              />

              <div className="rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-accent/50 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-lg font-semibold text-text sm:text-xl">
                    {job.role}
                    <span className="text-accent"> · {job.company}</span>
                  </h3>
                  <span className="whitespace-nowrap font-mono text-xs text-muted">
                    {job.current && (
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
                    )}
                    {job.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point, p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-1 select-none font-mono text-accent/70">
                        ›
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
