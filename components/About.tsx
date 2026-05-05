'use client';

import Reveal from './Reveal';
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
            <span className="text-xs uppercase tracking-[0.18em] text-ink-muted numeral">
              {t.about.sectionLabel}
            </span>
            <h2 id="about-title" className="display-3 text-ink-primary mt-4">
              {t.about.sectionHeading}
            </h2>
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
            <span className="text-xs uppercase tracking-[0.18em] text-ink-muted numeral">
              {t.about.stackLabel}
            </span>
            <h2 className="display-3 text-ink-primary mt-4">
              {t.about.stackHeading}
            </h2>
          </div>
        </Reveal>

        <dl className="divide-y divide-border-subtle">
          {STACK_DOMAINS.map((domainKey, i) => (
            <Reveal key={domainKey} delay={120 + i * 80}>
              <div className="grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] gap-4 py-5">
                <dt className="text-sm sm:text-base text-ink-muted pt-0.5">
                  {t.about.domains[domainKey]}
                </dt>
                <dd className="text-base sm:text-lg text-ink-primary leading-relaxed">
                  {STACK_ITEMS[domainKey].map((item, j) => (
                    <span key={item}>
                      {item}
                      {j < STACK_ITEMS[domainKey].length - 1 && (
                        <span className="text-ink-muted">{', '}</span>
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
