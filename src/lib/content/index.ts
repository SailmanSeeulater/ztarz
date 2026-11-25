import cardsJson from "@/generated/cards.json";
import glossaryJson from "@/generated/glossary.json";
import labsJson from "@/generated/labs.json";
import solutionsJson from "@/generated/solutions.json";
import { MODULES, type Card, type GlossaryTerm, type Lab, type ModuleId, type Solution } from "./schema";

// Built by `pnpm content` from content/cards/**.md and (gitignored) content/private/**.md.
const cards = cardsJson as Card[];
const byId = new Map(cards.map((c) => [c.id, c]));

export const isPrivate = (id: string) => id.startsWith("private/");
const publicOnly = cards.filter((c) => !isPrivate(c.id));

/** Cards anyone may see: use these on pages that don't require sign-in. */
export const publicCards = () => publicOnly;
export const getPublicCard = (id: string) => (isPrivate(id) ? undefined : byId.get(id));

/** Every card, including private ones. Only for code that has already checked the session. */
export const allCards = () => cards;
export const getCard = (id: string) => byId.get(id);

/** Public cards grouped by module, in curriculum order. */
export function cardsByModule() {
  const groups = new Map<ModuleId, Card[]>();
  for (const id of Object.keys(MODULES) as ModuleId[]) groups.set(id, []);
  for (const c of publicOnly) groups.get(c.module)!.push(c);
  return [...groups].filter(([, cs]) => cs.length > 0);
}

/** A public card's place in its module, for moving between cards without going back to the library. */
export function moduleNeighbours(id: string) {
  const card = getPublicCard(id);
  if (!card) return undefined;
  const siblings = publicOnly.filter((c) => c.module === card.module);
  const index = siblings.findIndex((c) => c.id === id);
  return {
    siblings,
    index,
    prev: siblings[index - 1] as Card | undefined,
    next: siblings[index + 1] as Card | undefined,
  };
}

// Labs are all public: content/labs/*.md.
const labs = labsJson as Lab[];
const labById = new Map(labs.map((l) => [l.id, l]));
export const allLabs = () => labs;
export const getLab = (id: string) => labById.get(id);

// Glossary terms (A–Z) and LeetCode walk-throughs (by problem number), all public.
const glossary = glossaryJson as GlossaryTerm[];
export const allGlossary = () => glossary;

const solutions = (solutionsJson as Solution[]).toSorted((a, b) => a.number - b.number);
const solutionById = new Map(solutions.map((s) => [s.id, s]));
export const allSolutions = () => solutions;
export const getSolution = (id: string) => solutionById.get(id);

export { MODULES };
export type { Card, GlossaryTerm, Lab, ModuleId, Solution };
