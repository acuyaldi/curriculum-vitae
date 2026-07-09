---
name: Rizvialdi Ihsan — Portfolio
description: A dark, code-first developer portfolio lit by a single brass worklight.
colors:
  brass-worklight: "#f0b132"
  brass-worklight-dim: "#b78521"
  ink-charcoal: "#0d0e11"
  surface-slate: "#131519"
  surface-slate-raised: "#191c22"
  hairline: "#262a31"
  text-bone: "#e9e7e2"
  muted-sand: "#9b978f"
  faint-ash: "#6b6963"
  error: "#ff6b6b"
  chrome-red: "#ff5f56"
  chrome-amber: "#ffbd2e"
  chrome-green: "#27c93f"
  syntax-type: "#7fb2d9"
  syntax-string: "#9ecb86"
  syntax-function: "#d6a2e0"
  syntax-number: "#e6a06a"
  syntax-comment: "#5c6470"
  syntax-punctuation: "#8b929c"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "3px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  "2xl": "16px"
  full: "9999px"
spacing:
  gutter: "20px"
  gutter-lg: "32px"
  section: "80px"
  section-lg: "112px"
  container-max: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.text-bone}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.brass-worklight}"
    textColor: "{colors.ink-charcoal}"
  button-ghost:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.text-bone}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.muted-sand}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  chip:
    backgroundColor: "{colors.surface-slate-raised}"
    textColor: "{colors.muted-sand}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  input:
    backgroundColor: "{colors.surface-slate-raised}"
    textColor: "{colors.text-bone}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  nav-cta:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.brass-worklight}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
---

# Design System: Rizvialdi Ihsan — Portfolio

## 1. Overview

**Creative North Star: "The Annotated Source File"**

The whole page reads like a well-commented source file you'd actually enjoy reviewing. Sections are announced with lowercase filesystem paths (`~/about`, `~/skills`), navigation links wear `//` comment prefixes, and the hero renders the developer himself as a syntax-highlighted TypeScript object. This is not mono-as-costume — it is the genuine native tongue of the person the page is about, so the metaphor earns its place. The warmth comes from the copy: comments and headings speak in a plain, first-person, human voice ("Tools I reach for", "Let's build something"), never barking jargon.

The atmosphere is a dark workshop lit by one brass worklight. Nearly the entire surface is warm graphite (never pure black), separated into planes by thin 1px hairlines rather than shadows or glass. A single warm gold — Brass Worklight — is the only chromatic voice in the UI chrome, and it is spent sparingly: a live status dot, an active nav link, a focus ring, a button that fills with light when you touch it. The restraint is the seniority signal. This system explicitly rejects the **generic dev-portfolio template** (skill progress bars, avatar-and-tagline, interchangeable card walls), **overdesigned/gimmicky** motion (no 3D toys, cursor tricks, neon gradients, or effects that announce themselves), and the **stiff corporate SaaS** register (it is a person, not a company landing page).

**Key Characteristics:**
- Dark warm-graphite canvas (`#0d0e11`), never pure black; planes divided by 1px hairlines, not shadows.
- Exactly one accent hue in the UI — Brass Worklight `#f0b132` — used on ≤10% of any screen.
- Code-as-identity motifs: `~/path` section eyebrows, `//` comment prefixes, a typed-object hero, a dotted grid field.
- Three-face type system: Space Grotesk (display), Inter (body), JetBrains Mono (all structural metadata).
- Motion is quiet and purposeful: sequential reveals, one radial button fill, a blinking caret. Every path has a reduced-motion fallback.

## 2. Colors

A near-monochrome charcoal system with one warm-gold voice; the only riot of color is quarantined inside the hero code card.

### Primary
- **Brass Worklight** (`#f0b132`): The single accent, and the entire chromatic identity of the UI. Used for the active nav link, the "open to opportunities" pulse, focus rings, `::selection`, section-eyebrow paths, stat figures, and the origin-fill on the primary button. Its scarcity is the point.
- **Brass Worklight Dim** (`#b78521`): The muted companion for the accent — pressed/secondary states and lower-emphasis gold where full brass would shout.

