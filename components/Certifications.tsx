'use client';

import Reveal from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SectionLabel } from './SectionLabel';
import { certifications } from '@/lib/data';
import { useLocale } from '@/lib/i18n';

const SPECTRUM_TONES = [
  'emerald',
  'cobalt',
  'citrus',
  'magenta',
  'violet',
] as const;

export default function Certifications() {
  const { t } = useLocale();

  return (
    <section
      id="certifications"
      className="editorial-section px-6 sm:px-10 scroll-mt-24"
      aria-labelledby="certifications-title"
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
        <Reveal>
          <div>
            <SectionLabel>{t.certifications.sectionLabel}</SectionLabel>
            <SectionHeading
              id="certifications-title"
              className="display-3 text-ink-primary mt-4"
            >
              {t.certifications.sectionHeading}
            </SectionHeading>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-base text-ink-muted leading-relaxed self-end max-w-prose">
            {t.certifications.intro}
          </p>
        </Reveal>
      </div>

      <ul className="mx-auto max-w-5xl mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
        {certifications.map((cert, i) => {
          const localized = t.certifications.items[cert.slug];
          const tone = SPECTRUM_TONES[i % SPECTRUM_TONES.length];
          const name = localized?.name ?? cert.name;
          const issuer = localized?.issuer ?? cert.issuer ?? '';
          return (
            <Reveal key={cert.slug} delay={160 + i * 90} as="li">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`cert-cell tone-${tone} group/cert`}
                aria-label={t.certifications.verifyAria(name)}
              >
                <div className="cert-badge">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`/certificates/${cert.slug}.avif 1x, /certificates/${cert.slug}@2x.avif 2x`}
                    />
                    <source
                      type="image/webp"
                      srcSet={`/certificates/${cert.slug}.webp 1x, /certificates/${cert.slug}@2x.webp 2x`}
                    />
                    <img
                      src={`/certificates/${cert.slug}.png`}
                      alt=""
                      width={256}
                      height={256}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <p className="cert-name">{name}</p>
                <p className="cert-meta numeral">
                  {issuer && <span className="cert-issuer">{issuer}</span>}
                  {cert.year && (
                    <>
                      {issuer && (
                        <span aria-hidden className="cert-sep">
                          ·
                        </span>
                      )}
                      <time dateTime={cert.issuedAt ?? String(cert.year)}>
                        {cert.year}
                      </time>
                    </>
                  )}
                </p>
              </a>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
