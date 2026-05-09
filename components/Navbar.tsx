'use client';

import { useEffect, useRef, useState } from 'react';
import { LuMoon, LuSun, LuDownload } from 'react-icons/lu';
import { navKeys, social } from '@/lib/data';
import { useLocale } from '@/lib/i18n';

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [active, setActive] = useState<string>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
    setTheme(
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  }, []);

  /* Scroll-spy */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    navKeys.forEach((key) => {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Follow system theme until the user opts out by toggling. We treat
   * localStorage.theme being set as the opt-out signal, so the listener
   * is a no-op once the user has chosen. */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      try {
        if (localStorage.getItem('theme')) return; // user has chosen — leave alone
      } catch {
        /* private mode or storage blocked — fall through to follow system */
      }
      const next: 'dark' | 'light' = mql.matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      setTheme(next);
    };
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, []);

  /* Keyboard shortcuts — single key, ignored when typing in inputs.
   *   T  → toggle theme
   *   L  → toggle locale */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        target?.isContentEditable ||
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT'
      ) {
        return;
      }
      const k = e.key.toLowerCase();
      if (k === 't') {
        e.preventDefault();
        toggleTheme();
      } else if (k === 'l') {
        e.preventDefault();
        toggleLocale();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, locale]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* localStorage may be unavailable */
    }
    const el = iconRef.current;
    if (el) {
      el.removeAttribute('data-spin');
      void el.offsetWidth;
      el.setAttribute('data-spin', 'true');
    }
  };

  const toggleLocale = () => setLocale(locale === 'ar' ? 'en' : 'ar');
  const otherLocaleLabel = locale === 'ar' ? 'EN' : 'AR';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 entrance transition-colors duration-300 ${
        scrolled
          ? 'bg-bg-base/95 backdrop-blur-sm border-b border-border-subtle'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 sm:py-5 grid grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Logo (letter mark) — triple-click pulses through the Spectrum */}
        <a
          href="#home"
          aria-label={t.nav.homeAria}
          className="inline-flex items-center"
          onClick={(e) => {
            if (e.detail === 3) {
              const mark = e.currentTarget.querySelector('.monogram');
              mark?.classList.remove('monogram-spectrum');
              void (mark as HTMLElement | null)?.offsetWidth;
              mark?.classList.add('monogram-spectrum');
            }
          }}
        >
          <span
            aria-hidden
            className="monogram grid place-items-center w-8 h-8 rounded-full bg-ink-primary text-bg-base text-sm font-bold"
          >
            O
          </span>
        </a>

        {/* Centered nav */}
        <nav aria-label="Primary" className="hidden sm:block justify-self-center">
          <ul className="flex items-center gap-1 sm:gap-2 md:gap-6">
            {navKeys.map((key) => {
              const isActive = active === key;
              return (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link inline-flex items-center px-2 sm:px-3 h-11 text-sm transition-colors ${
                      isActive
                        ? 'text-ink-primary font-medium'
                        : 'text-ink-secondary hover:text-ink-primary'
                    }`}
                  >
                    <span>{t.nav[key]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right cluster: language + theme + CV */}
        <div className="justify-self-end flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.nav.languageToggleAria(locale === 'ar' ? 'en' : 'ar')}
            aria-keyshortcuts="L"
            className="grid place-items-center min-w-11 h-11 px-2 rounded-full text-sm font-medium text-ink-secondary hover:text-ink-primary cursor-pointer transition-colors numeral"
          >
            {otherLocaleLabel}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeToggleAria(theme === 'dark' ? 'light' : 'dark')}
            aria-pressed={theme === 'dark'}
            aria-keyshortcuts="T"
            className="grid place-items-center w-11 h-11 rounded-full text-ink-secondary hover:text-ink-primary cursor-pointer transition-colors"
          >
            <span ref={iconRef} className="theme-toggle-icon">
              {mounted && theme === 'light' ? (
                <LuSun size={16} aria-hidden />
              ) : (
                <LuMoon size={16} aria-hidden />
              )}
            </span>
          </button>
          <a
            href={social.cv}
            download
            className="cv-button hidden sm:inline-flex items-center gap-2 h-11 ps-5 pe-1.5 rounded-full bg-ink-primary text-ink-inverse text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <span>{t.nav.cv}</span>
            <span className="cv-button-chip grid place-items-center w-8 h-8 rounded-full bg-accent text-ink-primary">
              <LuDownload size={14} aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
