import type { Streak } from "@/lib/streak";

function FlameIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2c.5 3.2-1 5.3-2.6 7.1C7.8 10.9 6 12.8 6 15.6 6 19.1 8.7 22 12 22s6-2.9 6-6.4c0-2.4-1.1-4.3-2.3-5.6.1 1.6-.5 2.9-1.6 3.4.4-3.9-.6-8.6-2.1-11.4z" />
    </svg>
  );
}

/** "5-day streak · best 12". Grey until today's practice is done, so it nudges without nagging. */
export function StreakBadge({ streak, className = "" }: { streak: Streak; className?: string }) {
  const { current, longest, practisedToday } = streak;
  const lit = practisedToday && current > 0;
  const text =
    current === 0
      ? "Practise today to start a streak"
      : practisedToday
        ? `${current}-day streak`
        : `${current}-day streak · practise today to keep it`;
  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full bg-group px-3 py-1 text-[0.8125rem] font-medium tabular-nums ${className}`}
      aria-label={`${text}${longest > current ? `. Best: ${longest} days` : ""}`}
    >
      <FlameIcon className={`size-4 ${lit ? "text-[#ff8a1f]" : "text-label-2"}`} />
      <span className={lit ? "" : "text-label-2"}>{text}</span>
      {longest > current && <span className="text-label-2">· best {longest}</span>}
    </p>
  );
}
