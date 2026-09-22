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
      text: 'Where the people side of your company stands today, in about a minute. Nothing is sent to us and nothing is stored.',
      start: 'Start the check',
    },
    areas: {
      title: 'What the check looks at',
      items: [
        { title: 'Your week', body: 'How many hours go to employee issues and HR admin instead of the business.' },
        { title: 'Your managers', body: 'Whether your leads can run feedback and conflict on their own, or quietly avoid it.' },
        { title: 'Pay', body: 'Whether salaries follow bands you can explain, or whatever the last negotiation produced.' },
        { title: 'Hiring', body: 'How often a new person leaves or underperforms inside the first three months.' },
        { title: 'Paperwork', body: 'How your contracts and policies would hold up if an inspection arrived tomorrow.' },
      ],
    },
    privacy: 'The check runs entirely in your browser. No email, no account, no answers leaving your device.',
    otherTool: {
      title: 'Wondering what a wrong hire costs?',
      text: 'The second tool puts a number on one mis-hire, line by line.',
      button: 'Open the cost calculator',
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
      text: 'Adjust the assumptions to your company and watch the number move. Every line of the calculation is visible, so you can argue with any of them.',
      start: 'Open the calculator',
    },
    privacy: 'The calculator runs entirely in your browser. Nothing is saved and nothing is sent to us.',
    included: {
      title: 'What goes into the number',
      items: [
        { title: 'Salary during the unsuccessful period', body: 'What you paid while the role was not being done.' },
        { title: 'Recruiting the first hire', body: 'Agency fee, job ads and the internal hours that went into the search.' },
        { title: 'Manager time', body: 'Onboarding, extra supervision and fixing what went wrong, at the manager’s real hourly cost.' },
        { title: 'Severance and notice', body: 'Paid months at the end, with little productive work in them.' },
        { title: 'Recruiting the replacement', body: 'The same search again, from the beginning.' },
        { title: 'The empty seat', body: 'The months the work is not done at all while you re-hire.' },
      ],
    },
    notPrice: {
      title: 'This is not a price list',
      text: 'The total is an estimate of what a mis-hire costs your company. It has nothing to do with what we charge: our work is quoted after the free call, once we know what you actually need.',
    },
    otherTool: {
      title: 'Not sure where the risk is?',
      text: 'The HR Health Check finds the area that is costing you most, in five questions.',
      button: 'Open the HR Health Check',
    },
  },
} as const;

export type ToolsDict = Widen<typeof tools>;
