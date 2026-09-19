import type { Widen } from '../types';
/** Namespace "faq" — English is the type reference for de/ and bg/. */
export const faq = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type FaqDict = Widen<typeof faq>;
