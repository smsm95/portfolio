---
name: om-ds-ui
description: |
  Use this skill when the user asks for any UI or visual change to the
  Osama Mirghani portfolio (https://osamamirghani.com) — adding or
  redesigning a section, page, component, or screen; styling, layout,
  motion, copy edits, or any task that produces user-facing surface.
  Triggers include phrases like "add a section", "create a component",
  "build a page", "redesign", "restyle", "update the UI", "change the
  layout", "add an animation", "tweak the spacing", and slash command
  /om-ds. Activates the OM/DS design system: 5-stop Spectrum palette,
  Inter + IBM Plex Sans Arabic + JetBrains Mono + Instrument Serif
  italic flourish, OKLCH tokens, bilingual EN/AR with full RTL,
  motion-as-brand. Skip this skill for non-UI tasks (deploy/ops/AWS,
  dependency bumps, security audits, CI changes, doc edits).
user-invocable: true
---

# OM/DS UI skill

This skill kicks in whenever you're about to touch the portfolio's
user-facing surface. Follow it strictly — the design system is opinionated
and the user has reverted past UI work that drifted.

## Step 1 — Read the design system, in this order

1. [`CLAUDE.md`](../../../CLAUDE.md) — project guide, hard constraints,
   workflow.
2. [`docs/design-system/README.md`](../../../docs/design-system/README.md)
   — visual foundations and the **"when you add a component" checklist**.
3. [`docs/design-system/voice-tone.md`](../../../docs/design-system/voice-tone.md)
   — required reading before writing or translating any copy.
4. [`docs/design-system/tokens.css`](../../../docs/design-system/tokens.css)
   — the canonical token list. The runtime mirror lives in
   [`app/globals.css`](../../../app/globals.css). They must match.

If any of those files are missing on a future agent's machine, stop and
flag it — don't try to recreate the system from memory.

## Step 2 — Apply the hard constraints

Every UI change goes through this checklist before commit:

- [ ] **Tokens, not literals.** No hex, `rgb()`, or pixel literals for
      color. Reach into `var(--…)` from `app/globals.css` or a Tailwind
      utility (`bg-bg-base`, `text-spectrum-cobalt`, `font-mono`,
      `shadow-2`). Same for spacing, radius, motion, durations.
- [ ] **Logical CSS only** for direction. `inset-inline-start`,
      `padding-inline-*`, `margin-inline-*`. Never `left`/`right` for
      layout. RTL parity is non-negotiable.
- [ ] **i18n first.** New strings land in
      [`lib/translations.ts`](../../../lib/translations.ts) with both
      `en` and `ar` populated. Don't transliterate — write idiomatic
      Arabic. Numerals switch with locale (`01` → `٠١`).
- [ ] **Self-hosted fonts.** Use the four families already loaded via
      `next/font/local` in [`app/layout.tsx`](../../../app/layout.tsx).
      Never add a new Google Fonts link or `@import url(fonts.googleapis…)`.
- [ ] **Use existing primitives.**
      • `<Reveal>` for any block that should fade-in on scroll.
      • `<SectionHeading>` for any section heading — it auto-handles the
      `*italic*` marker and accent period.
      • `.editorial-section` / `grid-cols-[1fr_2fr]` / `divide-y
      divide-border-subtle` for section composition.
- [ ] **Reduced motion** branch is mandatory. Any new animation gets
      cancelled inside the `@media (prefers-reduced-motion: reduce)`
      block in `app/globals.css`.
- [ ] **No emoji** in copy, section markers, or favicons.
- [ ] **No multicolor icons.** Lucide stroke icons + Simple Icons brand
      marks only.
- [ ] **Build verifies.** `npm run build` must pass before commit.

## Step 3 — Match the design language

Before writing CSS or JSX, decide *which existing pattern fits*:

| Surface | Use this anatomy |
| --- | --- |
| New page section | `<section id="..." className="editorial-section px-6 sm:px-10 scroll-mt-24" aria-labelledby="...-title">` with the `1fr_2fr` two-column header grid. See `components/About.tsx`. |
| List of items | Numbered ordered list with `divide-y divide-border-subtle`, `grid-cols-[3rem_1fr] sm:grid-cols-[5rem_1fr]`. See `components/Projects.tsx`. Numerals in `.numeral` (mono). |
| Item with multiple instances | Cycle the `tone-{emerald,cobalt,citrus,magenta,violet}` class across them so each gets its Spectrum tone (number color, tag-chip tint, hover top bar). See how `Projects.tsx` does it. |
| Tag / badge / chip | `.tag-chip` — mono font, soft tint background, spring-eased hover lift. |
| Heading with display flourish | Wrap *one* word in asterisks: `'Things I'\''ve *shipped*.'`. `<SectionHeading>` parses it. The trailing period becomes accent-colored automatically. Latin only — Arabic strings omit the markers. |
| Decorative imagery | A solid Spectrum tint with a bold word as the visual anchor. **No hand-rolled SVG illustrations.** No soft pastel washes. |

## Step 4 — Match the voice

Before writing user-facing copy:

- First-person, plain-spoken. **I**, never **we**.
- Specific over vague. Drop names (Emirates NBD, Sadagaat). Numbers
  earn their place.
- Sentence case for headings, with a trailing `.` when it's a statement.
- Section labels are numbered, slash-separated, mono-tracked:
  `01 / About`. In Arabic: `٠١ / نبذة`.
- Em-dash for pacing — sparingly.
- The only "code-y" punctuation is `//` in the hero tagline.

Read [`docs/design-system/voice-tone.md`](../../../docs/design-system/voice-tone.md)
for examples and the bilingual rules.

## Step 5 — Verify before declaring done

1. `npx tsc --noEmit` clean.
2. `npm run build` clean.
3. Toggle to Arabic in dev — confirm RTL parity (no flipped layouts,
   no clipped text, italic flourishes fall back to sans).
4. DevTools → Rendering → emulate `prefers-reduced-motion: reduce` —
   confirm every new animation cancels.
5. **Don't commit yet.** The user reviews UI changes in dev before
   committing. Show them the dev URL and pause.
6. When approved, ship via the branch + PR flow — **never push directly
   to `main`**. Sequence (also documented in [`CLAUDE.md`](../../../CLAUDE.md)):

   ```bash
   git switch main && git pull --rebase
   git switch -c <type>/<short-slug>
   git commit -m "<atomic Conventional Commit>"
   git push -u origin <branch>
   gh pr create --base main --head <branch> --title "<subject>" --body "..."
   gh pr merge <PR#> --rebase --delete-branch --repo smsm95/portfolio
   git switch main && git pull --rebase
   ```

   Use atomic Conventional Commits with lowercase prefixes (`feat:`,
   `fix:`, `chore:`). Include the
   `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` trailer.

7. The merge to `main` triggers the OIDC deploy automatically. Watch
   it with `gh run watch …`.

## When to skip this skill

This skill is for **portfolio UI work only**. Skip it for:

- AWS / S3 / CloudFront / Route 53 / IAM / OIDC tasks
- GitHub Actions / CI workflow edits
- Dependency bumps that don't touch UI
- Security audits, secret rotation, MFA flows
- Documentation edits that don't change the design system
- Editing memory or `.claude/settings.json`

For those, follow the relevant project memory entries and CLAUDE.md
operational rules without invoking this skill.
