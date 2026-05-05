import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { LocaleProvider } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Osama Mirghani · Software Engineer',
  description:
    'Full-stack software engineer with 8+ years of experience building secure, scalable web applications. Currently at Emirates NBD.',
  openGraph: {
    title: 'Osama Mirghani · Software Engineer',
    description:
      'Full-stack software engineer with 8+ years of experience building secure, scalable web applications.',
    type: 'website',
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
    <html lang="en" className={`${inter.variable} ${plexArabic.variable}`}>
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
