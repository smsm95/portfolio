'use client';

import { Fragment } from 'react';
import Reveal from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SectionLabel } from './SectionLabel';
import { useLocale } from '@/lib/i18n';

const STACK_DOMAINS: Array<keyof ReturnType<typeof keyMap>> = [
  'Frontend',
  'Backend',
  'Cloud',
  'Practice',
];

const STACK_ITEMS = {
  Frontend: ['React', 'TypeScript', 'Next.js', 'Redux'],
  Backend: ['Node.js', 'Express', 'GraphQL', 'MongoDB'],
  Cloud: ['AWS (3x certified)', 'Docker'],
  Practice: ['Scrum (PSPO, PSM)', 'Solution Architecture'],
} as const;

function keyMap() {
  return STACK_ITEMS;
}

export default function About() {
  const { t } = useLocale();

  return (
    <section
      id="about"
      className="editorial-section px-6 sm:px-10 scroll-mt-24"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
        <Reveal>
          <div>
            <SectionLabel>{t.about.sectionLabel}</SectionLabel>
            <SectionHeading
              id="about-title"
              className="display-3 text-ink-primary mt-4"
            >
              {t.about.sectionHeading}
            </SectionHeading>
          </div>
        </Reveal>

        <div className="text-ink-secondary text-lg leading-relaxed space-y-6">
          <Reveal delay={120}>
            <p>{t.about.paragraph1}</p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              {t.about.freelanceLead}
              <span className="text-ink-primary">
                {t.about.freelanceHighlight}
              </span>
              {t.about.freelanceTail}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p>{t.about.paragraph3}</p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-5xl mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
        <Reveal>
          <div>
            <SectionLabel>{t.about.stackLabel}</SectionLabel>
            <SectionHeading className="display-3 text-ink-primary mt-4">
              {t.about.stackHeading}
            </SectionHeading>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] gap-x-4">
            {STACK_DOMAINS.map((domainKey) => (
              <Fragment key={domainKey}>
                <dt className="text-sm sm:text-base text-ink-muted pt-[1.4rem] pb-5 border-t border-border-subtle first-of-type:border-t-0 sm:first-of-type:border-t-0">
                  {t.about.domains[domainKey]}
                </dt>
                <dd className="text-base sm:text-lg text-ink-primary leading-relaxed pt-5 pb-5 border-t border-border-subtle first-of-type:border-t-0 m-0">
                  {STACK_ITEMS[domainKey].map((item, j) => (
                    <span key={item}>
                      {item}
                      {j < STACK_ITEMS[domainKey].length - 1 && (
                        <span className="text-ink-muted">{', '}</span>
                      )}
                    </span>
                  ))}
                </dd>
              </Fragment>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
