import { ViewTransition } from "react";
import { MODULES, type ModuleId, type StackLogo } from "@/lib/content/schema";
import { PassEmboss } from "./module-art";
import { StackChips } from "./stack-logo";

const SHORT: Partial<Record<ModuleId, string>> = {
  frontend: "FE",
  backend: "BE",
  fullstack: "FS",
  os: "OS",
  net: "NET",
  math: "MA",
  embedded: "EMB",
  data: "DS",
  ml: "ML",
  llm: "LLM",
  python: "PY",
  go: "GO",
  rust: "RS",
  java: "JV",
  node: "ND",
  express: "EX",
  react: "RE",
  nextjs: "NX",
  springboot: "SB",
  devops: "OPS",
  ai: "AI",
  swe: "SWE",
  leetcode: "LC",
  stack: "STK",
  interview: "INT",
};

/** "F1 · How the web works" → { code: "F1", name: "How the web works" }; branches get a short code. */
export function moduleParts(id: ModuleId) {
  const [code, name] = MODULES[id].split(" · ");
  return name ? { code, name } : { code: SHORT[id] ?? code.slice(0, 2).toUpperCase(), name: code };
}

const ORDER = Object.keys(MODULES) as ModuleId[];
/** Neighbouring modules get different pass colours, as passes in a wallet do. */
export const hueFor = (id: ModuleId) => ((ORDER.indexOf(id) % 3) + 1) as 1 | 2 | 3;

/** The module's square badge, the pass's "logo". */
export function ModuleBadge({ id, className = "" }: { id: ModuleId; className?: string }) {
  return (
    <span
      className={`grid h-8 w-10 shrink-0 place-items-center rounded-lg bg-[var(--well-strong)] text-[0.75rem] font-bold tracking-tight ${className}`}
    >
      {moduleParts(id).code}
    </span>
  );
}

/** Label over value, the way a boarding pass shows GATE over B12. */
export function Field({
  label,
  children,
  align = "start",
}: {
  label: string;
  children: React.ReactNode;
  align?: "start" | "end";
}) {
  return (
    <div className={align === "end" ? "text-right" : ""}>
      <dt className="field-label">{label}</dt>
      <dd className="field-value mt-0.5 text-[0.9375rem] font-medium">{children}</dd>
    </div>
  );
}

/**
 * A card as a Wallet pass: module badge and name, an optional field top right, the title as the
 * primary field, a row of secondary fields, then the body.
 */
export function CardPass({
  module,
  title,
  titleAs: Title = "h2",
  topRight,
  fields,
  stack = [],
  children,
  footer,
  className = "",
}: {
  module: ModuleId;
  title: React.ReactNode;
  titleAs?: "h1" | "h2";
  topRight?: React.ReactNode;
  fields?: React.ReactNode;
  /** Technologies the card is about: logo chips under the fields, and the first as the emboss. */
  stack?: StackLogo[];
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  const { name } = moduleParts(module);
  return (
    // Revealing an answer turns the pass over (a "flip" transition from CardView); nothing else animates here.
    <ViewTransition update={{ flip: "pass-flip", default: "none" }} default="none">
      <section className={`pass relative isolate ${className}`} data-hue={hueFor(module)}>
        <PassEmboss id={module} logo={stack[0]} className="top-14 -right-4 -z-10 size-32" />
        <header className="flex items-start justify-between gap-4 px-5 pt-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <ModuleBadge id={module} />
            <span className="truncate text-[0.9375rem] font-semibold">{name}</span>
          </div>
          {topRight}
        </header>
        <Title className="px-5 pt-6 text-[1.625rem] leading-[1.15] font-semibold tracking-[-0.015em] text-balance">
          {title}
        </Title>
        {fields && <dl className="flex flex-wrap gap-x-7 gap-y-3 px-5 pt-4">{fields}</dl>}
        {stack.length > 0 && (
          <div className="px-5 pt-4">
            <p className="field-label">Stack</p>
            <div className="mt-1.5">
              <StackChips stack={stack} />
            </div>
          </div>
        )}
        {children && <div className="mt-5 border-t border-[var(--well-strong)] px-5 py-5">{children}</div>}
        {footer && <div className="border-t border-[var(--well-strong)] px-5 py-3.5">{footer}</div>}
      </section>
    </ViewTransition>
  );
}
