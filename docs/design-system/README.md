# OM/DS — Osama Mirghani Design System

**Read this before adding any UI to the portfolio.** This is the source of
truth for visual decisions. Runtime tokens live in
[`app/globals.css`](../../app/globals.css) and **must mirror this file** —
if a token in this folder changes, propagate it to `globals.css` in the same
PR.

The system layers a 5-stop **Spectrum** of accents on top of the existing
warm-paper editorial backbone. The site is bilingual EN/AR with full RTL.

---

## Index

| File | What's in it |
| --- | --- |
| [`README.md`](README.md) | This file — design philosophy, visual foundations, hard rules |
| [`tokens.css`](tokens.css) | Canonical tokens — colors, type scale, motion, spacing, radius |
| [`voice-tone.md`](voice-tone.md) | Copy guide — voice, tone, casing, punctuation, bilingual rules |

The runtime mirror of the tokens lives in [`app/globals.css`](../../app/globals.css).
Tailwind exposes them as utilities via [`tailwind.config.ts`](../../tailwind.config.ts).

---

## Visual foundations

### Color
- **Surfaces** are warm paper (`oklch(0.985 0.005 80)`) — never pure `#fff`.
  Dark mode is a deep cool night (`oklch(0.18 0.012 250)`) — never pure `#000`.
- **Ink** is desaturated cool — primary text is the same blue-black as the
  dark surface so both modes are harmonically related.
- **Spectrum** is a 5-stop accent set: emerald, cobalt, citrus, magenta, violet.
  Each has a `-tint` background and an `-ink` text tone for chips/badges.
  **Use ONE Spectrum color per surface.** Emerald remains the primary semantic
  accent. Cycle through all five only across project rows or list items.
- All color is OKLCH. Don't downgrade to hex.

### Type
- **Display + body** is **Inter** (Variable). Tight tracking on display
  (`-0.04em`), line-height `0.95`. Big jumps via `clamp()`.
- **Mono** is **JetBrains Mono** (Variable) — used for `.numeral`, section
  labels (`01 /`), tag chips, code fragments, timestamps. Tabular nums on.
- **Serif italic** is **Instrument Serif** (Italic only) — appears as a
  *single-word punctuation moment* inside otherwise-sans display headings
  (e.g. the word *shipped* italicized inside `Things I've shipped.`).
  **Never more than one word per heading.**
- **Arabic** is **IBM Plex Sans Arabic**. Letter-spacing resets to 0 (Latin
  tracking crushes Arabic ligatures). Line-height bumps up. The italic
  flourish is Latin-only — Arabic falls back to its sans face automatically
  via `[lang='ar'] .serif-italic`.
- **All four families are self-hosted** under [`app/fonts/`](../../app/fonts/)
  and registered via `next/font/local` in [`app/layout.tsx`](../../app/layout.tsx).
  **No Google Fonts CDN at build or runtime.**

### Spacing & layout
- Section vertical rhythm: `clamp(5rem, 10vw, 9rem)` (`.editorial-section`).
  Big air, asymmetric grids.
- Standard section grid: `grid-cols-[1fr_2fr]` — narrow column for the section
  label/heading, wide column for content. The asymmetry is the brand layout.
- Logical CSS properties (`inset-inline-start`, `margin-inline-end`,
  `padding-inline-*`) are **required** for RTL parity. Never `left`/`right`
  for layout.
- Max widths: `--container-narrow` 36rem, `--container-prose` 46rem,
  `--container-wide` 72rem.

### Motion
- **Easings:** `--ease-out-expo` for entrance reveals (long satisfying tail),
  `--ease-out-quart` for state transitions, `--ease-spring` and
  `--ease-overshoot` only for stickers, badges, success moments.
- **Durations:** instant 100 ms, quick 180 ms, base 280 ms, slow 520 ms,
  reveal 720 ms, hero 1100 ms.
- **Entrance choreography:** photo scale-in → name word-by-word clip wipe →
  tagline fade → social rail stagger → clients band fade. ~1100 ms total.
- **Scroll reveals:** IntersectionObserver, 12 px lift + opacity, `var(--d-base)`.
  Wrap any section block with `<Reveal>` ([`components/Reveal.tsx`](../../components/Reveal.tsx)).
- **Hover gestures:** project links push 3 px on the inline-axis, arrow rotates
  −12°. Theme toggle spins 180°. Mailto headline has an underline that
  *unwipes* (origin: end) on hover. Project rows reveal a top Spectrum bar
  and slide the title 4 px on the inline-axis.
- **Reduced motion** short-circuits everything to instant. Non-negotiable —
  every new animation must be cancelled inside the `prefers-reduced-motion`
  block in [`app/globals.css`](../../app/globals.css).

