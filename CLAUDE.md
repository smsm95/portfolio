# Claude Code — project guide

`osamamirghani.com` — Next.js 16 static-export portfolio, deployed to S3 +
CloudFront via GitHub Actions OIDC. Bilingual EN / AR with full RTL.

## Read this before adding any UI

**[`docs/design-system/README.md`](docs/design-system/README.md)** is the
source of truth for visual decisions. Walk through its checklist before
creating any component.

The project ships a Claude Code skill — **[`om-ds-ui`](.claude/skills/om-ds-ui/SKILL.md)**
— that automatically activates on UI-related requests ("add a section",
"create a component", "redesign", `/om-ds`, etc.) and walks the agent
through the design system. Trust it over memory or training.

| File | Use |
| --- | --- |
| [`docs/design-system/README.md`](docs/design-system/README.md) | Visual foundations, hard rules, the "when you add a component" checklist |
| [`docs/design-system/tokens.css`](docs/design-system/tokens.css) | Canonical color / type / motion / spacing tokens (mirror `app/globals.css`) |
| [`docs/design-system/voice-tone.md`](docs/design-system/voice-tone.md) | Copy guide — voice, tone, casing, bilingual rules |
| [`app/globals.css`](app/globals.css) | Runtime tokens. Mirror of `tokens.css`; if you change one, change both. |
| [`tailwind.config.ts`](tailwind.config.ts) | Exposes tokens as Tailwind utilities (`bg-bg-base`, `text-spectrum-cobalt`, `font-mono`, etc.) |
| [`lib/translations.ts`](lib/translations.ts) | Every user-facing string in EN + AR. New copy goes here first. |
| [`components/SectionHeading.tsx`](components/SectionHeading.tsx) | Use for any section heading — handles `*italic*` markers and accent period |
| [`components/Reveal.tsx`](components/Reveal.tsx) | Wrap any block that should fade-in on scroll |

## Hard constraints

- **OKLCH tokens only.** No hex, no `rgb()`. Reach into `var(--…)` or a
  Tailwind utility that maps to one.
- **Logical CSS properties** for anything directional — `inset-inline-start`,
  `padding-inline-*`, `margin-inline-*`. RTL parity is non-negotiable.
- **i18n first.** New strings land in `lib/translations.ts` (EN + AR) before
  the JSX. Don't transliterate; write idiomatic Arabic.
- **Self-hosted fonts only.** Inter, IBM Plex Sans Arabic, JetBrains Mono,
  Instrument Serif Italic — all under [`app/fonts/`](app/fonts/) and
  registered via `next/font/local` in `app/layout.tsx`. **No Google Fonts
  CDN at build or runtime.**
- **Reduced motion** cancels every animation — extend the
  `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`
  whenever you add one.
- **No emoji** in copy, section markers, or favicons. Use iconography or
  letterforms.
- **Build before commit.** `npm run build` must succeed.

## Workflow

**Every change goes through a branch + PR, never directly to `main`.**
This is non-negotiable — the user set this rule explicitly. The exact
sequence:

```bash
# 1. Sync, branch
git switch main && git pull --rebase
git switch -c <type>/<short-slug>     # e.g. fix/footer-contrast

# 2. Edit, atomic Conventional Commits
git add … && git commit -m "..."

# 3. Push, PR, rebase merge, delete branch
git push -u origin <branch>
gh pr create --base main --head <branch> --title "<commit subject>" --body "..."
gh pr merge <PR#> --rebase --delete-branch --repo smsm95/portfolio

# 4. Sync local main, watch deploy
git switch main && git pull --rebase && git fetch --prune
gh run watch $(gh run list --branch main --limit 1 --json databaseId --jq '.[0].databaseId') --exit-status
```

Branch naming: `<type>/<slug>` matching the commit prefix — `fix/…`,
`feat/…`, `chore/…`, `ci/…`, `docs/…`. The `main` branch ruleset
enforces `non_fast_forward`, `deletion`, and `required_linear_history`,
so merge-commit strategies will be rejected; rebase merge is the only
option.

The deploy itself:

- Push to `main` (via merged PR) → GitHub Actions OIDC role assumes
  `github-actions-portfolio-deployer`, builds, syncs to S3, invalidates
  CloudFront. Single workflow, no manual steps.
- Local one-off deploys: `./deploy.sh` uses the `portfolio-deployer` AWS
  profile (least-priv IAM user). Use only when the CI flow is broken.

**Atomic Conventional Commits.** Lowercase prefixes (`fix:`, `feat:`,
`chore:`, `ci:`, `docs:`). Body explains *why*, not *what*. Always
include the `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`
trailer.

## Project layout

```
app/
├── layout.tsx          ← font registration, LocaleProvider
├── page.tsx            ← composes Hero/About/Projects/Contact/Footer
├── globals.css         ← runtime tokens (mirror of docs/design-system/tokens.css)
├── not-found.tsx       ← /404.html
└── fonts/              ← all four font families, woff2

components/             ← all UI components
lib/
├── data.ts             ← projects, social links, nav keys
├── translations.ts     ← EN + AR copy
└── i18n.tsx            ← LocaleProvider + useLocale hook
```