### Neutral
- **Ink Charcoal** (`#0d0e11`): The body background. Warm graphite, deliberately not `#000`. Also the ink color that text flips to inside a brass fill.
- **Surface Slate** (`#131519`): The first raised plane — cards, the navbar-when-scrolled, the code card, buttons at rest.
- **Surface Slate Raised** (`#191c22`): The second plane — inputs and skill chips, so form controls read as inset within a card.
- **Hairline** (`#262a31`): The 1px border that does the structural work shadows would do elsewhere. The most-used non-text color in the system.
- **Text Bone** (`#e9e7e2`): Primary text. Warm off-white, ~13.7:1 on Ink Charcoal.
- **Muted Sand** (`#9b978f`): Body/secondary text and bio prose. Warm gray; verify it clears 4.5:1 on whichever surface it sits (borderline on the raised planes — bump toward Text Bone if it's close).
- **Faint Ash** (`#6b6963`): Decorative and de-emphasized only — code-card line numbers, window-chrome labels, the 404 terminal glyphs. **Never** load-bearing text; placeholders, timestamps, and section eyebrows now use Muted Sand for 4.5:1. Faint does not clear 4.5:1 on the dark surfaces.
- **Error Coral** (`#ff6b6b`): Reserved exclusively for form error messages.

### Syntax Palette (code card only)
- **Type** (`#7fb2d9`), **String** (`#9ecb86`), **Function** (`#d6a2e0`), **Number** (`#e6a06a`), **Comment** (`#5c6470`), **Punctuation** (`#8b929c`): The editor-syntax multi-hue set. Keywords reuse Brass Worklight.

### Surface Fill Convention
Surface tones are alpha washes over the charcoal, so a plane reads as tinted depth rather than a flat swatch. One value per role — this is the system; don't invent intermediate alphas:
- **Card / panel fill:** `bg-surface/60` — all content cards, the hero status pill, social tiles.
- **Ghost button / control fill:** `bg-surface/50` — secondary buttons at rest.
- **Section tint band:** `bg-surface/30` — a whole section stepped slightly off the body (Experience, Education).
- **Glass panel:** `bg-surface/80` + `backdrop-blur-sm` — the code card and the 404 terminal only.
- **Form field:** `bg-surface-2/60` — inputs and skill chips, inset one plane below the card.
- **Accent chip:** `border-accent/40` + `bg-accent/10`, hover `bg-accent/20` — the nav "get in touch" pill.
- **Hover affordance:** `hover:border-accent/50` — cards and controls share one interactive-border warm.
- **Kept alpha (intentional):** `bg-accent/10` hero bloom, `ring-accent/30` focus ring, `shadow-black/40` float. Effects, not palette gaps.

The window-chrome traffic-light dots are tokens, not raw hex: `chrome-red` / `chrome-amber` / `chrome-green`.

### Named Rules
**The One Worklight Rule.** Brass Worklight appears on ≤10% of any given screen. It is a signal, not a finish. If two gold elements compete for attention in one viewport, one of them is wrong.

**The Quarantine Rule.** The multi-hue syntax palette (blue/green/violet/orange) is permitted *only* inside the hero code card. It must never leak into UI chrome — no green success buttons, no violet links. Outside the card, the world is charcoal + brass.

## 3. Typography

**Display Font:** Space Grotesk (with ui-sans-serif, system-ui fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SF Mono, Menlo fallback)

**Character:** A geometric-with-quirks display against a quiet, hyper-legible humanist body, with a true monospace carrying every piece of structural metadata. The mono is not decoration — it *is* the code-as-identity concept, so it does real work (paths, comments, the code card, stat figures) rather than dressing headings.

### Hierarchy
- **Display** (700, `clamp(2.75rem → 4.25rem)`, 1.05, -0.02em): The hero name only. One per page.
- **Headline** (700, `clamp(1.875rem → 2.25rem)`, 1.1, -0.02em): Section titles (`<h2>`), paired with a mono `~/path` eyebrow.
- **Title** (600, `1.125rem`, 1.3): Card and group headings (`<h3>`).
- **Body** (400, `1rem`–`1.125rem`, 1.6): Bio and prose in Muted Sand. Body copy caps at ~65–75ch (`max-w-2xl` / `max-w-md`). Line-height 1.6 gives light-on-dark text the breathing room it needs.
- **Label** (400, `0.75rem`–`0.875rem`, JetBrains Mono, **lowercase**): Nav links, section eyebrows, form labels, metadata, notes. Lowercase and untracked.

### Named Rules
**The Lowercase-Mono Rule.** Structural labels are lowercase JetBrains Mono (`~/about`, `// reach out`, `name`, `email`). This system does **not** use the uppercase wide-tracked eyebrow. The lowercase-terminal cadence is the brand's voice; uppercase tracking would be borrowed AI grammar.

**The One Display Rule.** Space Grotesk at display size appears once — the hero name. Everything below steps down to headline/title. Never a second competing hero.

## 4. Elevation

The system is flat by default. Depth is built from stacked tonal planes (Ink Charcoal → Surface Slate → Surface Slate Raised) separated by 1px Hairline borders, not from a shadow ramp. This keeps the surface calm and screen-like. Real shadow is reserved for the two objects that genuinely float above the page. Backdrop-blur is used deliberately and rarely — on the scrolled navbar and the code card — never as decorative glass.

### Shadow Vocabulary
- **Floating panel** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4)`): The hero code card and the mobile drawer only. These are the sole elements that read as lifted off the page.
- **Accent bloom** (`filter: blur(120px)` on a `bg-brass-worklight/10` disc): The single soft glow behind the hero. Atmosphere, not elevation.

### Named Rules
**The Flat-Bordered Rule.** Surfaces are flat and separated by 1px Hairline borders. If you reach for a drop shadow to separate two planes, use a border or a tonal step instead. Shadow means "this object floats," and only two objects float.

## 5. Components

### Buttons
- **Shape:** Gently rounded (8px / `rounded-lg`), fixed 44px height for the primary.
- **Primary (OriginButton):** At rest, a quiet Surface Slate face with a Hairline border and Text Bone label. On hover/focus/press, a Brass Worklight disc grows from the exact pointer or focus origin to fill the button, and the label flips to Ink Charcoal — mirroring the global `::selection` look. Press adds a subtle `scale(0.985)`.
- **Ghost / Secondary:** Same surface and border, no fill; hover shifts border and text toward brass (`hover:border-accent/50 hover:text-accent`).
- **Focus:** 2px Brass Worklight ring, 2px offset against the background. Never removed.

### Chips (Skills)
- **Style:** Surface Slate Raised face, Hairline border, Muted Sand label, `rounded-lg`, small mono-adjacent scale.
- **State:** On hover, lifts `-2px`, border and icon warm to brass, text brightens to Text Bone. Icons are monochrome at rest, brass on hover.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px) for content cards; `rounded-xl` (12px) for the tighter stat tiles.
- **Background:** Surface Slate at 60% over the charcoal (`bg-surface/60`); see the Surface Fill Convention in §2.
- **Shadow Strategy:** None — see The Flat-Bordered Rule. Separation is the Hairline border.
- **Border:** 1px Hairline; warms toward `accent/50` on hover for interactive cards.
- **Internal Padding:** 24–32px (`p-6` / `p-8`).

### Inputs / Fields
- **Style:** Surface Slate Raised face (inset one step below the card), 1px Hairline, `rounded-lg`, Muted Sand placeholder (clears 4.5:1), lowercase mono label above.
- **Focus:** Border shifts to Brass Worklight; default outline removed in favor of the border shift. Textareas resize vertically only.
- **Error / Disabled:** Errors surface below the field in Error Coral with an icon, announced via an `aria-live="polite"` region. Disabled drops opacity to ~60%.

### Navigation
- **Style:** Fixed, transparent over the hero; on scroll past 12px it gains a Hairline bottom border and a blurred Ink Charcoal backdrop. Links are lowercase mono with a faint brass `//` prefix; the active link (scroll-spy) is full brass. An `RI` monogram tile anchors the left; a bordered `accent/10` "Get in touch" pill anchors the right.
- **Mobile:** Hamburger opens a right-side drawer (`role="dialog"`, `aria-modal`) over a blurred black overlay; body scroll locks, Escape closes. Drawer links carry `01`/`02` numeric markers — legitimate here because the nav *is* an ordered list.

