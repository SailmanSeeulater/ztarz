import type { StackLogo } from "@/lib/content/schema";

/** Relative luminance of a hex colour, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** The brand colour, unless it would vanish on a white chip (JavaScript yellow, say). */
const inkOnWhite = (hex: string) => (luminance(hex) > 0.6 ? "#1c1c1e" : `#${hex}`);

/** Just the mark: the logo path, or a lettered tile for technologies without one. */
export function StackMark({
  logo,
  className = "size-4",
  color,
}: {
  logo: StackLogo;
  className?: string;
  /** Defaults to the brand colour; pass "currentColor" to draw it in the surrounding ink. */
  color?: string;
}) {
  if (logo.path) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={`shrink-0 ${className}`} fill={color ?? inkOnWhite(logo.hex)}>
        <path d={logo.path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-[0.3rem] text-[0.5625rem] leading-none font-bold text-white ${className}`}
      style={{ background: color && color !== "currentColor" ? color : `#${logo.hex}` }}
    >
      {logo.title[0]}
    </span>
  );
}

/** The card's technologies as white chips, each with its logo in brand colour, like stickers on a pass. */
export function StackChips({ stack, className = "flex-wrap" }: { stack: StackLogo[]; className?: string }) {
  return (
    <ul className={`flex gap-1.5 ${className}`}>
      {stack.map((logo) => (
        <li
          key={logo.slug}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-2 text-[0.8125rem] leading-none font-semibold text-[#1c1c1e] shadow-[0_0_0_1px_rgb(0_0_0/0.06)]"
        >
          <StackMark logo={logo} className="size-3.5" />
          {logo.title}
        </li>
      ))}
    </ul>
  );
}
