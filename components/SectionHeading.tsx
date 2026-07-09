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
  // Static by design: the heading anchors the section immediately while its
  // content reveals beneath it. Keeps the ~/path eyebrow (a deliberate brand
  // motif) without every section arriving via the same fade-up reflex.
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-sm text-accent">
        <span className="text-muted">~/</span>
        {path}
      </p>
      <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted">{intro}</p>
      )}
    </div>
  );
}
