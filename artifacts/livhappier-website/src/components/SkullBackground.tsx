const skulls = (() => {
  const items = [];
  let s = 0xdeadbeef;
  const rand = () => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 0xffffffff;
  };

  const cols = 6;
  const rows = 10;
  const cellW = 100 / cols;
  const cellH = 120;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isDiamondOffset = row % 2 === 1;
      const baseX = col * cellW + (isDiamondOffset ? cellW / 2 : 0);
      const baseY = row * cellH;
      const jitterX = (rand() - 0.5) * cellW * 0.6;
      const jitterY = (rand() - 0.5) * cellH * 0.5;
      const size = 45 + rand() * 90;
      const opacity = 0.18 + rand() * 0.28;
      const rotation = (rand() - 0.5) * 30;
      items.push({
        id: row * cols + col,
        x: baseX + jitterX,
        y: baseY + jitterY,
        size,
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
            left: `${skull.x}%`,
            top: `${skull.y}px`,
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
