'use client';

import Reveal from './Reveal';
import { social } from '@/lib/data';
import { useLocale } from '@/lib/i18n';

export default function Contact() {
  const { t } = useLocale();

  return (
    <section
      id="contacts"
      className="editorial-section px-6 sm:px-10 scroll-mt-24"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-end">
        <Reveal>
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-ink-muted numeral">
              {t.contact.sectionLabel}
            </span>
            <h2 id="contact-title" className="display-3 text-ink-primary mt-4">
              {t.contact.sectionHeading}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="text-base text-ink-secondary leading-relaxed">
            <p>
              {t.contact.leadBefore}
              <a
                href={social.email}
                className="text-ink-primary underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] transition-all"
              >
                {t.contact.leadLink}
              </a>
              {t.contact.leadAfter}
            </p>
            <p className="mt-4 text-ink-muted">
              {t.contact.socialPart1}
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink-primary transition-colors underline-offset-4 hover:underline"
              >
                {t.contact.linkedinLabel}
              </a>
              {t.contact.socialAnd}
              <a
                href={social.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink-primary transition-colors underline-offset-4 hover:underline"
              >
                {t.contact.upworkLabel}
              </a>
              {t.contact.socialEnd}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
