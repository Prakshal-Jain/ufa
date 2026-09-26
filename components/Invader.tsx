// Pixel sprites from the original arcade cabinet, drawn as crisp SVG rects.
// Each sprite has two frames; CSS swaps them on a stepped timer so they "march".
// Shared by the page decorations and the hidden mini-game.
export const SPRITES = {
  squid: [
    ["...XX...", "..XXXX..", ".XXXXXX.", "XX.XX.XX", "XXXXXXXX", "..X..X..", ".X.XX.X.", "X.X..X.X"],
    ["...XX...", "..XXXX..", ".XXXXXX.", "XX.XX.XX", "XXXXXXXX", ".X.XX.X.", "X......X", ".X....X."],
  ],
  crab: [
    ["..X.....X..", "...X...X...", "..XXXXXXX..", ".XX.XXX.XX.", "XXXXXXXXXXX", "X.XXXXXXX.X", "X.X.....X.X", "...XX.XX..."],
    ["..X.....X..", "X..X...X..X", "X.XXXXXXX.X", "XXX.XXX.XXX", "XXXXXXXXXXX", ".XXXXXXXXX.", "..X.....X..", ".X.......X."],
  ],
  octopus: [
    ["....XXXX....", ".XXXXXXXXXX.", "XXXXXXXXXXXX", "XXX..XX..XXX", "XXXXXXXXXXXX", "...XX..XX...", "..XX.XX.XX..", "XX........XX"],
    ["....XXXX....", ".XXXXXXXXXX.", "XXXXXXXXXXXX", "XXX..XX..XXX", "XXXXXXXXXXXX", "..XXX..XXX..", ".XX..XX..XX.", "..XX....XX.."],
  ],
  saucer: [
    [".....XXXXXX.....", "...XXXXXXXXXX...", "..XXXXXXXXXXXX..", ".XX.XX.XX.XX.XX.", "XXXXXXXXXXXXXXXX", "..XXX..XX..XXX..", "...X........X..."],
  ],
  ship: [
    [".....X.....", "....XXX....", "....XXX....", ".XXXXXXXXX.", "XXXXXXXXXXX", "XXXXXXXXXXX", "XXXXXXXXXXX"],
  ],
  boom: [
    ["X...X...X", ".X..X..X.", "..X...X..", "XX.....XX", "..X...X..", ".X..X..X.", "X...X...X"],
  ],
} as const;

export type SpriteName = keyof typeof SPRITES;

function toPath(rows: readonly string[]) {
  let d = "";
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) if (row[x] === "X") d += `M${x} ${y}h1v1h-1z`;
  });
  return d;
}

export function Invader({
  kind = "crab",
  size = 22,
  className = "",
  title,
}: {
  kind?: SpriteName;
  size?: number;
  className?: string;
  title?: string;
}) {
  const frames = SPRITES[kind];
  const w = frames[0][0].length;
  const h = frames[0].length;
  return (
    <svg
      className={`invader ${frames.length > 1 ? "invader-anim" : ""} ${className}`}
      width={size}
      height={(size * h) / w}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {frames.map((f, i) => (
        <path key={i} className={`f${i}`} d={toPath(f)} />
      ))}
    </svg>
  );
}

// A row of the arcade's green shields, rebuilt as a pixel divider.
export function Shields({ count = 4 }: { count?: number }) {
  const shield = ["..XXXXXXXX..", ".XXXXXXXXXX.", "XXXXXXXXXXXX", "XXXXXXXXXXXX", "XXX......XXX", "XX........XX"];
  const d = toPath(shield);
  return (
    <div className="shields" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="48" height="24" viewBox="0 0 12 6" shapeRendering="crispEdges" fill="currentColor">
          <path d={d} />
        </svg>
      ))}
    </div>
  );
}
