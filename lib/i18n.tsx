'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  LOCALES,
  translations,
  type Locale,
  type Translation,
} from './translations';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translation;
  dir: 'ltr' | 'rtl';
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: translations.en,
  dir: 'ltr',
});

function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && (LOCALES as string[]).includes(v);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  /* Hydrate from html attribute set by /theme-init.js (avoids FOUC). */
  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-locale');
    if (isLocale(attr)) setLocaleState(attr);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    const html = document.documentElement;
    html.setAttribute('lang', next);
    html.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('data-locale', next);
    try {
      localStorage.setItem('locale', next);
    } catch {
      /* localStorage may be unavailable */
    }
  }, []);

  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: translations[locale], dir }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