### Signature Component — The Profile Code Card
The hero's right column: a syntax-highlighted TypeScript declaration of the developer (`const rizvialdi: FrontendDeveloper = {…}`) inside a faux editor window with traffic-light chrome (tokenized `chrome-red/amber/green`), a line-number rail, and a blinking caret. Lines reveal in sequence via staggered `animation-delay`. This is the page's thesis statement; it is unique and must not be templatized into a generic terminal.

### Signature Motif — The Section Eyebrow
Every section opens with a lowercase mono `~/path` (e.g. `~/experience`) in brass over a faint `~/`. It replaces the conventional uppercase kicker and threads the filesystem metaphor through the whole page.

## 6. Do's and Don'ts

### Do:
- **Do** keep Brass Worklight to ≤10% of any screen (The One Worklight Rule). Warmth is carried by copy and the single accent, not by spreading gold.
- **Do** separate planes with 1px Hairline borders and tonal steps; reserve shadow for the code card and mobile drawer only.
- **Do** write structural labels in lowercase JetBrains Mono (`~/about`, `// reach out`), never uppercase-tracked eyebrows.
- **Do** keep every focus state on a visible 2px brass ring, and give every animation a `prefers-reduced-motion` fallback (already wired in `globals.css`).
- **Do** lead with concrete outcomes in the copy (47+ APIs, 410 test files, 220+ typed modules) — show the work, don't claim it.
- **Do** keep the code/mono motifs authentic to the actual stack; the metaphor works because he *is* a frontend engineer.

### Don't:
- **Don't** ship the **generic dev-portfolio template** — no skill progress bars, no avatar-and-tagline hero, no interchangeable icon-heading-text card walls.
- **Don't** add **overdesigned or gimmicky** motion — no 3D tilt, cursor trails, parallax toys, neon gradients, or any effect that draws attention to itself. Every animation earns its place or it goes.
- **Don't** drift into **stiff corporate SaaS** — it's a person, not a company. Keep the voice first-person, plain, and warm.
- **Don't** let the syntax palette (blue/green/violet/orange) leak out of the code card into UI chrome (The Quarantine Rule).
- **Don't** use Faint Ash (`#6b6963`) for any load-bearing text — it fails 4.5:1 on the dark surfaces. Decorative only (line numbers, window-chrome labels); placeholders and eyebrows use Muted Sand.
- **Don't** use gradient text (`background-clip: text`), colored side-stripe borders (`border-left` > 1px as an accent), or decorative glassmorphism. Backdrop-blur is allowed only on the navbar and code card where it's purposeful.
- **Don't** pile on entrance animations section-by-section as a uniform reflex; reveals should fit what they reveal.
