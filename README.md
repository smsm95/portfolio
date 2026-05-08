# osamamirghani.com

> Source for **[osamamirghani.com](https://osamamirghani.com)** — a bilingual editorial portfolio for a software engineer in Dubai.

Single-page Next.js static export. English and Arabic with full RTL parity, light and dark themes, motion-as-brand. Deploys to AWS S3 + CloudFront on every push to `main`.

## Stack

| | |
| --- | --- |
| **Framework** | Next.js 16 App Router, static export (`output: 'export'`) |
| **Runtime** | React 19 · TypeScript 5 |
| **Styling** | Tailwind CSS 3 + OKLCH design tokens via CSS variables |
| **Fonts** | Inter Variable, IBM Plex Sans Arabic, JetBrains Mono Variable, Instrument Serif Italic — **all self-hosted** via `next/font/local` |
| **Icons** | `react-icons` (Lucide UI + Simple Icons brand marks) |
| **i18n** | Custom React Context + typed dictionaries (no library) |
| **Hosting** | AWS S3 (private origin) → CloudFront (TLSv1.2_2021, HTTP→HTTPS) |
| **DNS** | Route 53 — A/AAAA aliases, CAA, SPF `-all`, DMARC `p=reject` |
| **CI/CD** | GitHub Actions, OIDC-federated IAM role (no long-lived AWS keys) |

## Design system

The site is built on **OM/DS** — its own design system documented in [`docs/design-system/`](docs/design-system/). 5-stop Spectrum palette (emerald, cobalt, citrus, magenta, violet) layered on warm-paper neutrals; mono voice for section labels and tags; a single-word Instrument Serif italic flourish per display heading. All tokens in OKLCH, all directional CSS in logical properties for RTL parity.

Read [`docs/design-system/README.md`](docs/design-system/README.md) for the full visual foundations and the "when you add a component" checklist.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
```

The dev server runs Turbopack. Build output is fully static — no runtime, no server.

Want to deploy a copy from your laptop without GitHub Actions? Copy `deploy.config.example.sh` to `deploy.config.sh`, fill in your `BUCKET` + `DISTRIBUTION_ID`, then `./deploy.sh`.

## Project layout

```
app/
├── layout.tsx          font registration, LocaleProvider, metadata
├── page.tsx            composes Hero/About/Projects/Contact/Footer
├── not-found.tsx       /404.html — Lost in transit
├── globals.css         runtime tokens + motion + reduced-motion branch
└── fonts/              all four families, woff2

components/
├── Hero, About, Projects, Contact, Footer, Navbar
├── SectionHeading.tsx  parses *italic* markers + accent period
└── Reveal.tsx          IntersectionObserver scroll-reveal wrapper

lib/
├── data.ts             projects, social URLs, nav keys
├── translations.ts     en + ar dictionaries (typed)
└── i18n.tsx            LocaleProvider + useLocale hook

docs/design-system/     visual foundations, tokens, voice + tone
.claude/skills/         om-ds-ui — Claude Code skill for UI work

.github/workflows/
└── deploy.yml          OIDC → build → S3 sync → CloudFront invalidate
```

## Customizing content

Three files cover most edits:

| What | Where |
| --- | --- |
| Project list, social URLs, nav | `lib/data.ts` |
| All visible text (en + ar) | `lib/translations.ts` |
| Avatar | replace `public/avatar.png`; regenerate `.webp` and `.avif` |
| Resume PDF | `public/resume.pdf` |
| Page metadata (title, OG) | `app/layout.tsx` |
| Design tokens | `app/globals.css` (mirror with `docs/design-system/tokens.css`) |

### Regenerating image variants

```bash
cd public
cwebp -q 82 -m 6 avatar.png -o avatar.webp
avifenc --min 32 --max 40 -j 4 avatar.png avatar.avif
```

`brew install webp libavif` for the binaries.

## Deployment

Push to `main`. The workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs in ~40 s:

1. Checkout, install, build (`output: 'export'` → `./out`)
2. `aws-actions/configure-aws-credentials@v4` assumes an IAM role via OIDC (no stored secrets)
3. Sync `_next/*` with 1-year immutable cache, then HTML/images with 60 s cache
4. Invalidate CloudFront `/*`

The `main` branch is protected: no force-push, no deletion, linear history required.

### Required GitHub repo variables

| Variable | Example |
| --- | --- |
| `AWS_REGION` | `us-east-1` |
| `AWS_ROLE_ARN` | `arn:aws:iam::ACCOUNT:role/github-actions-portfolio-deployer` |
| `S3_BUCKET` | your bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | `Exxxxxxxxx` |

The IAM role's trust policy is scoped to `repo:owner/repo:ref:refs/heads/main` so only this repo's main branch can assume it. The role's permission policy grants only `s3:ListBucket`, `s3:Put/Get/DeleteObject` on the bucket, and `cloudfront:CreateInvalidation` on the distribution.

## Security posture

- Private S3 origin behind CloudFront OAC; bucket policy scoped to the distribution ARN
- S3 default encryption (AES-256), versioning, BucketOwnerEnforced (no ACLs)
- CloudFront Response Headers Policy: HSTS (2y, preload, includeSubDomains), CSP, X-Frame DENY, X-Content-Type nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, COOP same-origin
- TLSv1.2_2021 minimum, HTTP→HTTPS redirect
- Route 53: CAA (Amazon CAs only), SPF `-all`, DMARC `p=reject` strict alignment, wildcard DKIM null
- IAM Access Analyzer enabled; AWS Budget with email alerts at 50/80/100%
- AWS Shield Standard (free, auto with CloudFront)

## Accessibility

- WCAG AA contrast verified in both themes
- All interactive elements ≥ 44 × 44 px
- `prefers-reduced-motion` short-circuits every animation
- Skip-to-content link, visible focus rings, semantic landmarks, scroll-spy `aria-current`
- `dir="rtl"` and `lang="ar"` switched at runtime; logical CSS throughout

## Browser support

Modern evergreen — Chrome/Edge 119+, Safari 17+, Firefox 121+. Uses OKLCH, CSS logical properties, `clip-path`, `100svh`, `IntersectionObserver`, `animation-timeline: view()`, AVIF. All baseline 2024.

## License

Source code, tokens, and components: **MIT**.
Avatar photo, resume, name, and brand identity: **© Osama Mirghani — all rights reserved.**
