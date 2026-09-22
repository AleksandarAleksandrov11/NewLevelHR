import type { Widen } from '../types';
/**
 * Namespace "tools": the page that holds the HR Health Check and the
 * cost-of-a-bad-hire calculator. English is the type reference for de/ and bg/.
 */
export const tools = {
  meta: {
    title: 'HR Health Check & cost of a bad hire | NewLevelHR',
    description: 'Two free tools for founders: a five-question HR health check and a calculator for what one wrong hire costs you. No sign-up, nothing stored.',
  },
  hero: {
    eyebrow: 'Free tools',
    title: 'Two questions worth five minutes.',
    text: 'Where does your people setup stand today, and what would one wrong hire actually cost you? Both run in your browser. Nothing is sent to us and nothing is stored.',
  },
  intro: {
    health: 'Five questions on structure, hiring, compliance and your managers. You get a score and the first thing worth fixing.',
    cost: 'A rough estimate of what one mis-hire costs, based on salary, ramp-up time and the hours your team spends. It is a model, not a quote, and it has nothing to do with our prices.',
  },
  note: 'Neither tool sends anything to us. If you want the result looked at by a person, the free 30-minute call is the fastest way.',
} as const;

export type ToolsDict = Widen<typeof tools>;
