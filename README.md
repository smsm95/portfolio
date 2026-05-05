# Portfolio — Osama Mirghani

Personal portfolio site. Single-page editorial layout, bilingual (English / Arabic with full RTL), light + dark themes, motion-driven hero. Static-exported Next.js, deploys to AWS S3 + CloudFront.

Live: _coming soon_

## Stack

| | |
| --- | --- |
| **Framework** | Next.js 16 (App Router, static export via `output: 'export'`) |
| **Runtime** | React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 3, CSS variables for design tokens (OKLCH) |
| **Fonts** | `Inter` (Latin) + `IBM Plex Sans Arabic` via `next/font/google` |
| **Icons** | `react-icons` (Simple Icons + Lucide) |
| **i18n** | Custom React Context + dictionary, no library |
| **Hosting** | AWS S3 (static) behind CloudFront, Route 53 DNS |

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
```

The dev server runs Turbopack. The build output is fully static — no runtime, no server needed.

## Project structure

```
app/
  layout.tsx        # Root layout, fonts, LocaleProvider, metadata
  page.tsx          # Composes Hero / About / Projects / Contact / Footer
  globals.css       # Tokens, motion classes, RTL overrides
  icon.png          # Favicon (auto-served at /icon.png)
  apple-icon.png    # iOS touch icon

components/
  Navbar.tsx        # Fixed top nav, scroll-spy, theme + locale toggles
  Hero.tsx          # Photo + name + tagline + clients band
  About.tsx         # Section copy + tech stack listing
  Projects.tsx      # Numbered editorial list of public work
  Contact.tsx       # Email-led contact section
  Footer.tsx        # Single-line colophon
  Reveal.tsx        # IntersectionObserver wrapper for scroll reveals

lib/
  data.ts           # Project list, social URLs, nav keys
  i18n.tsx          # LocaleProvider, useLocale hook
  translations.ts   # en + ar dictionaries (typed)

public/
  avatar.{avif,webp,png}  # Photo (3 formats via <picture>)
  resume.pdf              # Downloaded by the "Download CV" button
  theme-init.js           # Pre-paint script: theme + locale + hash detection
  icon.png / apple-icon.png  # Auto-handled by Next.js
```

## Customizing content

Most edits happen in three files:

| What | Where |
| --- | --- |
| Project list, social URLs | `lib/data.ts` |
| All visible text (en + ar) | `lib/translations.ts` |
| Avatar photo | Replace `public/avatar.png` and regenerate `.webp` / `.avif` (see below) |
| Resume | Replace `public/resume.pdf` |
| Page metadata (title, OG) | `app/layout.tsx` |
| Design tokens (color, motion, spacing) | `app/globals.css` |

### Regenerating image variants

The hero photo ships in 3 formats so the browser picks the smallest. Recreate them with:

```bash
cd public
cwebp -q 82 -m 6 avatar.png -o avatar.webp
avifenc --min 32 --max 40 -j 4 avatar.png avatar.avif
```

Both `cwebp` and `avifenc` are available via Homebrew (`brew install webp libavif`).

## Deploy to AWS (S3 + CloudFront + Route 53)

For your `yourdomain.com` already managed in Route 53. Total cost: ~$1–3/month.

### One-time setup

```bash
# 1. Build
npm run build      # outputs ./out

# 2. Create S3 bucket (private; CloudFront reads via OAC)
BUCKET=portfolio-om-yourdomain-com
REGION=us-east-1   # required for CloudFront ACM cert

aws s3api create-bucket --bucket "$BUCKET" --region "$REGION"
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

Then in the AWS console:

1. **ACM** (us-east-1): request a public cert for `yourdomain.com` and `www.yourdomain.com`, validate via Route 53. Wait for **Issued**.
2. **CloudFront**: create distribution.
   - Origin: select your S3 bucket. Origin access: **OAC** (auto-generated).
   - Viewer protocol: **Redirect HTTP to HTTPS**.
   - Default root object: `index.html`.
   - Alternate domain names: `yourdomain.com`, `www.yourdomain.com`.
   - SSL: pick the ACM cert.
   - Custom error responses: map both `403 → /404.html (404, TTL 10)` and `404 → /404.html (404, TTL 10)`.
3. Apply the bucket policy CloudFront generates (it pins access to your distribution ARN).
4. **Route 53**: create A-Alias records for the apex and www, pointing at the CloudFront distribution.

### Recurring deploys

```bash
npm run build

# Long-cache immutable Next.js assets
aws s3 sync ./out/_next "s3://$BUCKET/_next" \
  --cache-control "public, max-age=31536000, immutable" --delete

# Short-cache HTML / images so updates show within a minute
aws s3 sync ./out "s3://$BUCKET" \
  --cache-control "public, max-age=60, must-revalidate" \
  --exclude "_next/*" --delete

aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID --paths "/*"
```

Stash `BUCKET` and `YOUR_DIST_ID` in a `deploy.sh` after the first run.

### Auto-deploy on push (GitHub Actions)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

One-time setup on the GitHub repo:

1. **Settings → Secrets and variables → Actions → Secrets**, add:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

2. **Settings → Secrets and variables → Actions → Variables**, add:
   - `AWS_REGION` (e.g. `us-east-1`)
   - `S3_BUCKET` (your bucket name)
   - `CLOUDFRONT_DISTRIBUTION_ID` (the `Exxxxx...` ID)

3. The IAM user behind those keys needs minimum permissions:
   - `s3:ListBucket`, `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` on the bucket
   - `cloudfront:CreateInvalidation` on the distribution

Push to `main`, watch the Actions tab. The workflow runs in ~1–2 min.

> **Security upgrade path**: replace the long-lived access keys with OIDC (no stored credentials). Configure GitHub as an OIDC provider in IAM, create a role with the trust policy scoped to this repo, then swap the workflow's `aws-access-key-id`/`aws-secret-access-key` lines for `role-to-assume:` pointing at the role ARN.

### Alternative: Amplify Hosting

If you'd rather skip the S3/CloudFront wiring, push to GitHub and connect via **AWS Amplify Hosting → New app → Host web app**. Build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild: { commands: [npm ci] }
    build:    { commands: [npm run build] }
  artifacts:
    baseDirectory: out
    files: ['**/*']
```

Tradeoff: ~$0.01/build minute and $0.15/GB served vs near-free with S3+CloudFront, but zero infra setup.

## Accessibility

- WCAG AA contrast verified in both themes (primary text 18:1; secondary ~7:1)
- All interactive elements ≥44×44px
- `prefers-reduced-motion` short-circuits every animation to instant
- Skip-to-content link, focus rings, semantic landmarks, scroll-spy `aria-current`
- Bilingual support honors `dir="rtl"` and `lang="ar"`

## Browser support

Modern evergreen only (Chrome / Edge 119+, Safari 17+, Firefox 121+). Uses OKLCH color, CSS logical properties, `clip-path`, `100svh`, `IntersectionObserver`, AVIF — all baseline 2024.

## License

Source code: MIT. Photo, resume, and personal content: all rights reserved.
