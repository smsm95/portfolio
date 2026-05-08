'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { social } from '@/lib/data';
import { useLocale } from '@/lib/i18n';

export default function NotFound() {
  const { t } = useLocale();
  const [path, setPath] = useState<string>('/');

  useEffect(() => {
    const p = window.location.pathname;
    if (p && p !== '/404.html') setPath(p);
  }, []);

  const headingMatch = t.notFound.heading.match(/^(.*?)\*([^*]+)\*(.*)$/s);
  const [pre, italic, post] = headingMatch
    ? [headingMatch[1], headingMatch[2], headingMatch[3]]
    : [t.notFound.heading, '', ''];

  return (
    <main
      id="main"
      tabIndex={-1}
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="nf-grid" aria-hidden />
      <div className="nf-stage">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-muted numeral mb-6 entrance">
          {t.notFound.label}
        </p>
        <h1 className="nf-num" aria-label="404">
          <span className="nf-d4-1" aria-hidden>4</span>
          <span className="nf-d0" aria-hidden>0</span>
          <span className="nf-d4-2" aria-hidden>4</span>
        </h1>
        <h2 className="nf-h">
          {pre}
          {italic && <em className="serif-italic">{italic}</em>}
          {post}
        </h2>
        <p className="nf-body">
          {t.notFound.bodyBeforePath}
          <code className="nf-code">{path}</code>
          {t.notFound.bodyAfterPath}
        </p>
        <div className="nf-actions">
          <Link href="/" className="nf-btn-primary">
            <span>{t.notFound.takeMeHome}</span>
            <span className="nf-chip" aria-hidden>
              →
            </span>
          </Link>
          <a href={social.email} className="nf-btn-secondary">
            {t.notFound.emailInstead}
          </a>
        </div>
        <span className="nf-dot d1" aria-hidden />
        <span className="nf-dot d2" aria-hidden />
        <span className="nf-dot d3" aria-hidden />
        <span className="nf-dot d4" aria-hidden />
      </div>
    </main>
  );
}
