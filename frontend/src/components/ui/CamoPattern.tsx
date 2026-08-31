// An original tileable camo-style texture — smaller, denser, flowing
// pinched-waist blobs in a wide color spread, packed tightly enough that
// little of the base color shows through (closer to a "color camo" style:
// more numerous, smaller pieces than traditional woodland camo, rather
// than a few large shapes). Not a reproduction of any brand's specific
// camo print — an original pattern in the general camouflage style.
//
// tileSize controls how large one repeat of the pattern is, in pixels.
// Match it to the container: a thin strip needs a small tile (so several
// full repeats fit within the visible height instead of showing one
// giant tile cropped down to a sliver), while a full section background
// can use a larger tile for a coarser texture.
export default function CamoPattern({
  id,
  className = '',
  tones = ['#1f2b12', '#3f5522', '#6b7f3a', '#8fa856'],
  tileSize = 110,
}: {
  id: string;
  className?: string;
  tones?: string[];
  tileSize?: number;
}) {
  const [base, a, b, c] = tones;
  const third = c ?? b;
  const scale = tileSize / 100;
  const colorCycle = [a, b, third, a, third, b, a, b, third, a, b, third];

  // One flowing, pinched-waist blob, reused at many positions/sizes/
  // rotations below so the pattern reads as small overlapping pieces
  // rather than a handful of large floating shapes.
  const BLOB =
    'M2,11 C-1,4 8,-3 15,1 C22,-3 29,5 24,12 C29,19 20,27 12,22 C5,27 -3,18 2,11 Z';

  const placements: { x: number; y: number; s: number; r: number }[] = [
    { x: -6, y: -6, s: 1.5, r: 12 },
    { x: 20, y: -8, s: 1.1, r: -18 },
    { x: 42, y: -4, s: 1.4, r: 30 },
    { x: 66, y: -8, s: 1.0, r: -8 },
    { x: 86, y: -4, s: 1.3, r: 20 },
    { x: -8, y: 22, s: 1.2, r: -25 },
    { x: 14, y: 26, s: 1.0, r: 15 },
    { x: 36, y: 20, s: 1.5, r: -10 },
    { x: 60, y: 26, s: 1.1, r: 22 },
    { x: 82, y: 22, s: 1.3, r: -15 },
    { x: 4, y: 50, s: 1.3, r: 18 },
    { x: 28, y: 48, s: 1.0, r: -20 },
    { x: 50, y: 52, s: 1.4, r: 8 },
    { x: 72, y: 48, s: 1.1, r: -28 },
    { x: 92, y: 52, s: 1.2, r: 14 },
    { x: -6, y: 76, s: 1.4, r: -12 },
    { x: 18, y: 78, s: 1.1, r: 24 },
    { x: 40, y: 74, s: 1.3, r: -18 },
    { x: 64, y: 78, s: 1.0, r: 10 },
    { x: 86, y: 76, s: 1.4, r: -22 },
  ];

  return (
    <svg className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern
          id={id}
          width={tileSize}
          height={tileSize}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(6)"
        >
          <rect width={tileSize} height={tileSize} fill={base} />
          <g transform={`scale(${scale})`}>
            {/* Several placements sit near or past a tile edge (negative
                x/y, or past 100) so the shape continues into the next
                repeat instead of getting cut off. A pattern only clips to
                its own tile, so each blob is also drawn offset by ±100 in
                x and y — the copies that land outside this tile are
                clipped away for free, and the one that lands on this
                tile's edge is what makes the pattern flow seamlessly
                instead of showing a visible seam every 100 units. */}
            {placements.map((p, i) =>
              [-100, 0, 100].flatMap((dx) =>
                [-100, 0, 100].map((dy) => (
                  <path
                    key={`${i}-${dx}-${dy}`}
                    d={BLOB}
                    fill={colorCycle[i % colorCycle.length]}
                    transform={`translate(${p.x + dx} ${p.y + dy}) rotate(${p.r} 13 13) scale(${p.s})`}
                  />
                ))
              )
            )}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
