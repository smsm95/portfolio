'use client';

import { useEffect, useRef } from 'react';

/**
 * 12px violet dot that lags the cursor with a spring easing.
 * Desktop only (skips on coarse pointers / reduced motion).
 * Driven by direct DOM mutation in a rAF loop — never causes a React
 * re-render, no scroll listener, no re-flow.
 */
export default function CursorAccent() {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dotRef.current;
    if (!el) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let visible = false;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = '1';
        // Initialise position so the first frame doesn't snap from -100
        x = targetX;
        y = targetY;
      }
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], summary, label, input, textarea, select'
      );
      el.classList.toggle('is-interactive', interactive);
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = '0';
    };

    const tick = () => {
      // Spring lerp — feels springy without the "wobble" of a true spring
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <span ref={dotRef} className="cursor-accent" aria-hidden />;
}
