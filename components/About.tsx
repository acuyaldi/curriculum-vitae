import Reveal from "./Reveal";
import CountUp from "./CountUp";
import SectionHeading from "./SectionHeading";
import { BIO, STATS } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading path="about" title="A frontend engineer who ships at scale" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Bio */}
        <Reveal className="lg:col-span-7">
          <p className="text-pretty text-lg leading-relaxed text-muted">{BIO}</p>
          <p className="mt-6 font-mono text-sm text-muted">
            <span className="text-accent">{"> "}</span>
            React ecosystem specialist · design systems · testing · analytics
          </p>
        </Reveal>

        {/* Stat band */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 90}
              className="group rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-accent/50"
            >
              <div className="font-mono text-3xl font-bold text-accent sm:text-4xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm leading-snug text-muted">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
