# Voice & Tone — OM/DS

Use this when writing or translating any user-facing copy.

## Voice
First-person, plain-spoken, technically confident. The portfolio uses
**I** freely — never **we**, never **the team**. Sentences are short.
Periods do real work.

## Tone signature

- **Quietly self-assured.** *"I build secure, scalable products for
  finance."* Not *"Crafting beautiful experiences for discerning
  clients."*
- **Specific over vague.** Names dropped: Emirates NBD, Sadagaat, SAPA.
  Numbers earn their place ("8+ years"). No filler stats.
- **Honest about scope.** *"Most of my recent work is internal banking,
  so what ships publicly is the older social-impact work, still
  running."* That clause — *still running* — is the tonal target:
  pride without bragging.
- **Directly inviting, not salesy.** *"Open to freelance projects.
  Always up for a conversation."* Not *"Let's create something
  amazing together!"*

## Casing

- **Display + headings:** sentence case with a trailing period when it
  functions as a statement (`What I work on.`, `Things I've shipped.`).
- **Section labels:** numbered, slash-separated, uppercase tracking-wide,
  e.g. `01 / About`, `03 / Selected work`. In Arabic these become
  `٠١ / نبذة` (Eastern Arabic numerals, switched per locale).
- **Buttons:** Title Case for primary CTAs (`Download CV`, `Visit site`),
  sentence case for inline links.

## Punctuation tics

- A `//` divider in the tagline (`Software Engineer // Full Stack
  Developer`) — the only "code-y" punctuation.
- **Em-dash for pacing — used sparingly.**
- The italic flourish marker: wrap a single word in asterisks inside a
  heading (`Things I've *shipped*.`). The `<SectionHeading>` component
  parses this and renders the word in Instrument Serif italic with
  accent color. Latin only — Arabic translations omit the asterisks.
- Curly quotes are not enforced; straight is fine. (Existing files use
  curly `'` apostrophes — match the surroundings.)

## No emoji

Anywhere. Brand uses iconography or letterforms.

## Bilingual rules

- Every string has an Arabic counterpart in `lib/translations.ts`.
  Arabic strings are not transliteration — they are **idiomatic**
  (e.g. *Open to freelance work* → *متاح للعمل الحر*).
- Numerals switch with locale: `01` → `٠١` (Eastern Arabic),
  `2026` → `٢٠٢٦`.
- Latin tracking is dialed back in Arabic (`letter-spacing: 0`,
  looser line-heights).
- The italic flourish (Instrument Serif) is Latin-only. Arabic
  translations should NOT include `*…*` markers — `[lang='ar']
  .serif-italic` falls back to IBM Plex Sans Arabic without italic.

## Examples (ground-truth from translations.ts)

- Hero tagline: `Software Engineer // Full Stack Developer`
- About lead: *"I build secure, scalable products for finance. At
  Emirates NBD that means digital business banking, instant lending
  integrations, and partner APIs that move real money."*
- Projects heading: `Things I've *shipped*.`
- Contact lead: *"The fastest way to reach me is by email. I reply
  within a working day."*
- Footer: `© {year} Osama Mirghani · Dubai, UAE`
