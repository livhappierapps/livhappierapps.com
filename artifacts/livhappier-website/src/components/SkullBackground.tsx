const SKULL_SIZE = 72;
const COLS = 8;
const ROWS = 11;

const skulls = (() => {
  const items = [];
  const cellW = 100 / COLS;     // % of viewport width per column
  const cellH = 100 / ROWS;     // % of viewport height per row

  for (let row = 0; row < ROWS; row++) {
    const isOdd = row % 2 === 1;
    const xOffset = isOdd ? cellW / 2 : 0;

    for (let col = 0; col < COLS; col++) {
      const x = col * cellW + cellW / 2 + xOffset;
      if (x > 102) continue; // skip any that bleed off-screen on odd rows
      const y = row * cellH + cellH / 2;
      items.push({ id: row * COLS + col, x, y });
    }
  }
  return items;
})();

export function SkullBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {skulls.map((skull) => (
        <img
          key={skull.id}
          src="/skull.png"
          alt=""
          style={{
            position: "absolute",
            left: `calc(${skull.x}% - ${SKULL_SIZE / 2}px)`,
            top: `calc(${skull.y}% - ${SKULL_SIZE / 2}px)`,
            width: `${SKULL_SIZE}px`,
            height: `${SKULL_SIZE}px`,
            opacity: 0.25,
            mixBlendMode: "screen",
            objectFit: "contain",
          }}
        />
      ))}
    </div>
  );
}
