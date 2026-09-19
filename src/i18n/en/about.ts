import type { Widen } from '../types';
/** Namespace "about" — English is the type reference for de/ and bg/. */
export const about = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type AboutDict = Widen<typeof about>;
