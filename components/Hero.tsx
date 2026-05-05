'use client';

import { SiLinkedin, SiUpwork, SiGmail } from 'react-icons/si';
import { social } from '@/lib/data';
import { useLocale } from '@/lib/i18n';

const clients = ['Emirates NBD', 'Elliptic', 'Interface FZE', 'Xzone'];

export default function Hero() {
  const { t } = useLocale();

  const socialLinks = [
    { href: social.linkedin, label: t.hero.socialLabels.linkedin, Icon: SiLinkedin },
    { href: social.upwork, label: t.hero.socialLabels.upwork, Icon: SiUpwork },
    { href: social.email, label: t.hero.socialLabels.email, Icon: SiGmail },
  ];

  return (
    <section
      id="home"
      className="relative flex flex-col min-h-[100svh] pt-24 sm:pt-28"
    >
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 sm:px-10">
        {/* Vertical social rail (desktop) */}
        <ul aria-label="Social profiles" className="social-rail hidden md:flex">
          {socialLinks.map(({ href, label, Icon }, i) => (
            <li
              key={label}
              className="entrance-social-item"
              style={{ animationDelay: `${280 + i * 60}ms` }}
            >
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={label}
              >
                <Icon size={20} aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        {/* Photo */}
        <div className="hero-stage entrance-photo">
          <div className="hero-photo">
            <picture>
              <source srcSet="/avatar.avif" type="image/avif" />
              <source srcSet="/avatar.webp" type="image/webp" />
              <img
                src="/avatar.png"
                alt={t.hero.name}
                width={600}
                height={720}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>

        {/* Mobile social row */}
        <ul
          aria-label="Social profiles"
          className="flex md:hidden justify-center gap-6 mt-6 entrance-social-row"
        >
          {socialLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="text-ink-secondary hover:text-accent transition-colors"
              >
                <Icon size={20} aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        {/* Name + tagline */}
        <div className="relative mt-6 sm:mt-8">
          <h1 className="hero-name" aria-label={t.hero.name}>
            {t.hero.nameWords.map((word, i) => (
              <span
                key={i}
                className="entrance-word"
                style={{ animationDelay: `${360 + i * 90}ms` }}
                aria-hidden
              >
                {word}
                {i < t.hero.nameWords.length - 1 && <span aria-hidden> </span>}
              </span>
            ))}
          </h1>
          <p className="hero-tagline mt-2.5 entrance-tagline">
            {t.hero.taglineLeft}{' '}
            <span className="text-accent">//</span> {t.hero.taglineRight}
          </p>
        </div>
      </div>

      {/* Clients band */}
      <div className="mt-auto entrance-clients">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-ink-muted numeral mb-4">
          {t.hero.workedWith}
        </p>
        <div className="clients-band">
          {clients.map((c) => (
            <span key={c} className="client-mark">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
