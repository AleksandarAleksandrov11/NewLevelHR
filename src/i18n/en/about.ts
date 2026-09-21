import type { Widen } from '../types';
/**
 * Namespace "about": the founder page. Mariyana Velkova speaks in the first
 * person. English is the type reference for de/ and bg/.
 */
export const about = {
  meta: {
    title: 'About Mariyana Velkova, Founder of NewLevelHR',
    description: 'Why NewLevelHR exists: a human HR partner for startups and SMEs in Europe, founded by Mariyana Velkova. Velocity over bureaucracy, humanity over automation, strategic precision.',
  },
  hero: {
    eyebrow: 'About',
    title: 'A human partner, not another HR tool.',
    text: 'I’m Mariyana Velkova, founder of NewLevelHR. I work with founders and leadership teams on the people side of growth: hiring, structure, managers and the hard conversations in between.',
    monogram: 'MV',
    portraitLabel: 'Founder',
  },
  story: {
    eyebrow: 'Why NewLevelHR exists',
    title: 'Built for startups and SMEs, not for corporations.',
    paragraphs: [
      'Most HR services are built for corporations with thousands of employees and endless budgets. But in a startup or SME, “people problems” feel different. They’re personal. They’re expensive. And they’re often the only thing standing between you and your next level of growth.',
      'I founded NewLevelHR because I saw too many leaders drowning in operational noise: babysitting teams, losing great talent to slow hiring, and guessing their way through management.',
      'I’m not a vendor you call once a year. I’m the partner in your Slack channel, the advisor in your ear during a tough hire, and the safety net for your first 90 days.',
      'I’m here to take the “people puzzles” off your plate, so you can get back to building what matters.',
    ],
    signature: 'Mariyana Velkova',
  },
  values: {
    eyebrow: 'What I stand for',
    title: 'Three things you can hold me to.',
    items: [
      { title: 'Velocity over Bureaucracy', body: 'Hiring should take days, not months.' },
      { title: 'Humanity over Automation', body: 'You don’t need another AI dashboard; you need a partner who understands your struggle.' },
      { title: 'Strategic Precision', body: 'The brain of a senior partner without the executive price tag.' },
    ],
  },
  howIWork: {
    eyebrow: 'How I work',
    title: 'Three ways you’ll notice the difference.',
    imageAlt: 'Founder thinking through a problem at a desk in a bright, calm office',
    items: [
      {
        title: 'The partner in your Slack channel',
        body: 'Day to day, I am one message away. You write, I answer within 24 hours on business days.',
      },
      {
        title: 'The advisor in your ear during a tough hire',
        body: 'When a role matters, I sit in the process with you: scorecard, interviews, references and the honest second opinion before you sign.',
      },
      {
        title: 'The safety net for your first 90 days',
        body: 'A hire is not a success on day one. I stay for the first three months, checking in with the new person and their manager.',
      },
    ],
  },
  cta: {
    title: 'Let’s find out what your team needs next.',
    text: 'A free 30-minute call, no pitch deck. You leave with a clear picture, whether or not we work together.',
    button: 'Book a free call with me',
  },
} as const;
export type AboutDict = Widen<typeof about>;
