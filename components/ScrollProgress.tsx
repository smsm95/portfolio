/**
 * 1px Spectrum gradient bar at the top of the viewport that fills as the
 * page scrolls. Uses CSS scroll-driven `animation-timeline: scroll(root)`.
 * Older browsers see the static gradient at scaleX(0) — no progress, no
 * jitter. Behind the navbar (z-index < .pf-nav) so it doesn't overlap UI.
 */
export default function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden />;
}
