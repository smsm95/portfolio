'use client';

import Reveal from './Reveal';
import { SectionHeading } from './SectionHeading';
import { SectionLabel } from './SectionLabel';
import { projects } from '@/lib/data';
import { useLocale } from '@/lib/i18n';

const SPECTRUM_TONES = [
  'emerald',
  'cobalt',
  'citrus',
  'magenta',
  'violet',
] as const;

export default function Projects() {
  const { t } = useLocale();

  return (
    <section
      id="projects"
      className="editorial-section px-6 sm:px-10 scroll-mt-24"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 mb-16">
        <Reveal>
          <div>
            <SectionLabel>{t.projects.sectionLabel}</SectionLabel>
            <SectionHeading
              id="projects-title"
              className="display-3 text-ink-primary mt-4"
            >
              {t.projects.sectionHeading}
            </SectionHeading>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-base text-ink-muted leading-relaxed self-end max-w-prose">
            {t.projects.intro}
          </p>
        </Reveal>
      </div>

      <ol className="mx-auto max-w-5xl divide-y divide-border-subtle">
        {projects.map((project, i) => {
          const number = String(i + 1).padStart(2, '0');
          const translatedItem = t.projects.items[i];
          const tone = SPECTRUM_TONES[i % SPECTRUM_TONES.length];
          return (
            <Reveal key={project.title} delay={i * 90} as="li">
              <div
                className={`project-row tone-${tone} grid grid-cols-[3rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-8 py-10 sm:py-12 group`}
              >
                <span className="project-num numeral text-sm pt-2">
                  {number}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="project-title text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
                      {translatedItem?.title ?? project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link group/link inline-flex items-center gap-1 text-sm text-ink-muted hover:text-accent transition-colors underline-offset-4"
                      >
                        <span className="project-link-domain">
                          {project.link.url
                            .replace(/^https?:\/\//, '')
                            .replace(/\/$/, '')}
                        </span>
                        <span aria-hidden className="project-link-arrow">
                          ↗
                        </span>
                      </a>
                    )}
                  </div>

                  <p className="mt-4 text-base sm:text-lg text-ink-secondary leading-relaxed max-w-prose">
                    {translatedItem?.description ?? project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <li
                        key={tag}
                        className="tag-chip"
                        style={{ transitionDelay: `${120 + idx * 50}ms` }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
