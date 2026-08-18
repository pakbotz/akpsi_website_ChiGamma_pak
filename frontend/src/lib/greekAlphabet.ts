// Pledge classes are named sequentially after the Greek alphabet, in order.
// String sort doesn't match this order (e.g. "Eta" < "Epsilon" alphabetically,
// but Eta comes after Epsilon in the real sequence), so we sort against this
// lookup instead of using the default string comparator.
export const GREEK_ALPHABET_ORDER = [
  'Alpha',
  'Beta',
  'Gamma',
  'Delta',
  'Epsilon',
  'Zeta',
  'Eta',
  'Theta',
  'Iota',
  'Kappa',
  'Lambda',
  'Mu',
  'Nu',
  'Xi',
  'Omicron',
  'Pi',
  'Rho',
  'Sigma',
  'Tau',
  'Upsilon',
  'Phi',
  'Chi',
  'Psi',
  'Omega',
] as const;

export type GreekLetter = (typeof GREEK_ALPHABET_ORDER)[number];

export function sortByGreekOrder(letters: string[]): string[] {
  return [...letters].sort(
    (a, b) => GREEK_ALPHABET_ORDER.indexOf(a as GreekLetter) - GREEK_ALPHABET_ORDER.indexOf(b as GreekLetter)
  );
}

// The oldest pledge class still active in the chapter and the most
// recently chartered one. Update these two as older classes graduate
// out and new ones are chartered — everything else (the filter
// options, their order) follows automatically.
const OLDEST_ACTIVE_PLEDGE_CLASS: GreekLetter = 'Lambda';
const CURRENT_PLEDGE_CLASS: GreekLetter = 'Pi';

export const CHAPTER_PLEDGE_CLASSES = GREEK_ALPHABET_ORDER.slice(
  GREEK_ALPHABET_ORDER.indexOf(OLDEST_ACTIVE_PLEDGE_CLASS),
  GREEK_ALPHABET_ORDER.indexOf(CURRENT_PLEDGE_CLASS) + 1
);

// Spelled-out name -> the actual Greek letter, for display. Filtering/sorting
// still runs on the spelled-out name (GREEK_ALPHABET_ORDER above) since that's
// what's stored on each Brother — this is purely a presentation layer.
const GREEK_LETTER_SYMBOLS: Record<GreekLetter, string> = {
  Alpha: 'Α',
  Beta: 'Β',
  Gamma: 'Γ',
  Delta: 'Δ',
  Epsilon: 'Ε',
  Zeta: 'Ζ',
  Eta: 'Η',
  Theta: 'Θ',
  Iota: 'Ι',
  Kappa: 'Κ',
  Lambda: 'Λ',
  Mu: 'Μ',
  Nu: 'Ν',
  Xi: 'Ξ',
  Omicron: 'Ο',
  Pi: 'Π',
  Rho: 'Ρ',
  Sigma: 'Σ',
  Tau: 'Τ',
  Upsilon: 'Υ',
  Phi: 'Φ',
  Chi: 'Χ',
  Psi: 'Ψ',
  Omega: 'Ω',
};

export function toGreekLetter(name: string): string {
  return GREEK_LETTER_SYMBOLS[name as GreekLetter] ?? name;
}
