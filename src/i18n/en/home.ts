import type { Widen } from '../types';
/** Namespace "home" — English is the type reference for de/ and bg/. */
export const home = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type HomeDict = Widen<typeof home>;
