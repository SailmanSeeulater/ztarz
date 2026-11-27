import { MODULES, type ModuleId } from "./content/schema";

export const DEFAULT_NEW_PER_DAY = 5;
export const MAX_NEW_PER_DAY = 20;

export type Prefs = { newPerDay: number; focus: ModuleId[] };
export const DEFAULT_PREFS: Prefs = { newPerDay: DEFAULT_NEW_PER_DAY, focus: [] };

/** Stored focus ids that still name a module (one may have been renamed or removed since). */
export const validFocus = (ids: readonly string[]) => ids.filter((id): id is ModuleId => id in MODULES);
