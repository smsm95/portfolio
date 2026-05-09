'use client';

import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Wraps children in a reveal-on-scroll element.
 * Adds the `reveal-in` class once the element enters the viewport.
 * Fires only once. Uses direct DOM mutation instead of React state to avoid
 * StrictMode double-mount races.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* If reduced-motion is on, no animation needed; reveal immediately. */
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal-in');
      return;
    }

    /* Re-trigger on re-entry so scrolling back up replays the reveal.
     * No negative rootMargin — short elements at the page end (footer)
     * need every available pixel to clear the threshold. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('reveal-in', entry.isIntersecting);
        }
      },
      { rootMargin: '0px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as 'div';

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
