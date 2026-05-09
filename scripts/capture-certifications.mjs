#!/usr/bin/env node
/**
 * Capture certifications from a Credly user profile.
 *
 * Reads the public Credly badges feed (JSON, no auth required), downloads
 * each badge image, and emits:
 *   - public/certificates/<slug>.{png,webp,webp@2x,avif,avif@2x}
 *   - lib/certifications.json — the manifest used by lib/data.ts
 *
 * Refresh manually: `npm run certifications`. Outputs are committed.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FEED_URL =
  process.env.CREDLY_FEED ??
  'https://www.credly.com/users/osama-mirghani/badges.json';

const BADGE_DIR = resolve(ROOT, 'public/certificates');
const MANIFEST_PATH = resolve(ROOT, 'lib/certifications.json');

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[™®©]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36',
    },
  });
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function emitImageAssets(slug, sourceUrl) {
  const buf = await fetchBuffer(sourceUrl);

  // Source badges are typically 600x600 PNG. Emit two density tiers:
  // 1x = 256, 2x = 512. Aspect preserved by sharp's `fit: inside`.
  const at1x = sharp(buf).resize(256, 256, { fit: 'inside' });
  const at2x = sharp(buf).resize(512, 512, { fit: 'inside' });

  await Promise.all([
    at2x
      .clone()
      .png({ compressionLevel: 9 })
      .toFile(resolve(BADGE_DIR, `${slug}.png`)),
    at1x
      .clone()
      .webp({ quality: 88 })
      .toFile(resolve(BADGE_DIR, `${slug}.webp`)),
    at2x
      .clone()
      .webp({ quality: 84 })
      .toFile(resolve(BADGE_DIR, `${slug}@2x.webp`)),
    at1x
      .clone()
      .avif({ quality: 70, effort: 6 })
      .toFile(resolve(BADGE_DIR, `${slug}.avif`)),
    at2x
      .clone()
      .avif({ quality: 65, effort: 6 })
      .toFile(resolve(BADGE_DIR, `${slug}@2x.avif`)),
  ]);
}

async function main() {
  await mkdir(BADGE_DIR, { recursive: true });

  console.log(`→ fetching ${FEED_URL}`);
  const feedRes = await fetch(FEED_URL, {
    headers: { Accept: 'application/json' },
  });
  if (!feedRes.ok) {
    throw new Error(`feed fetch failed: ${feedRes.status}`);
  }
  const feed = await feedRes.json();
  const badges = Array.isArray(feed.data) ? feed.data : [];
  console.log(`✓ ${badges.length} badge(s) in feed`);

  // Sort newest first for the wall.
  badges.sort((a, b) => {
    const da = a.issued_at_date || a.issued_at || '';
    const db = b.issued_at_date || b.issued_at || '';
    return db.localeCompare(da);
  });

  const manifest = [];
  for (const badge of badges) {
    const tpl = badge.badge_template ?? {};
    const name = tpl.name?.trim();
    if (!name) continue;

    const slug = slugify(name);
    const issuer =
      tpl.issuer?.entities?.find((e) => e.primary)?.entity?.name ??
      tpl.issuer?.entities?.[0]?.entity?.name ??
      null;
    const imageUrl = tpl.image_url || tpl.image?.url;
    if (!imageUrl) {
      console.warn(`  ! ${slug}: no image url, skipped`);
      continue;
    }

    console.log(`  · ${slug}`);
    try {
      await emitImageAssets(slug, imageUrl);
    } catch (err) {
      console.error(`  ! ${slug}: capture failed: ${err.message}`);
      continue;
    }

    const isoDate = badge.issued_at_date || badge.issued_at?.slice(0, 10);
    const year = isoDate ? Number(isoDate.slice(0, 4)) : null;

    manifest.push({
      slug,
      name,
      issuer,
      year,
      issuedAt: isoDate ?? null,
      verifyUrl: `https://www.credly.com/badges/${badge.id}`,
    });
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n✓ wrote ${manifest.length} cert(s) to lib/certifications.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
