(function () {
  var d = document.documentElement;

  /* Theme */
  try {
    var stored = localStorage.getItem('theme');
    var theme =
      stored ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    if (theme === 'dark') d.classList.add('dark');
  } catch (e) {
    /* localStorage blocked */
  }

  /* Locale: prefer stored, fall back to navigator language, default to en */
  try {
    var locale = localStorage.getItem('locale');
    if (locale !== 'ar' && locale !== 'en') {
      locale =
        navigator.language && navigator.language.toLowerCase().indexOf('ar') === 0
          ? 'ar'
          : 'en';
    }
    d.setAttribute('lang', locale);
    d.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    d.setAttribute('data-locale', locale);
  } catch (e) {
    d.setAttribute('lang', 'en');
    d.setAttribute('dir', 'ltr');
    d.setAttribute('data-locale', 'en');
  }

  /* Hash skip-path */
  if (window.location.hash) d.classList.add('hash-load');
})();
