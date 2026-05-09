/**
 * Numbered section label like "01 / Selected work".
 * Wraps each character in a span so the parent <Reveal>'s `reveal-in`
 * class can stagger the type-in via CSS (`.section-label-char`).
 */
type Props = { children: string };

export function SectionLabel({ children }: Props) {
  return (
    <span className="section-label text-xs uppercase tracking-[0.18em] text-ink-muted numeral">
      {Array.from(children).map((c, i) => (
        <span
          key={i}
          className="section-label-char"
          style={{ transitionDelay: `${i * 28}ms` }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
}
