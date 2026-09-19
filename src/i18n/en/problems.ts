import type { Widen } from '../types';
/**
 * Namespace "problems" — the "What We Fix" page. Titles, bodies, tags and the
 * service mapping of the eight problems come from `home.problems.items`; this
 * namespace extends each one (keyed by the same id) with symptoms, cost and fix.
 * English is the type reference for de/ and bg/.
 */
export const problems = {
  meta: {
    title: 'What We Fix – Eight People Problems in Growing Companies',
    description: 'Founder overwhelm, untrained managers, guesswork pay, bad hiring, audit anxiety, chaotic growth, risky terminations and unaligned leadership: what each one costs you and how NewLevelHR fixes it.',
  },
  hero: {
    eyebrow: 'What we fix',
    title: 'The people problems that stall growing companies.',
    text: 'Eight situations we see again and again in startups and SMEs. Below, each one in depth: what it looks like from the inside, what it quietly costs you, and how we fix it.',
    imageAlt: 'Two colleagues planning next steps on a whiteboard in a bright office',
  },
  navLabel: 'Jump to a problem',
  labels: {
    symptoms: 'Symptoms',
    cost: 'What it costs you',
    fix: 'How we fix it',
    alsoSee: 'Also part of the fix:',
    problem: 'Problem {n} of {total}',
    sideCtaTitle: 'Not sure which one is yours?',
    sideCtaText: 'A free 30-minute call is the fastest way to find out what would help first.',
  },
  items: {
    overwhelm: {
      symptoms: [
        'Your calendar is full of 1:1s about conflicts, not about the product.',
        'Contracts, policies and onboarding checklists live in your head or in scattered documents.',
        'Every HR question, from vacation days to a raise request, lands on your desk.',
        'People decisions get postponed because there is never time to think them through.',
      ],
      cost: 'Founder hours are the most expensive hours in the company. Every afternoon spent refereeing or chasing paperwork is an afternoon the product, the customers and the next funding round do not get. And decisions taken in a hurry tend to come back as bigger problems.',
      fix: {
        title: 'A senior partner who takes the people admin off your plate.',
        text: 'You get an on-call HR partner without a full-time salary. We set up the structures once, then run the day-to-day with you, in your Slack channel, in your language.',
        points: [
          'A people operations baseline: contracts, policies, onboarding and offboarding, set up once and kept current.',
          'One channel for every people question, answered within 24 hours on business days.',
          'The difficult conversations prepared with you, or held together, so they stop being postponed.',
        ],
      },
      serviceLabel: 'Your on-call partner for exactly this:',
    },
    managers: {
      symptoms: [
        'Your best engineer became a team lead and now spends the day avoiding people.',
        'Feedback is either not given at all or arrives months late in a performance review.',
        'Small tensions grow into resignations because nobody addressed them early.',
        'Leads escalate every decision to you instead of owning their team.',
      ],
      cost: 'People rarely quit a company. They quit a manager who was never taught how to lead. One untrained lead can cost you the strongest people on their team, and the lead themselves often burns out trying to figure it all out alone.',
      fix: {
        title: 'Practical coaching that turns experts into leaders.',
        text: 'We coach your leads on the situations they actually face this month: the feedback they are avoiding, the conflict in their team, the delegation they are not doing. Tools first, theory only where it helps.',
        points: [
          'One-to-one coaching built around real cases from their team, not generic leadership slides.',
          'Simple frameworks for feedback, 1:1s, delegation and difficult conversations they can use the next day.',
          'A coach in their corner for the first hard conversations, until they run them confidently alone.',
        ],
      },
      serviceLabel: 'The programme built for this:',
    },
    pay: {
      symptoms: [
        'Two people in the same role earn very different salaries, and nobody can explain why.',
        'Every offer is negotiated from scratch, and the most persistent candidate wins.',
        'Raises get decided when someone threatens to leave.',
        'You are not sure what the EU Pay Transparency Directive will require from you.',
      ],
      cost: 'Unexplainable pay erodes trust faster than low pay. The moment salaries are compared, and they always are, inconsistent offers turn into resentment, counter-offers and exits. With pay transparency rules arriving across the EU, guesswork also becomes a compliance exposure.',
      fix: {
        title: 'Simple salary bands and benefit rules everyone can explain.',
        text: 'We build a compensation structure that fits a company of your size: clear levels, salary ranges per role, benefit rules and a process for raises. Transparent enough for the directive, simple enough to actually use.',
        points: [
          'Role levels and salary bands based on your budget and your market, documented in one place.',
          'A raise and promotion process with fixed moments in the year, so pay stops being a reaction to threats.',
          'An honest review of where you stand against the EU Pay Transparency Directive, prepared with your legal counsel where needed.',
        ],
      },
      serviceLabel: 'Structured within:',
    },
    hiring: {
      symptoms: [
        'Roles stay open for months while the team covers the gap.',
        'Interviews are unstructured, and every interviewer looks for something different.',
        'New hires leave, or are let go, within the first three months.',
        'You hire for the CV and discover the mismatch in week two.',
      ],
      cost: 'A mis-hire is paid for three times: the months of searching, the months of ramp-up, and the months of doing it all again. Meanwhile the team that covered the gap is tired, and the manager has lost trust in the process.',
      fix: {
        title: 'Structured, fast hiring, then a bridge across the first 90 days.',
        text: 'We run hiring the way the best tech companies do: a clear role scorecard, a tight process, structured interviews and a decision within days, not weeks. Then we stay on board for the first three months so the hire does not just start, they succeed.',
        points: [
          'A role scorecard and interview plan agreed before the first CV is opened.',
          'A fast, respectful candidate process that keeps strong people from dropping out.',
          'Check-ins at day 30, 60 and 90 with both the new hire and the manager, and a clear probation decision.',
        ],
      },
      serviceLabel: 'Our hiring engine, with the bridge built in:',
    },
    audit: {
      symptoms: [
        'Employment contracts were copied from a template years ago and never updated.',
        'Policies exist as verbal agreements, if at all.',
        'Personnel files are incomplete, and you would not know where to look.',
        'The words “labour inspection” make your stomach drop.',
      ],
      cost: 'Audit anxiety costs you twice. First in fines and back-payments when an inspection finds a gap. Then in the quieter cost: management attention spent worrying instead of building, and employees who notice that the basics are not in order.',
      fix: {
        title: 'A compliance baseline you can stop worrying about.',
        text: 'We review your contracts, policies and files, close the gaps and set up a simple rhythm to keep everything current. Where legal advice is required, we work alongside your lawyer; we do not replace them.',
        points: [
          'A structured review of contracts, policies, files and mandatory documents against current requirements.',
          'A prioritised gap list with fixes, so the urgent items are handled first.',
          'A yearly check and a place for everything, so the next inspection is a routine, not a crisis.',
        ],
      },
      serviceLabel: 'Covered within:',
    },
    growth: {
      symptoms: [
        'Headcount doubled, but the org chart is still in someone’s head.',
        'New people do not know who decides what, so everything goes to the founders.',
        'Hiring happens in the order requests arrive, not in the order the business needs.',
        'Rituals that worked at ten people quietly break at thirty.',
      ],
      cost: 'Growth without structure multiplies mistakes. Each new person copies the confusion of the last one, decisions slow down as more people wait on the founders, and the culture you were proud of becomes something nobody can describe anymore.',
      fix: {
        title: 'A people roadmap for the next twelve months.',
        text: 'We turn your business plan into a people plan: which roles, in which order, reporting to whom, and which rituals keep a bigger team aligned. Structure that supports speed instead of slowing it down.',
        points: [
          'An org design for the next stage: roles, levels, reporting lines and decision rights.',
          'A hiring sequence tied to your goals and budget, so you hire what the business needs next.',
          'Team rituals that scale: planning, 1:1s, feedback cycles and all-hands that actually inform.',
        ],
      },
      serviceLabel: 'Planned and run within:',
    },
    terminations: {
      symptoms: [
        'Everyone knows a certain person is not working out, including that person.',
        'Performance issues were mentioned in passing but never documented.',
        'You are afraid one wrong step will end in a lawsuit.',
        'The rest of the team is losing patience while you wait.',
      ],
      cost: 'Every week of waiting costs salary, team morale and your credibility as a leader. The strongest people notice first when underperformance has no consequences. And an exit done in a hurry, without documentation, is exactly the one that ends in a dispute.',
      fix: {
        title: 'A fair, documented process and a calm exit plan.',
        text: 'We set up a clear performance process: expectations in writing, honest conversations, a defined improvement period and documented outcomes. If an exit is the right decision, we prepare it with your legal counsel and help you handle it with dignity.',
        points: [
          'A performance improvement process with clear expectations, timelines and documentation.',
          'Preparation and coaching for the conversations, so they are direct, fair and not personal.',
          'An exit plan prepared with your lawyer: timing, communication to the team and a respectful handover.',
        ],
      },
      serviceLabel: 'Handled within:',
    },
    leadership: {
      symptoms: [
        'Two founders give the team two different priorities in the same week.',
        'Leadership meetings end without decisions, or with decisions that get reopened.',
        'The team hears about strategy changes through the grapevine.',
        'Nobody is sure who has the final say on people matters.',
      ],
      cost: 'Misalignment at the top is invisible in the boardroom and very visible in the team. People stop taking initiative when the message keeps changing, your best managers start managing upward instead of leading, and hiring, pay and promotions become political.',
      fix: {
        title: 'One message from the top, and clear rules for how decisions are made.',
        text: 'We facilitate leadership alignment sessions where founders and executives agree on priorities, roles and decision rules, and put them in writing. Then we help you carry that clarity into the team.',
        points: [
          'Facilitated alignment sessions on goals, roles and what “done” means for the leadership team.',
          'Simple decision rules for the recurring people topics: who decides, who is consulted, who is informed.',
          'A communication rhythm so the team hears decisions once, clearly, from the top.',
        ],
      },
      serviceLabel: 'Facilitated within:',
    },
  },
  closing: {
    eyebrow: 'Recognise more than one?',
    title: 'That is normal. And it is fixable.',
    text: 'These problems rarely come alone. In a free 30-minute call we look at which of them is costing you the most right now, and what would help first, whether or not you work with us.',
    button: 'See all four services',
  },
} as const;
export type ProblemsDict = Widen<typeof problems>;
