import type { Solution } from "@/lib/content/schema";

const DOT: Record<Solution["difficulty"], string> = { Easy: "bg-good", Medium: "bg-[#f5a524]", Hard: "bg-bad" };

/** "● Medium": the colour carries the level at a glance, the word keeps it readable on every theme. */
export function Difficulty({ level, className = "" }: { level: Solution["difficulty"]; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span aria-hidden className={`size-2 rounded-full ${DOT[level]}`} />
      {level}
    </span>
  );
}
