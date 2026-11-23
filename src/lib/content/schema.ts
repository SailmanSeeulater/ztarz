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
} as const;

export type ModuleId = keyof typeof MODULES;
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
  /** Every card cites where its facts come from. Cards that can't cite don't ship. */
  source: z.url(),
  tags: z.array(z.string()).default([]),
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

/** What the build script emits per card and the app reads. */
export type Card = {
  id: string; // file slug relative to content/cards, e.g. "frontend/stale-closure-interval"
  title: string;
  module: ModuleId;
  type: CardType;
  source: string;
  tags: string[];
  /** Section slug → rendered HTML, in file order. */
  sections: { key: string; heading: string; html: string }[];
  choices?: RenderedChoice[];
};
