import type { Widen } from '../types';
/** Namespace "legal" — English is the type reference for de/ and bg/. */
export const legal = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type LegalDict = Widen<typeof legal>;
