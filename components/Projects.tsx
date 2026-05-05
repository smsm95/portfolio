'use client';

import Reveal from './Reveal';
import { projects } from '@/lib/data';
import { useLocale } from '@/lib/i18n';

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
            <span className="text-xs uppercase tracking-[0.18em] text-ink-muted numeral">
              {t.projects.sectionLabel}
            </span>
            <h2 id="projects-title" className="display-3 text-ink-primary mt-4">
              {t.projects.sectionHeading}
            </h2>
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
          return (
            <Reveal key={project.title} delay={i * 90} as="li">
              <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-8 py-10 sm:py-12 group">
                <span className="numeral text-sm text-ink-muted pt-2">
                  {number}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-primary">
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

                  <p className="mt-5 text-sm text-ink-muted">
                    {project.tags.join(', ')}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
