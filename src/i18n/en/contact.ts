import type { Widen } from '../types';
/** Namespace "contact" — English is the type reference for de/ and bg/. */
export const contact = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type ContactDict = Widen<typeof contact>;
