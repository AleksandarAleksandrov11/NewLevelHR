import type { Widen } from '../types';
/**
 * HR Health Check: five questions, one per problem area, scored 0/1/2.
 * Runs entirely in the browser; nothing is stored or sent.
 */
export const quiz = {
  eyebrow: 'HR Health Check',
  title: 'How healthy is the people side of your company?',
  text: 'Five quick questions, about a minute, no email required. Your answers stay in your browser.',
  start: 'Start the check',
  next: 'Next',
  back: 'Back',
  seeResult: 'See my result',
  restart: 'Start again',
  progress: 'Question {current} of {total}',
  questions: [
    { id: 'overwhelm', q: 'How much of your week goes to employee issues and HR admin?', options: ['Almost none, it runs itself', 'A few hours, more than I’d like', 'Too much. It regularly pushes out product work'] },
    { id: 'managers', q: 'How prepared are your team leads for feedback and conflict conversations?', options: ['Well prepared, they handle it', 'Mixed. Some avoid the hard calls', 'Not at all. Most were promoted for technical skills'] },
    { id: 'pay', q: 'How are salaries and benefits decided?', options: ['Clear bands and rules everyone can explain', 'Rough ranges, decided case by case', 'Gut feeling and whatever the candidate asks for'] },
    { id: 'hiring', q: 'How often do new hires leave or underperform in their first 3 months?', options: ['Rarely, onboarding works', 'It happens once in a while', 'Often enough that hiring feels like a gamble'] },
    { id: 'audit', q: 'If the Labor Inspection knocked tomorrow, how would your contracts and policies hold up?', options: ['Fine, everything is current', 'Mostly fine, a few things are outdated', 'Honestly, I’d rather not find out'] },
  ],
  result: {
    title: 'Your result',
    scoreLabel: 'People-risk score',
    levels: [
      { max: 3, label: 'Solid foundations', text: 'The basics are in place. The best move now is keeping structure ahead of growth, so it stays that way.' },
      { max: 6, label: 'Some gaps to close', text: 'A few areas are costing you time or creating risk. They are fixable in weeks with the right structure and a partner who does the hands-on work.' },
      { max: 10, label: 'Urgent: people problems are blocking growth', text: 'Several areas need attention now. Start with the hardest one and take the rest off your plate before it costs you a key person or a fine.' },
    ],
    recommendedTitle: 'Recommended for you',
    recommendedIntro: 'Based on your answers, these services would have the biggest impact:',
    noIssues: 'No urgent gaps. If you still want a second pair of eyes, the free consultation is a good place to start.',
    book: 'Discuss my result in a free call',
    explore: 'Explore',
  },
} as const;
export type QuizDict = Widen<typeof quiz>;
