import type { ReactNode } from 'react';

type Props = {
  id?: string;
  children: string;
  className?: string;
};

/**
 * Editorial section heading. Two micro-features driven by markers in the
 * source string so translators don't see new structure:
 *   - `Pre *italic* post.` → renders the italic word in Instrument Serif
 *     (Latin only; Arabic falls back to its sans face via .serif-italic).
 *   - A trailing `.`/`!`/`?` is split off and accent-colored.
 *
 * Both are optional. A plain string with no markers and no terminal
 * punctuation renders cleanly as a regular heading.
 */
export function SectionHeading({ id, children, className }: Props) {
  return (
    <h2 id={id} className={className}>
      <span className="section-heading">{parse(children)}</span>
    </h2>
  );
}

function parse(text: string): ReactNode {
  let pre = text;
  let italic: string | null = null;
  let post = '';

  const italicMatch = text.match(/^(.*?)\*([^*]+)\*(.*)$/s);
  if (italicMatch) {
    [, pre, italic, post] = italicMatch;
  }

  const tail = (italic ? post : pre).match(/^(.*?)([.!?])$/s);
  let body: string;
  let punct: string | null = null;
  if (tail) {
    [, body, punct] = tail;
  } else {
    body = italic ? post : pre;
  }

  return (
    <>
      {italic ? (
        <>
          {pre}
          <em className="serif-italic">{italic}</em>
          {body}
        </>
      ) : (
        body
      )}
      {punct && <span className="accent-period">{punct}</span>}
    </>
  );
}
