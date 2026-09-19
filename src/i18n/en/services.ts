import type { Widen } from '../types';
/** Namespace "services" — English is the type reference for de/ and bg/. */
export const services = {
  meta: { title: 'TODO', description: 'TODO' },
} as const;
export type ServicesDict = Widen<typeof services>;
