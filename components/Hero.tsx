import { LuArrowRight, LuDownload, LuMail } from "react-icons/lu";
import { HERO } from "@/lib/content";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { OriginButton } from "@/components/ui/origin-button";

// HERO.role typed out char-by-char, wrapped in quotes to read as a string
// literal — matching the syntax-highlighted code card that anchors the section.
const ROLE_WORDS = HERO.role.split(" ").map((text, i, arr) => ({
  text: i === 0 ? `"${text}` : i === arr.length - 1 ? `${text}"` : text,
  className: "text-accent dark:text-accent",
}));

// Syntax-token helpers keep the code card readable in JSX.
const kw = "text-code-kw";
const ty = "text-code-ty";
const str = "text-code-str";
const num = "text-code-num";
const com = "text-code-com";
const pn = "text-code-pn";

// The signature: a syntax-highlighted TS declaration of the developer.
// Each entry is one rendered line; they reveal in sequence via animation-delay.
const CODE_LINES: React.ReactNode[] = [
  <span key="l" className={com}>
    {"// ~/profile.ts"}
  </span>,
  <span key="b1">&nbsp;</span>,
  <>
    <span className={kw}>const</span> rizvialdi<span className={pn}>:</span>{" "}
    <span className={ty}>FrontendDeveloper</span> <span className={pn}>=</span>{" "}
    <span className={pn}>{"{"}</span>
  </>,
  <>
    {"  "}role<span className={pn}>:</span>{" "}
    <span className={str}>&quot;Frontend Developer&quot;</span>
    <span className={pn}>,</span>
  </>,
  <>
    {"  "}experience<span className={pn}>:</span> <span className={num}>8</span>
    <span className={pn}>,</span> <span className={com}>{"// years"}</span>
  </>,
  <>
    {"  "}stack<span className={pn}>:</span> <span className={pn}>[</span>
    <span className={str}>&quot;React&quot;</span>
    <span className={pn}>,</span> <span className={str}>&quot;Next.js&quot;</span>
    <span className={pn}>,</span>{" "}
    <span className={str}>&quot;React Native&quot;</span>
    <span className={pn}>]</span>
    <span className={pn}>,</span>
  </>,
  <>
    {"  "}backend<span className={pn}>:</span> <span className={pn}>[</span>
    <span className={str}>&quot;Node.js&quot;</span>
    <span className={pn}>,</span> <span className={str}>&quot;SQL&quot;</span>
    <span className={pn}>]</span>
    <span className={pn}>,</span>
  </>,
  <>
    {"  "}focus<span className={pn}>:</span>{" "}
    <span className={str}>&quot;performance &amp; design systems&quot;</span>
    <span className={pn}>,</span>
  </>,
  <>
    {"  "}shipping<span className={pn}>:</span> <span className={kw}>true</span>
    <span className={pn}>,</span>
  </>,
  <>
    <span className={pn}>{"}"}</span>
    <span className={pn}>;</span>
  </>,
  <span key="b2">&nbsp;</span>,
  <>
    <span className={kw}>export</span> <span className={kw}>default</span> rizvialdi
    <span className={pn}>;</span>
  </>,
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28"
    >
      {/* signature dotted-grid field + one restrained accent glow */}
      <div className="grid-field pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Left: intro */}
        <div className="lg:col-span-6">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </p>

          <h1 className="font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-[4.25rem]">
            {HERO.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-lg sm:text-xl">
            <span className="text-faint">const role =</span>
            <TypewriterEffect
              words={ROLE_WORDS}
              className="text-lg font-normal text-left sm:text-xl md:text-lg lg:text-xl"
              cursorClassName="h-5 sm:h-6 md:h-5 lg:h-6 bg-accent"
            />
          </div>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {HERO.tagline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <OriginButton href="#experience">
              View my work
              <LuArrowRight size={16} />
            </OriginButton>
            <a
              href={HERO.cvHref}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface/50 px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent/50 hover:text-accent"
            >
              <LuDownload size={16} />
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              <LuMail size={16} />
              Contact me
            </a>
          </div>
        </div>

        {/* Right: signature code card */}
        <div className="lg:col-span-6">
          <div className="relative rounded-xl border border-line bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
              <span className="ml-3 font-mono text-xs text-faint">
                rizvialdi.ts
              </span>
            </div>

            {/* code body with line-number rail */}
            <div className="overflow-x-auto px-4 py-5">
              <pre className="font-mono text-[0.78rem] leading-6 sm:text-[0.86rem]">
                <code className="grid">
                  {CODE_LINES.map((line, i) => (
                    <span
                      key={i}
                      className="code-line grid grid-cols-[1.75rem_1fr] items-baseline"
                      style={{ animationDelay: `${150 + i * 85}ms` }}
                    >
                      <span className="select-none pr-3 text-right text-faint/60">
                        {i + 1}
                      </span>
                      <span className="whitespace-pre text-text/90">
                        {line}
                        {i === CODE_LINES.length - 1 && (
                          <span className="caret ml-1">&nbsp;</span>
                        )}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
