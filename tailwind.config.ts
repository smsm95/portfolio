import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          base: 'var(--bg-base)',
          elevated: 'var(--bg-elevated)',
          card: 'var(--bg-card)',
          nav: 'var(--bg-nav)',
          inverse: 'var(--bg-inverse)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          default: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
        ink: {
          primary: 'var(--ink-primary)',
          secondary: 'var(--ink-secondary)',
          muted: 'var(--ink-muted)',
          inverse: 'var(--ink-inverse)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          hover: 'var(--accent-hover)',
        },
        spectrum: {
          emerald: 'var(--spectrum-emerald)',
          cobalt: 'var(--spectrum-cobalt)',
          citrus: 'var(--spectrum-citrus)',
          magenta: 'var(--spectrum-magenta)',
          violet: 'var(--spectrum-violet)',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-arabic)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        arabic: ['var(--font-arabic)', 'sans-serif'],
        mono: [
          'var(--font-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
        emerald: 'var(--shadow-emerald)',
        cobalt: 'var(--shadow-cobalt)',
      },
    },
  },
  plugins: [],
};

export default config;