### Hover & press states
- **Hover:** color shift to `--accent`, never just darken/lighten. Translate
  −2 px on icons. Underline transforms (`scaleX`) instead of color changes.
- **Press:** `scale(0.99)` on buttons. No color flash.
- **Focus:** 2 px outline `var(--accent)`, offset 3 px, radius 4 px. Always visible.

### Borders, shadows, blur
- Borders are **always token-driven**: `--border-subtle / -default / -strong`,
  all derived from ink with alpha. Never opaque grays.
- 4-stop shadow scale: `--shadow-1…4`, plus `--shadow-emerald` and
  `--shadow-cobalt` for the rare lifted CTA.
- **Inner shadows are not used.** Flat with shadow as elevation only.
- Blur is reserved for the fixed nav (`bg-bg-base/95 backdrop-blur-sm` once
  `scrollY > 24`) and dialog overlays. Card surfaces stay opaque.

### Corner radii
- Avatars / icon chips: `--radius-pill` (full circle).
- Buttons: pill (h-11) for primary, `--radius-sm` for secondary.
- Cards: `--radius-lg` (16 px) — generous but not bubble.
- Badges/chips: `--radius-sm` or pill.

### Cards & rows
- Card surfaces: `--bg-card`, `--border-subtle`, `--radius-lg`, `--shadow-1`
  at rest, `--shadow-2` on hover with a 2 px lift.
- **Project rows are not bubble cards** — they're rows separated by
  `divide-y divide-border-subtle`. Numerals (`01`, `02`) sit in a left
  gutter. Editorial form factor.

### Imagery
- Avatar is one hero photograph, transparent PNG, served as AVIF / WebP /
  PNG via `<picture>`. No b&w filters, no grain overlays.
- Decorative imagery, when added, is a solid Spectrum tint with high-contrast
  type — no soft pastel washes.
- Hero photo sits on `--accent-soft` (emerald tint) inside a perfect circle —
  the brand's anchor mark.

### Iconography
Two icon systems in tandem:

1. **Brand marks** (`react-icons/si` — Simple Icons): social profiles only.
   `SiLinkedin`, `SiUpwork`, `SiGmail`. Always `size={20}`, `aria-hidden`,
   with the link itself carrying the `aria-label`.
2. **UI icons** (`react-icons/lu` — Lucide): everything functional. `LuMoon`,
   `LuSun`, `LuDownload`. Stroke icons, weight 2, rendered at `size={14–20}`.

Hard rules:
- Icons are decoration, not labels. Always pair with text or `aria-label`.
- **No emoji** anywhere — copy, section markers, favicon. None.
- **No unicode glyph icons** as primary UI. The one exception is the
  `↗` arrow used in `.project-link-arrow` — it's an editorial flourish.
- **No multicolor icons.** Stroke icons inherit `currentColor` and shift to
  `--accent` on hover.
- **No hand-rolled SVGs in the codebase outside icon libraries.** If you
  need a visual, use a Spectrum tint + a bold word as the anchor instead.

### Layout rules
- Fixed header only. Nothing else fixed.
- Vertical social rail on desktop ≥ md, collapses to a horizontal row on mobile.
- Below 640 px the centered nav is hidden so the language + theme toggles fit;
  the right cluster always has priority. ([`components/Navbar.tsx`](../../components/Navbar.tsx)).

---

## When you add a component

Walk through this checklist:

1. **Tokens, not literals.** No hex, no `rgb()`, no inline pixel values for
   colors. Reach into `var(--*)` from `app/globals.css` or a Tailwind utility
   that maps to one. Same for spacing, radii, shadows, easings, durations.
2. **Logical properties.** `inset-inline-start` not `left`. `padding-inline`
   not `padding-left/right`. RTL parity is non-negotiable.
3. **i18n.** Every string belongs in [`lib/translations.ts`](../../lib/translations.ts).
   Add the EN copy first, then the AR. Don't transliterate — write idiomatic
   Arabic. Numerals switch with locale (`01` → `٠١`).
4. **Use [`<Reveal>`](../../components/Reveal.tsx)** for scroll-into-view sections.
5. **Use [`<SectionHeading>`](../../components/SectionHeading.tsx)** for any
   section heading. It auto-handles the `*italic*` marker and the trailing
   accent period.
6. **Reduced-motion branch** — every new animation gets cancelled inside the
   `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`.
7. **Build verification.** Run `npm run build` before committing.
8. **Atomic Conventional Commits** with lowercase prefixes (`fix:`, `feat:`,
   `chore:`). Body explains *why*, not *what*. Always include the
   `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` trailer.

---

## License

Tokens, components, and layouts: MIT.
Avatar photo, name, brand identity: © Osama Mirghani — all rights reserved.
