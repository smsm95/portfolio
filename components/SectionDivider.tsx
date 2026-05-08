/**
 * 1px horizontal Spectrum gradient between editorial sections.
 * Sweeps in from the centre when the line scrolls into view via
 * `animation-timeline: view()` (Safari 26+, Chrome 115+, Firefox 132+).
 * Older browsers see the static gradient at rest opacity — graceful.
 */
export function SectionDivider() {
  return (
    <div className="section-divider-wrap" aria-hidden>
      <span className="section-divider" />
    </div>
  );
}
