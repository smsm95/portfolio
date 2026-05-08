import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LocaleProvider } from '@/lib/i18n';

const inter = localFont({
  src: './fonts/Inter-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

const plexArabic = localFont({
  src: [
    { path: './fonts/IBMPlexSansArabic-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/IBMPlexSansArabic-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexSansArabic-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSansArabic-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/IBMPlexSansArabic-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-arabic',
  display: 'swap',
});

const jetBrainsMono = localFont({
  src: './fonts/JetBrainsMono-Variable.woff2',
  variable: '--font-mono',
  display: 'swap',
  weight: '400 700',
});

const instrumentSerif = localFont({
  src: [
    {
      path: './fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://osamamirghani.com'),
  title: 'Osama Mirghani · Software Engineer',
  description:
    'Full-stack software engineer with 8+ years of experience building secure, scalable web applications. Currently at Emirates NBD.',
  openGraph: {
    title: 'Osama Mirghani · Software Engineer',
    description:
      'Full-stack software engineer with 8+ years of experience building secure, scalable web applications.',
    type: 'website',
    url: 'https://osamamirghani.com',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#16181d' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexArabic.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script src="/theme-init.js" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
