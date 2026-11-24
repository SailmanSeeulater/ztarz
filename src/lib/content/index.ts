import cardsJson from "@/generated/cards.json";
import { MODULES, type Card, type ModuleId } from "./schema";

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

export { MODULES };
export type { Card, ModuleId };
