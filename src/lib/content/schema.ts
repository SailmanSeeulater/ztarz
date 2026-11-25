import { z } from "zod";

/** Foundations F1–F11, the four role branches, and cross-branch stack comparisons. */
export const MODULES = {
  f1: "F1 · How the web works",
  f2: "F2 · Linux and the shell",
  f3: "F3 · Git and collaboration",
  f4: "F4 · One language, deeply",
  f5: "F5 · Data structures and algorithms",
  f6: "F6 · Databases",
  f7: "F7 · APIs and architecture",
  f8: "F8 · Running software",
  f9: "F9 · Security basics",
  f10: "F10 · Reliability and performance",
  f11: "F11 · Working with AI and people",
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps and servers",
  ai: "AI engineering",
  stack: "Stack nuance",
  interview: "Interview answers",
} as const;

export type ModuleId = keyof typeof MODULES;

export const FOUNDATIONS = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11"] as const;

/** Which foundations each role branch builds on (from the plan's curriculum map). */
export const BRANCH_PREREQS = {
  frontend: ["f1", "f4", "f7"],
  backend: ["f1", "f6", "f7"],
  devops: ["f2", "f8", "f10"],
  ai: ["f4", "f7", "f11"],
} as const satisfies Partial<Record<ModuleId, readonly ModuleId[]>>;
const moduleId = z.enum(Object.keys(MODULES) as [ModuleId, ...ModuleId[]]);

export const CARD_TYPES = [
  "concept",
  "mcq",
  "what-prints",
  "bug-hunt",
  "comparison",
  "out-loud",
] as const;

/** `## Heading` sections each card type must have, keyed by slugified heading. */
export const REQUIRED_SECTIONS: Record<(typeof CARD_TYPES)[number], string[]> = {
  concept: ["prompt", "answer"],
  mcq: ["prompt"],
  "what-prints": ["prompt", "answer", "explanation"],
  "bug-hunt": ["prompt", "explanation"],
  comparison: [
    "what-it-is",
    "how-it-models-the-problem",
    "where-it-shines",
    "where-it-bites",
    "what-interviewers-ask",
  ],
  "out-loud": ["prompt", "model-answer"],
};

const choice = z.object({
  text: z.string().min(1),
  correct: z.boolean().default(false),
  why: z.string().min(1),
});

const choices = z
  .array(choice)
  .min(2)
  .refine((cs) => cs.filter((c) => c.correct).length === 1, {
    message: "exactly one choice must have correct: true",
  });

const base = {
  title: z.string().min(1),
  module: moduleId,
  /** Every card cites where its facts come from. Cards that can't cite don't ship.
   *  `notes:<file>` (your own notes) is allowed only for private cards. */
  source: z.union([z.url(), z.string().regex(/^notes:.+/, "must be a URL or notes:<file>")]),
  tags: z.array(z.string()).default([]),
  /** Technologies the card is about, as Simple Icons slugs ("docker", "postgresql"); shown as logos. */
  stack: z.array(z.string()).default([]),
};

export const frontMatterSchema = z.discriminatedUnion("type", [
  z.object({ ...base, type: z.literal("concept") }),
  z.object({ ...base, type: z.literal("mcq"), choices }),
  z.object({ ...base, type: z.literal("what-prints") }),
  z.object({ ...base, type: z.literal("bug-hunt"), choices }),
  z.object({ ...base, type: z.literal("comparison") }),
  z.object({ ...base, type: z.literal("out-loud") }),
]);

export type FrontMatter = z.infer<typeof frontMatterSchema>;
export type CardType = FrontMatter["type"];

export type RenderedChoice = { html: string; correct: boolean; whyHtml: string };

/** A technology's logo: an SVG path on a 24-unit grid, or no path for a lettered tile. */
export type StackLogo = { slug: string; title: string; hex: string; path?: string };

/** What the build script emits per card and the app reads. */
export type Card = {
  id: string; // file slug relative to content/cards, e.g. "frontend/stale-closure-interval"
  title: string;
  module: ModuleId;
  type: CardType;
  source: string;
  tags: string[];
  stack: StackLogo[];
  /** Section slug → rendered HTML, in file order. */
  sections: { key: string; heading: string; html: string }[];
  choices?: RenderedChoice[];
};

/* ---------- Labs: hands-on tasks checked against the output you paste back ---------- */

/** `## Heading` sections every lab must have. */
export const LAB_SECTIONS = ["goal", "steps", "evidence"];

const labCheck = z.object({
  /** What passing this check proves, shown next to its result. */
  label: z.string().min(1),
  /** A regular expression (case-insensitive, multiline) the pasted output must match. */
  pattern: z.string().min(1),
  /** Match exactly this many times, e.g. 1 for "processed once, not twice". */
  times: z.number().int().min(0).optional(),
});

export const labFrontMatterSchema = z.object({
  title: z.string().min(1),
  module: moduleId,
  minutes: z.number().int().min(5).max(180),
  source: z.url(),
  stack: z.array(z.string()).default([]),
  checks: z.array(labCheck).min(1),
});

export type LabCheck = z.infer<typeof labCheck>;

export type Lab = {
  id: string; // file slug relative to content/labs, e.g. "f1-trace-a-request"
  title: string;
  module: ModuleId;
  minutes: number;
  source: string;
  stack: StackLogo[];
  checks: LabCheck[];
  sections: { key: string; heading: string; html: string }[];
};
