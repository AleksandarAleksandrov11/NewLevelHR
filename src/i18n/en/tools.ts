import type { Widen } from '../types';
/**
 * Namespace "tools": the two free tools, each on its own page.
 * English is the type reference for de/ and bg/.
 */
export const tools = {
  health: {
    meta: {
      title: 'Free HR Health Check for startups and SMEs | NewLevelHR',
      description: 'Five questions on your week, your managers, pay, hiring and paperwork. You get a people-risk score and the first thing worth fixing. No sign-up, nothing stored.',
    },
    hero: {
      eyebrow: 'Free tool',
      title: 'Five questions. One honest picture.',
      /** Long form, used by the tools teaser on the home page. */
      text: 'Where the people side of your company stands today, in about a minute. Nothing is sent to us and nothing is stored.',
      facts: ['5 questions', 'About a minute', 'No sign-up'],
      start: 'Start the check',
    },
    areas: {
      title: 'What the check looks at',
      items: ['Your week', 'Your managers', 'How pay is set', 'Hiring and onboarding', 'Contracts and policies'],
    },
  },
  cost: {
    meta: {
      title: 'Cost of a bad hire: free calculator | NewLevelHR',
      description: 'Put a number on one wrong hire: salary during the unsuccessful period, recruiting, manager time, severance and the empty seat afterwards. Every line is shown.',
    },
    hero: {
      eyebrow: 'Free tool',
      title: 'What one wrong hire actually costs.',
      /** Long form, used by the tools teaser on the home page. */
      text: 'Adjust the assumptions to your company and watch the number move. Every line of the calculation is visible, so you can argue with any of them.',
      facts: ['6 cost lines', 'Live total', 'No sign-up'],
      start: 'Open the calculator',
    },
    included: {
      title: 'What goes into the number',
      items: ['Salary during the unsuccessful period', 'Recruiting the first hire', 'Manager time', 'Severance and notice', 'Recruiting the replacement', 'The empty seat'],
    },
  },
} as const;

export type ToolsDict = Widen<typeof tools>;
