import type { Widen } from '../types';
/** Namespace "howWeWork": the process page. English is the type reference for de/ and bg/. */
export const howWeWork = {
  meta: {
    title: 'How We Work: From a Free Call to a Partner in Your Slack',
    description: 'Five steps from a free 30-minute consultation to a running partnership: diagnosis, plan, execution and accompaniment. Retainer or project, Mon-Fri 9-18 CET, reply within 24 hours, in EN, DE and BG.',
  },
  hero: {
    eyebrow: 'How we work',
    title: 'Five steps. No pitch deck. A partner who stays.',
    text: 'Every engagement follows the same path: a free call, an honest diagnosis, a plan you understand, and a partner who stays.',
    imageAlt: 'A bright, calm office with plants and daylight',
  },
  steps: {
    eyebrow: 'The process',
    title: 'From the first call to a running rhythm.',
    text: 'The steps are the same for every service. Only the depth changes.',
    items: [
      { title: 'Free 30-minute consultation', duration: '30 minutes', body: 'You describe your situation, we ask a lot of questions. No pitch, no pressure. You leave with a clear picture of what would help first, whether or not we work together.', outcome: 'Outcome: a clear picture, in writing if you want it.' },
      { title: 'Diagnosis', duration: 'A few days', body: 'We look at the reality, not the org chart: contracts, policies, pay logic, the open roles, the managers, the conversations that are being avoided. Short interviews with the leadership team where useful.', outcome: 'Outcome: a prioritised list of gaps, ranked by risk and effort.' },
      { title: 'Plan', duration: 'One week', body: 'A written proposal with scope, rhythm and model (retainer or project), the first priorities and what is explicitly out of scope. You know what you are buying before anything starts.', outcome: 'Outcome: a plan and a price, agreed in writing.' },
      { title: 'Execution', duration: 'Weeks, not quarters', body: 'The urgent items first, then the structure: policies, pay bands, the hiring process, the coaching sessions. Every deliverable is explained to the people who will use it, in your working languages.', outcome: 'Outcome: working documents and systems, not slides.' },
      { title: 'Accompaniment', duration: 'Ongoing', body: 'A partner in your Slack channel, a fixed weekly rhythm and a monthly review of what the company needs next. For hires, the 90-Day Success Bridge. For managers, a coach in their corner.', outcome: 'Outcome: a team that runs the process with less and less help from us.' },
    ],
  },
  firstCall: {
    eyebrow: 'Step one',
    title: 'What happens in the free call',
    text: 'Thirty minutes, one video call, no preparation needed on your side.',
    points: [
      'You describe where the people side of your company hurts most right now.',
      'We ask questions: team size, roles, what has been tried, what is at stake.',
      'We tell you honestly what would help first, and whether it is something we do.',
      'If it makes sense, you receive a written proposal within a few days. If not, you still leave with a clearer picture.',
    ],
    button: 'Book the free call',
  },
  models: {
    eyebrow: 'Ways of working',
    title: 'Retainer or project. We recommend the one that fits, not the bigger one.',
    items: [
      {
        title: 'Retainer',
        body: 'An ongoing partnership with a fixed monthly scope, for the recurring people work and the surprises in between.',
        bullets: ['Fixed number of days per month, reviewed monthly', 'On-call for questions and urgent employee issues', 'A monthly review of what the company needs next'],
      },
      {
        title: 'Project',
        body: 'A clearly defined piece of work with a start and an end: a policy overhaul, a salary structure, a hiring campaign.',
        bullets: ['Defined scope, deliverables and timeline', 'Fixed price agreed before the start', 'Can grow into a retainer, but does not have to'],
      },
    ],
  },
  tools: {
    title: 'Where the work happens',
    items: [
      { title: 'Slack or email', body: 'A shared channel for the day-to-day. Most questions are answered asynchronously; anything sensitive gets a call.' },
      { title: 'Calls and sessions', body: 'Video calls for interviews, coaching and leadership sessions. On-site where it genuinely helps.' },
      { title: 'Your documents, your tools', body: 'Policies, scorecards and plans live where your team already works. No new platform to log in to.' },
    ],
  },
  expectations: {
    title: 'What you can expect from us',
    items: [
      'A reply within 24 hours on business days, Monday to Friday, 9-18 CET.',
      'Everything in English, German or Bulgarian, whichever your team speaks.',
      'Honest answers, including “this is not something you need” and “this needs a lawyer”.',
      'HR advisory and recruitment only: no payroll processing, tax filing, legal counsel or PEO services.',
    ],
  },
  faq: {
    title: 'Questions about working together',
    items: [
      { q: 'Do we need to prepare anything for the free call?', a: 'No. Come as you are. If you have a specific situation in mind, a few sentences about it help, but we will ask the questions we need.' },
      { q: 'How fast can we start after the call?', a: 'Usually within days. There is no notice period, recruiting process or equipment to wait for. If there is an urgent employee issue, that goes first.' },
      { q: 'Can we start small and grow?', a: 'Yes. Many partnerships start with one project or a small retainer and grow as trust builds. The scope is reviewed monthly and can change in either direction.' },
      { q: 'What if we already have someone doing HR?', a: 'Then we take the senior, strategic and sensitive topics and your internal person keeps the day-to-day administration, with a senior partner to lean on. This usually works very well.' },
    ],
  },
  cta: {
    title: 'Ready for step one?',
    text: 'Thirty minutes, no preparation, no pressure. Book the free call and let us find out what your team needs next.',
    button: 'Book a free call',
  },
} as const;
export type HowWeWorkDict = Widen<typeof howWeWork>;
