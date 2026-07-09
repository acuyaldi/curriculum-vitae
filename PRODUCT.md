# Product

## Register

brand

## Users

Primary: **recruiters and hiring managers** evaluating a senior frontend candidate. They arrive from LinkedIn, a job application, or a referral, usually scanning many candidates in a short window on a laptop. Their job-to-be-done is fast: confirm seniority, confirm the stack fits the role, form a credibility impression, and decide whether to reach out.

Secondary: **engineering leads and peers** who open the page during a deeper technical read. They judge depth — architecture decisions, testing discipline, design-system work — and reward substance over polish. The page must serve both speeds: a scanner gets the verdict in seconds; a reader who keeps going finds the evidence.

## Product Purpose

A personal portfolio for a frontend developer (8 years, React ecosystem) whose single goal is to **convert a qualified visitor into an inbound conversation about a full-time role**. It is not a blog, a showcase reel, or a freelance storefront. Success is one thing: a recruiter or hiring manager finishes the page convinced, and reaches out through the contact path. Everything on the page either builds that conviction or removes friction from that action.

## Brand Personality

**Warm, human, collaborative — carried with calm senior confidence.** The voice is first-person, plain, and specific. Someone you'd want on the team, not a résumé in a box. No hype adjectives, no exclamation marks, no hard sell — seniority shows through restraint and concrete outcomes, and warmth keeps it from reading cold or clinical. Confident enough to leave whitespace and let the work speak.

## Anti-references

- **Overdesigned / gimmicky.** No motion-for-its-own-sake, 3D toys, cursor tricks, neon gradients, or effects that draw attention to the effect. Every animation earns its place or it goes. This is the explicit line the owner drew.
- **The generic dev-portfolio template.** The interchangeable "hi I'm X, here are my skills as progress bars" bootcamp layout. The code-as-identity POV exists precisely to escape this; don't drift back toward it.
- **Corporate/stiff SaaS voice.** It's a person, not a company landing page. Warmth and specificity keep it human.

## Design Principles

1. **Warmth without gimmick.** Approachable and human, but restraint is the senior tell. When a flourish and calm compete, calm wins. The single gold accent and the whitespace carry warmth; motion stays quiet and purposeful.
2. **Show the work, don't claim it.** Lead with concrete outcomes (47+ standardized API services, 410 test files, 220+ typed modules, a JSS→vanilla-extract migration) instead of adjectives. Evidence out-argues hype every time.
3. **Two-speed content.** Respect the scanner — seniority, stack, and a contact path readable in seconds — while rewarding the engineer who keeps reading with real depth. Both audiences leave satisfied.
4. **Code is the signature, not a costume.** The typed-object / syntax-highlighted motif works because he *is* a frontend engineer; keep it authentic and specific to his actual stack. The moment mono-and-code become decorative vibes, it becomes the costume the brand bans warn about.
5. **One clear next step.** The whole page funnels to a single action — reach out about a full-time role. Never split the visitor's attention across competing CTAs.

## Accessibility & Inclusion

Target **WCAG 2.2 AA**.

- Body text ≥4.5:1 contrast against its surface; large/bold text ≥3:1. Watch `--color-muted` (#9b978f) and `--color-faint` (#6b6963) on the dark surfaces — faint in particular is borderline for anything but decorative use.
- Full keyboard operability with a visible focus ring (already wired: `:focus-visible` gold outline).
- `prefers-reduced-motion` honored with calm/instant fallbacks (already wired in globals.css for reveals, code-card lines, and smooth scroll) — no motion path is exempt.
- Semantic landmarks and a single logical heading order; the contact route and form remain usable and clearly labeled.
