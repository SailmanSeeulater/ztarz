import cardsJson from "@/generated/cards.json";
import { MODULES, type Card, type ModuleId } from "./schema";

// Built by `pnpm content` from content/cards/**.md.
const cards = cardsJson as Card[];
const byId = new Map(cards.map((c) => [c.id, c]));

export const allCards = () => cards;
export const getCard = (id: string) => byId.get(id);

export function cardsByModule() {
  const groups = new Map<ModuleId, Card[]>();
  for (const id of Object.keys(MODULES) as ModuleId[]) groups.set(id, []);
  for (const c of cards) groups.get(c.module)!.push(c);
  return [...groups].filter(([, cs]) => cs.length > 0);
}

export { MODULES };
export type { Card, ModuleId };
