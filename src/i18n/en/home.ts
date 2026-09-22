import type { Widen } from '../types';
/** Home page. English is the type reference for de/ and bg/. */
export const home = {
  meta: {
    title: 'NewLevelHR: The HR Partner Your Business Actually Needs',
    description: 'Real HR support without the full-time hire. Fractional HR, high-velocity hiring, a 90-day success bridge and manager coaching for startups and SMEs in Europe.',
  },
  hero: {
    /** Rendered as words; the accent phrase is wrapped in <span class="accent"> by the component */
    titleLine1: 'Real HR support.',
    titleLine2: 'Without the',
    titleAccent: 'full-time hire.',
    sub: 'Hiring, compliance and the hard conversations, handled by a partner who knows your team by name.',
    cta1: 'Get a free consultation',
    cta2: 'Our services',
    scroll: 'Scroll',
  },
  tools: {
    title: 'Two free tools, no sign-up.',
    text: 'One tells you where the people side of your company stands. The other puts a number on a hire that does not work out. Both run in your browser.',
  },
  marquee: ['Fractional HR', 'High-Velocity Hiring', 'Manager Coaching', '90-Day Bridge', 'Compliance', 'Leadership', 'Team Building'],
  manifesto: {
    eyebrow: 'Why we exist',
    text: 'In a world full of automated HR tools and AI bots, we offer something different: a human partner who knows your team by name. Not a dashboard. Solutions.',
  },
  problems: {
    eyebrow: 'What we fix',
    title: 'The problems that keep you up at night.',
    flip: 'How we fix it',
    back: 'Back',
    all: 'See all eight in depth',
    items: [
      { id: 'overwhelm', title: 'Founder Overwhelm', body: 'Employee drama and paperwork eating up your growth time. Every hour spent settling disputes or chasing forms is an hour not spent on your product.', fix: 'A fractional HR partner takes the people admin, policies and difficult conversations off your plate, so your week goes back to building.', service: 'serviceFractional' },
      { id: 'managers', title: 'Untrained Managers', body: 'Top tech experts promoted to leads with zero management skills. They freeze during feedback conversations and avoid the hard calls entirely.', fix: 'Manager coaching gives your leads practical tools for feedback, conflict and delegation, with a coach in their corner for the first hard conversations.', service: 'serviceCoaching' },
      { id: 'pay', title: 'Guesswork Pay', body: 'Random salary and benefit offers without clear structures. Inconsistent offers erode trust and turn every negotiation into a coin flip.', fix: 'We build simple salary bands and benefit rules, aligned with the EU Pay Transparency Directive, so every offer is explainable and fair.', service: 'serviceFractional' },
      { id: 'hiring', title: 'Bad Hiring', body: 'Hiring by gut feeling, leading to people quitting within 3 months. Every mis-hire costs months of ramp-up and a painful restart.', fix: 'Structured, fast hiring with clear expectations, followed by a 90-day bridge that coaches both the new hire and the manager.', service: 'serviceHiring' },
      { id: 'audit', title: 'Audit Anxiety', body: 'Outdated legal paperwork and fear of a surprise Labor Inspection. One overlooked contract clause can turn into a costly fine overnight.', fix: 'We review your contracts, policies and files, close the gaps and keep them current, working with your legal counsel where needed.', service: 'serviceFractional' },
      { id: 'growth', title: 'Chaotic Growth', body: 'Adding headcount fast without a clear structural plan or roadmap. Growth without structure means more people making the same mistakes.', fix: 'A people roadmap for the next 12 months: roles, reporting lines, hiring sequence and the rituals that keep a bigger team aligned.', service: 'serviceFractional' },
      { id: 'terminations', title: 'Risky Terminations', body: 'Stuck with bad employees because you’re afraid of lawsuits. Every day you wait, the cost and the risk keep climbing.', fix: 'A clear, documented performance process and a calm exit plan, prepared with your legal counsel, so you can act instead of waiting.', service: 'serviceFractional' },
      { id: 'leadership', title: 'Unaligned Leadership', body: 'Founders and executives not working toward the same goals. Mixed signals from the top trickle down into a confused, misaligned team.', fix: 'Leadership alignment sessions and clear decision rules, so the team hears one message from the top.', service: 'serviceFractional' },
    ],
  },
  services: {
    eyebrow: 'Our services',
    title: 'We don’t give you a dashboard. We give you solutions.',
    all: 'All services',
    items: [
      { key: 'serviceFractional', body: 'On-demand support to fix your team structure, handle policy, and align your people with your business goals.', image: 'one-on-one' },
      { key: 'serviceHiring', body: 'Big Tech hiring speed combined with a 3-month success bridge so your new hire doesn’t just start, they succeed.', image: 'interview' },
      { key: 'serviceBridge', body: 'We stay for the first 3 months, coaching the new hire and the manager to ensure a perfect fit.', image: 'onboarding-welcome' },
      { key: 'serviceCoaching', body: 'Coaching managers and giving them tools to handle conflict, give feedback, and lead high-performing teams independently.', image: 'coaching-mentoring' },
    ],
  },
  bridge: {
    eyebrow: 'The 90-Day Success Bridge',
    title: 'A hire is not a success on day one. It is a success on day ninety.',
    text: 'Most early exits are decided in the first weeks. We stay on board and coach both sides until the fit is real.',
    cta: 'How the bridge works',
    milestones: [
      { day: 'Day 1', title: 'Clear expectations', body: 'Role scorecard, first-month goals and a check-in rhythm agreed with the new hire and the manager before the laptop arrives.' },
      { day: 'Day 30', title: 'First feedback loop', body: 'Structured 1:1 with the hire and the manager. Early friction gets named and fixed while it is still small.' },
      { day: 'Day 60', title: 'Course correction', body: 'Performance against the scorecard, coaching on the gaps, and adjustments to scope or support where needed.' },
      { day: 'Day 90', title: 'Confirmed fit', body: 'Probation review with a clear decision, a development plan and a manager who now runs the process alone.' },
    ],
  },
  comparison: {
    eyebrow: 'Fractional vs. full-time',
    title: 'Senior HR brain. Without the executive price tag.',
    colFractional: 'Fractional HR partner',
    colFullTime: 'Full-time HR hire',
    note: 'The comparison describes typical setups for companies with 10 to 150 employees. Your situation may differ; the free call is where we find out.',
    cta: 'Talk about your setup',
    rows: [
      { label: 'Seniority', fractional: 'Senior partner from day one', fullTime: 'Usually a generalist you can afford' },
      { label: 'Time to start', fractional: 'Days', fullTime: '2-4 months of hiring and notice periods' },
      { label: 'Commitment', fractional: 'Flexible, scales with your needs', fullTime: 'Fixed salary, benefits, equipment, notice period' },
      { label: 'Coverage', fractional: 'Strategy and hands-on execution', fullTime: 'Depends on one person’s profile' },
      { label: 'Hiring', fractional: 'Big-tech process plus a 90-day bridge', fullTime: 'Often outsourced to agencies' },
      { label: 'Availability', fractional: 'On-call in your Slack, Mon-Fri 9-18 CET', fullTime: 'Full-time presence' },
    ],
  },
  testimonials: {
    eyebrow: 'What clients say',
    title: 'Real words from real teams.',
  },
  faqTeaser: {
    eyebrow: 'Questions',
    title: 'Things founders ask us first.',
    cta: 'All questions',
    items: [
      { q: 'What exactly is fractional HR?', a: 'A senior HR partner who works with you for a defined share of their time, on a retainer or per project, instead of a full-time employee. You get strategy and execution without the fixed cost.' },
      { q: 'What do you not do?', a: 'We do not provide payroll processing, tax filing, legal counsel or PEO/co-employment services. Where legal advice is needed, we work alongside your lawyer.' },
      { q: 'How does the 90-Day Success Bridge work?', a: 'After the contract is signed we stay for the first three months, coaching the new hire and the manager with a scorecard, check-ins at day 30, 60 and 90, and a clear probation decision.' },
      { q: 'Which languages do you work in?', a: 'English, German and Bulgarian. Documents, interviews and coaching sessions can be run in any of the three.' },
      { q: 'What happens in the free consultation?', a: 'A 30-minute call. You describe your situation, we ask a lot of questions, and you leave with a clear picture of what would help, whether or not you work with us.' },
    ],
  },
} as const;
export type HomeDict = Widen<typeof home>;
