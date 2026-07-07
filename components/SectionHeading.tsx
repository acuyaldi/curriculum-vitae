import Reveal from "./Reveal";

type SectionHeadingProps = {
  /** mono eyebrow path, e.g. "about" -> ~/about */
  path: string;
  title: string;
  intro?: string;
};

/**
 * Shared section header. The mono "~/path" eyebrow is the page's structural
 * motif (a typed filesystem), reinforcing the code-first identity.
 */
export default function SectionHeading({
  path,
  title,
  intro,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-sm text-accent">
        <span className="text-faint">~/</span>
        {path}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
