const COLS = 6;
const ROWS = 10;
const SKULL_SIZE = 52; // px — fixed so we can guarantee no overlap
const CELL_H = 130; // px
// max safe jitter so skull edge never reaches cell boundary
// cell width on a 1280px screen ≈ 213px; padding each side = (213 - 52)/2 = 80px
// we use 45% of that padding as max jitter so skulls stay well separated
const MAX_JITTER_PCT = 2.8; // % of viewport width
const MAX_JITTER_Y = 30; // px

const skulls = (() => {
  const items = [];
  let s = 0xdeadbeef;
  const rand = () => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 0xffffffff;
  };

  const cellW = 100 / COLS;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const isDiamondOffset = row % 2 === 1;
      // Cell centre in %
      const centreX = col * cellW + cellW / 2 + (isDiamondOffset ? cellW / 2 : 0);
      const centreY = row * CELL_H + CELL_H / 2;
      // Bounded jitter
      const jitterX = (rand() * 2 - 1) * MAX_JITTER_PCT;
      const jitterY = (rand() * 2 - 1) * MAX_JITTER_Y;
      const opacity = 0.18 + rand() * 0.24;
      const rotation = (rand() - 0.5) * 20;

      items.push({
        id: row * COLS + col,
        x: centreX + jitterX,        // % — centre of skull
        y: centreY + jitterY,        // px — centre of skull
        size: SKULL_SIZE,
        opacity,
        rotation,
      });
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
            // offset by half the skull so the centre lands on (x, y)
            left: `calc(${skull.x}% - ${skull.size / 2}px)`,
            top: `${skull.y - skull.size / 2}px`,
            width: `${skull.size}px`,
            height: `${skull.size}px`,
            opacity: skull.opacity,
            transform: `rotate(${skull.rotation}deg)`,
            mixBlendMode: "screen",
            objectFit: "contain",
          }}
        />
      ))}
    </div>
  );
}
