import type { ReactNode } from 'react';

type Props = {
  id?: string;
  children: string;
  className?: string;
};

/**
 * Editorial section heading.
 *   - `Pre *italic* post.` → italic word in Instrument Serif (Latin only).
 *   - Trailing `.`/`!`/`?` is split off and accent-colored.
 *   - Each word is wrapped in `.section-heading-word` so the parent
 *     <Reveal>'s `reveal-in` class can stagger the rise via CSS.
 *
 * The italic word counts as one "word" for staggering purposes.
 */
export function SectionHeading({ id, children, className }: Props) {
  return (
    <h2 id={id} className={className}>
      <span className="section-heading">{render(children)}</span>
    </h2>
  );
}

type Token =
  | { kind: 'word'; text: string }
  | { kind: 'italic'; text: string }
  | { kind: 'space' }
  | { kind: 'period'; text: string };

function tokenize(text: string): Token[] {
  let pre = text;
  let italic: string | null = null;
  let post = '';

  const italicMatch = text.match(/^(.*?)\*([^*]+)\*(.*)$/s);
  if (italicMatch) {
    [, pre, italic, post] = italicMatch;
  }

  const periodSource = italic ? post : pre;
  const tail = periodSource.match(/^(.*?)([.!?])$/s);
  let body: string;
  let punct: string | null = null;
  if (tail) {
    [, body, punct] = tail;
  } else {
    body = periodSource;
  }

  const tokens: Token[] = [];

  const pushWords = (segment: string) => {
    const parts = segment.split(/(\s+)/);
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        tokens.push({ kind: 'space' });
      } else {
        tokens.push({ kind: 'word', text: part });
      }
    }
  };

  if (italic) {
    pushWords(pre);
    tokens.push({ kind: 'italic', text: italic });
    pushWords(body);
  } else {
    pushWords(body);
  }

  if (punct) tokens.push({ kind: 'period', text: punct });
  return tokens;
}

function render(text: string): ReactNode {
  const tokens = tokenize(text);
  let wordIndex = 0;
  return tokens.map((t, i) => {
    const delayMs = wordIndex * 70;
    if (t.kind === 'space') {
      return <span key={i}> </span>;
    }
    if (t.kind === 'period') {
      const node = (
        <span
          key={i}
          className="section-heading-word accent-period"
          style={{ transitionDelay: `${delayMs}ms` }}
        >
          {t.text}
        </span>
      );
      wordIndex++;
      return node;
    }
    if (t.kind === 'italic') {
      const node = (
        <em
          key={i}
          className="section-heading-word serif-italic"
          style={{ transitionDelay: `${delayMs}ms` }}
        >
          {t.text}
        </em>
      );
      wordIndex++;
      return node;
    }
    const node = (
      <span
        key={i}
        className="section-heading-word"
        style={{ transitionDelay: `${delayMs}ms` }}
      >
        {t.text}
      </span>
    );
    wordIndex++;
    return node;
  });
}
