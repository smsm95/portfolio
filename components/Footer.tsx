'use client';

import { useLocale } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 sm:px-10 pb-10 pt-6 border-t border-border-subtle">
      <p className="text-center text-xs text-ink-secondary numeral">
        {t.footer.line.replace('{year}', String(year))}
      </p>
    </footer>
  );
}
