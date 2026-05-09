'use client';

import Reveal from './Reveal';
import { useLocale } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLocale();
  const year = String(new Date().getFullYear());
  const [before, after] = t.footer.line.split('{year}');

  return (
    <footer className="px-6 sm:px-10 pb-10 pt-6 border-t border-border-subtle">
      <Reveal>
        <p className="text-center text-xs text-ink-secondary numeral">
          {renderWithSeparators(before)}
          <span className="footer-year">
            {Array.from(year).map((c, i) => (
              <span
                key={i}
                className="footer-year-char"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {c}
              </span>
            ))}
          </span>
          {renderWithSeparators(after)}
        </p>
      </Reveal>
    </footer>
  );
}

/** Wrap every `·` in the footer line so we can pulse it ambient-style. */
function renderWithSeparators(segment: string) {
  const parts = segment.split('·');
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <span className="footer-separator">·</span>}
    </span>
  ));
}
