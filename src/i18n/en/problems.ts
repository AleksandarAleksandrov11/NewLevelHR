import type { Widen } from '../types';
/** Namespace "problems" — English is the type reference for de/ and bg/. */
export const problems = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type ProblemsDict = Widen<typeof problems>;
