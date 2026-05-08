import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Osama Mirghani · Software Engineer',
    short_name: 'Osama M',
    description:
      'Full-stack software engineer with 8+ years of experience building secure, scalable web applications. Currently at Emirates NBD.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f9f7f2',
    theme_color: '#16181d',
    icons: [
      {
        src: '/icon.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
