import type { Widen } from '../types';
/**
 * Namespace "about" — the founder page. Mariyana Velkova speaks in the first
 * person. English is the type reference for de/ and bg/.
 */
export const about = {
  meta: {
    title: 'About – Mariyana Velkova, Founder of NewLevelHR',
    description: 'Why NewLevelHR exists: a human HR partner for startups and SMEs in Europe, founded by Mariyana Velkova. Velocity over bureaucracy, humanity over automation, strategic precision.',
  },
  hero: {
    eyebrow: 'About',
    title: 'A human partner, not another HR tool.',
    text: 'I’m Mariyana Velkova, founder and Managing Director of NewLevelHR. I work with founders and leadership teams of startups and SMEs across Europe on the people side of growth: hiring, structure, managers, and the hard conversations in between.',
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
  manifesto: {
    eyebrow: 'Human vs. automation',
    title: 'No dashboard. No bot. A person who knows your team by name.',
    text: 'HR software is good at storing data. It is not good at noticing that your best engineer has gone quiet, or that a manager is avoiding a conversation. That part needs a human.',
    notLabel: 'Not this',
    butLabel: 'But this',
    points: [
      { not: 'A ticket in a queue', but: 'A message in your Slack channel, answered by me' },
      { not: 'A generic template', but: 'A policy written for your team, in your language' },
      { not: 'A vendor you call once a year', but: 'A partner who knows your people by name' },
      { not: 'A report about the problem', but: 'The problem handled, with you in the loop' },
    ],
  },
  howIWork: {
    eyebrow: 'How I work',
    title: 'Three ways you’ll notice the difference.',
    imageAlt: 'Founder thinking through a problem at a desk in a bright, calm office',
    items: [
      {
        title: 'The partner in your Slack channel',
        body: 'Day to day, I am one message away. A contract question, a tricky 1:1 tomorrow, a resignation that just landed: you write, I answer within 24 hours on business days.',
      },
      {
        title: 'The advisor in your ear during a tough hire',
        body: 'When a role matters and the candidates are hard to read, I sit in the process with you: scorecard, interviews, references, the offer conversation, and the honest second opinion before you sign.',
      },
      {
        title: 'The safety net for your first 90 days',
        body: 'A hire is not a success on day one. I stay on board for the first three months, checking in with both the new person and their manager, so small frictions get fixed before they become an exit.',
      },
    ],
  },
  facts: {
    title: 'Practical details',
    items: [
      { label: 'Languages', value: 'English, German and Bulgarian' },
      { label: 'Based in', value: 'Blagoevgrad, Bulgaria, working with teams across Europe' },
      { label: 'Hours', value: 'Monday to Friday, 9–18 CET' },
      { label: 'Response time', value: 'Within 24 hours on business days' },
    ],
  },
  cta: {
    title: 'Let’s find out what your team needs next.',
    text: 'A free 30-minute call, no pitch deck. You describe your situation, I ask a lot of questions, and you leave with a clear picture, whether or not we work together.',
    button: 'Book a free call with me',
  },
} as const;
export type AboutDict = Widen<typeof about>;
