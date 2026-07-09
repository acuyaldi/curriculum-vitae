import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

// Custom 404 in the code-card voice. Renders inside the root layout (fonts +
// globals), self-contained with its own way home — the page-level Navbar/Footer
// live in app/page.tsx, not here.
export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-20">
      <div className="grid-field pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[-6rem] -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />

      <p className="mb-5 font-mono text-sm text-accent">
        <span className="text-faint">~/</span>404
      </p>

      {/* Faux terminal — mirrors the hero code card's window chrome */}
      <div className="w-full max-w-md rounded-xl border border-line bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-chrome-red/80" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-chrome-amber/80" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-chrome-green/80" aria-hidden />
          <span className="ml-3 font-mono text-xs text-faint">~/session</span>
        </div>
        <pre className="overflow-x-auto px-4 py-5 font-mono text-[0.82rem] leading-6">
          <code className="block">
            <span className="text-faint">$ </span>
            <span className="text-text/90">open ~/that-page</span>
            {"\n"}
            <span className="text-error">error:</span>
            <span className="text-text/90"> no such file or directory</span>
            {"\n"}
            <span className="text-code-com">{"// this route was never shipped"}</span>
          </code>
        </pre>
      </div>

      <h1 className="mt-9 text-balance font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-pretty text-center text-base leading-relaxed text-muted">
        The link may be broken, or the page moved. Everything worth seeing is
        back on the home page.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-line bg-surface/50 px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent/50 hover:text-accent"
      >
        <LuArrowLeft size={16} />
        Back home
      </Link>
    </main>
  );
}
