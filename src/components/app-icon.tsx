/**
 * The app icon: three passes fanned in a stack, front one in Midnight's pass blue.
 * Drawn for next/og's ImageResponse (flexbox and absolute positioning only).
 */
export function AppIconArt({ size, rounded = false }: { size: number; rounded?: boolean }) {
  const u = size / 100;
  const pass = (top: number, inset: number, height: number, background: string) => ({
    position: "absolute" as const,
    top: top * u,
    left: inset * u,
    right: inset * u,
    height: height * u,
    borderRadius: 9 * u,
    background,
    display: "flex",
  });
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        position: "relative",
        background: "#000000",
        borderRadius: rounded ? 22 * u : 0,
      }}
    >
      <div style={pass(18, 22, 40, "#0f5a73")} />
      <div style={pass(27, 17, 44, "#3b2f8f")} />
      <div style={{ ...pass(37, 12, 46, "#1d3f8f"), flexDirection: "column", padding: 9 * u, gap: 5 * u }}>
        <div style={{ width: 18 * u, height: 4 * u, borderRadius: 2 * u, background: "rgba(255,255,255,0.75)" }} />
        <div style={{ width: 40 * u, height: 7 * u, borderRadius: 3 * u, background: "#ffffff" }} />
      </div>
    </div>
  );
}
