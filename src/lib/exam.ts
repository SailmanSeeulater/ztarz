import { MODULE_GROUPS, MODULES, type Card, type ModuleId } from "./content/schema";
import { seededShuffle } from "./shuffle";

/** Exams use the card types a machine can mark without your say-so. */
export const EXAM_TYPES: Card["type"][] = ["mcq", "bug-hunt"];
export const EXAM_SIZES = [10, 20, 30] as const;
export const SECONDS_PER_QUESTION = 60;
export const PASS_MARK = 0.7;

/** "all", "focus", "g:<group id>" or a module id. */
export type ExamScope = string;

export function resolveScope(scope: ExamScope, focus: readonly ModuleId[]): { label: string; modules: Set<ModuleId> | null } | null {
  if (scope === "all") return { label: "Everything", modules: null };
  if (scope === "focus") return focus.length ? { label: "Your focus", modules: new Set(focus) } : null;
  if (scope.startsWith("g:")) {
    const g = MODULE_GROUPS.find((x) => x.id === scope.slice(2));
    return g ? { label: g.title, modules: new Set<ModuleId>(g.modules) } : null;
  }
  if (scope in MODULES) {
    const name = MODULES[scope as ModuleId];
    return { label: name.includes(" · ") ? name.split(" · ")[1] : name, modules: new Set([scope as ModuleId]) };
  }
  return null;
}

export const examPool = (cards: readonly Card[], modules: Set<ModuleId> | null) =>
  cards.filter((c) => EXAM_TYPES.includes(c.type) && c.choices && (!modules || modules.has(c.module)));

/** A random paper, spread across modules rather than clumped in one. */
export function pickExam(cards: readonly Card[], modules: Set<ModuleId> | null, count: number, seed: number): Card[] {
  const byModule = new Map<ModuleId, Card[]>();
  for (const c of seededShuffle(examPool(cards, modules), seed)) byModule.set(c.module, [...(byModule.get(c.module) ?? []), c]);
  const lists = seededShuffle([...byModule.values()], seed + 1);
  const picked: Card[] = [];
  for (let i = 0; picked.length < count; i++) {
    const before = picked.length;
    for (const l of lists) if (i < l.length && picked.length < count) picked.push(l[i]);
    if (picked.length === before) break; // pool exhausted
  }
  return seededShuffle(picked, seed + 2);
}

export type ExamAnswer = { cardId: string; picked: number | null };

export type GradedExam = {
  total: number;
  correct: number;
  score: number; // 0..1
  passed: boolean;
  perModule: { module: ModuleId; total: number; correct: number }[];
  items: { card: Card; picked: number | null; correct: boolean }[];
};

/** Marks answers against the cards as they are now; answers for cards that no longer exist are dropped. */
export function gradeExam(getCard: (id: string) => Card | undefined, answers: readonly ExamAnswer[]): GradedExam {
  const items = answers.flatMap((a) => {
    const card = getCard(a.cardId);
    if (!card?.choices) return [];
    const picked = a.picked !== null && a.picked >= 0 && a.picked < card.choices.length ? a.picked : null;
    return [{ card, picked, correct: picked !== null && card.choices[picked].correct }];
  });
  const per = new Map<ModuleId, { total: number; correct: number }>();
  for (const it of items) {
    const p = per.get(it.card.module) ?? { total: 0, correct: 0 };
    p.total++;
    if (it.correct) p.correct++;
    per.set(it.card.module, p);
  }
  const correct = items.filter((i) => i.correct).length;
  const score = items.length ? correct / items.length : 0;
  return {
    total: items.length,
    correct,
    score,
    passed: score >= PASS_MARK,
    perModule: [...per].map(([module, p]) => ({ module, ...p })).sort((a, b) => a.correct / a.total - b.correct / b.total),
    items,
  };
}
