import type { Widen } from '../types';
/** Namespace "blog" — English is the type reference for de/ and bg/. */
export const blog = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type BlogDict = Widen<typeof blog>;
