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
  fullstack: "Full stack",
  devops: "DevOps and servers",
  ai: "AI engineering",
  swe: "Software engineering",
  os: "Operating systems",
  net: "Networking",
  math: "Maths for programmers",
  embedded: "Embedded systems",
  data: "Data science",
  ml: "Machine learning",
  llm: "How LLMs work",
  python: "Python",
  go: "Go",
  rust: "Rust",
  java: "Java",
  node: "Node.js",
  express: "Express",
  react: "React",
  nextjs: "Next.js",
  springboot: "Spring Boot",
  leetcode: "LeetCode patterns",
  stack: "Stack nuance",
  interview: "Interview answers",
} as const;

export type ModuleId = keyof typeof MODULES;

export const FOUNDATIONS = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11"] as const;

/** How the library and map group modules. Every module appears in exactly one group. */
export const MODULE_GROUPS = [
  { id: "foundations", title: "Foundations", modules: FOUNDATIONS },
  { id: "roles", title: "Role tracks", modules: ["frontend", "backend", "fullstack", "devops", "ai", "swe"] },
  { id: "cs", title: "Computer science", modules: ["os", "net", "math", "embedded", "data", "ml", "llm"] },
  { id: "languages", title: "Languages", modules: ["python", "go", "rust", "java"] },
  { id: "frameworks", title: "Frameworks and runtimes", modules: ["node", "express", "react", "nextjs", "springboot"] },
  { id: "practice", title: "Interview practice", modules: ["leetcode", "stack", "interview"] },
] as const satisfies readonly { id: string; title: string; modules: readonly ModuleId[] }[];

/** Which foundations each role branch builds on (from the plan's curriculum map). */
export const BRANCH_PREREQS = {
  frontend: ["f1", "f4", "f7"],
  backend: ["f1", "f6", "f7"],
  fullstack: ["f4", "f6", "f7"],
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

/* ---------- Glossary: short definitions of the terms every engineer meets ---------- */

export const GLOSSARY_CATEGORIES = {
  web: "The web and HTTP",
  network: "Networking",
  os: "Operating systems and Linux",
  data: "Databases and data",
  code: "Languages and runtimes",
  tools: "Tools and workflow",
  arch: "APIs and architecture",
  security: "Security",
  cs: "Computer science",
  ai: "AI and machine learning",
} as const;
export type GlossaryCategory = keyof typeof GLOSSARY_CATEGORIES;

export const glossaryTermSchema = z.object({
  /** The term as people write it: "DNS", "Idempotent", "Node.js". */
  term: z.string().min(1).max(60),
  /** What an acronym stands for, or another name for it. */
  aka: z.string().max(120).optional(),
  /** One or two plain sentences (inline Markdown). */
  short: z.string().min(10).max(400),
  /** Optional longer explanation or example (Markdown). */
  detail: z.string().max(1200).optional(),
  /** Optional fun fact: history, naming, a surprising number. Must be backed by the source. */
  fun: z.string().max(400).optional(),
  source: z.url(),
  stack: z.array(z.string()).default([]),
  /** Related terms in this glossary, by `term`. */
  see: z.array(z.string()).default([]),
});
export const glossaryFileSchema = z.object({ terms: z.array(glossaryTermSchema).min(1) });

export type GlossaryTerm = {
  id: string; // slug of the term, unique across the glossary
  term: string;
  aka?: string;
  category: GlossaryCategory;
  shortHtml: string;
  detailHtml?: string;
  funHtml?: string;
  source: string;
  stack: StackLogo[];
  see: string[];
};

/* ---------- LeetCode solutions: worked walk-throughs, statement in our own words ---------- */

/** `## Heading` sections every solution must have. */
export const SOLUTION_SECTIONS = ["the-problem", "thinking-it-through", "solution", "complexity"];

export const solutionFrontMatterSchema = z.object({
  number: z.number().int().min(1),
  title: z.string().min(1),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  /** The problem page, https://leetcode.com/problems/<slug>/ */
  source: z.url(),
  patterns: z.array(z.string()).min(1),
  structures: z.array(z.string()).default([]),
  time: z.string().min(1),
  space: z.string().min(1),
  stack: z.array(z.string()).default([]),
});

export type Solution = {
  id: string; // file slug, e.g. "0001-two-sum"
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  source: string;
  patterns: string[];
  structures: string[];
  time: string;
  space: string;
  stack: StackLogo[];
  sections: { key: string; heading: string; html: string }[];
};
