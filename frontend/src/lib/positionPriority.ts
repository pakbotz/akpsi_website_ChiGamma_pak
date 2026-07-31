const PRIORITY_PREFIXES = ['President', 'Executive', 'VP'];

export function positionRank(position: string): number {
  const idx = PRIORITY_PREFIXES.findIndex((prefix) => position.startsWith(prefix));
  return idx === -1 ? PRIORITY_PREFIXES.length : idx;
}

export function sortPastPositions(positions: string[]): string[] {
  return [...positions].sort((a, b) => {
    const rankDiff = positionRank(a) - positionRank(b);
    return rankDiff !== 0 ? rankDiff : a.localeCompare(b);
  });
}