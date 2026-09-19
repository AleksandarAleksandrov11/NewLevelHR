import type { Widen } from '../types';
/**
 * Namespace "faq" — English is the type reference for de/ and bg/.
 * Answers may contain "\n\n" to split into paragraphs. Group `id`s are
 * anchors and must stay untranslated.
 */
export const faq = {
  meta: {
    title: 'FAQ – Fractional HR, hiring and compliance questions answered',
    description:
      'Answers to the questions founders ask us first: what fractional HR is, how pricing and the free call work, how the 90-Day Success Bridge runs, what the EU Pay Transparency Directive means for SMEs, and what we do not do.',
  },
  hero: {
    eyebrow: 'FAQ',
    title: 'Questions founders ask us first.',
    text: 'Straight answers on fractional HR, hiring, compliance and how working with us actually feels. If yours is not here, the free 30-minute call is the fastest way to get it answered.',
  },
  search: {
    label: 'Search the questions',
    placeholder: 'Search, e.g. “pricing” or “90 days”',
    clear: 'Clear search',
    navLabel: 'Jump to a topic',
    results: '{count} of {total} questions',
    noResults: 'No question matches “{query}”. Try another word, or just ask us directly.',
  },
  groups: [
    {
      id: 'basics',
      title: 'Fractional HR basics',
      items: [
        {
          q: 'What exactly is fractional HR?',
          a: 'A senior HR partner who works with your company for a defined share of their time, on a retainer or per project, instead of a full-time employee on the payroll.\n\nYou get strategy and hands-on execution in one person: structure, policies, hiring, difficult conversations and the people decisions that come with growth. Without the fixed cost of an executive hire, and without a dashboard pretending to be a partner.',
        },
        {
          q: 'How is that different from hiring a full-time HR manager?',
          a: 'Three things change. Seniority: you get an experienced partner from day one, not the generalist you can currently afford. Speed: we start in days, not after months of hiring and notice periods. Commitment: the scope scales with your needs instead of being a fixed salary, benefits package and notice period.\n\nWhat stays the same is the closeness. We are in your Slack, we know your team by name, and we take the calls when something goes sideways.',
        },
        {
          q: 'Who is fractional HR for?',
          a: 'Founders, CEOs and leadership teams of startups and SMEs in Europe, most of them in tech, particularly in Bulgaria and the German-speaking countries.\n\nTypically the company has grown past the point where people topics can be handled on the side, but not yet to the point where a full HR function makes sense. If you recognise yourself in that gap, this is built for you.',
        },
        {
          q: 'How does pricing work?',
          a: 'Two models. A monthly retainer for an ongoing partnership, where we are on call and handle the recurring people work. Or a fixed project scope for clearly defined work, such as a policy review, a salary structure or a hiring campaign.\n\nWe do not publish a price list because the scope varies a lot between a five-person startup and a hundred-person company. The free 30-minute call is where we look at your situation together; you then receive a clear written proposal before anything starts.',
        },
        {
          q: 'How quickly can we start?',
          a: 'In days, not months. After the free call and a proposal you agree to, we set up the practical side (a Slack channel, access to the tools you use, a short discovery of your current setup) and get to work on the first priority.\n\nIf there is an urgent people issue on the table, that goes first. Structure can follow once the fire is out.',
        },
      ],
    },
    {
      id: 'working',
      title: 'Working together',
      items: [
        {
          q: 'What happens in the free 30-minute consultation?',
          a: 'You describe your situation, we ask a lot of questions. That is really it. No pitch deck, no pressure.\n\nYou leave with a clear picture of what would actually help your team next, whether that is working with us, a specialist we can point you to, or simply a few things you can fix yourself.',
        },
        {
          q: 'How do we communicate day to day?',
          a: 'However your team already works: a shared Slack channel, email and calls. Most questions are answered asynchronously; anything sensitive gets a call.\n\nWe are available Monday to Friday, 9 to 18 CET, and reply within 24 hours on business days. Urgent employee issues are prioritised over everything else.',
        },
        {
          q: 'Which languages do you work in?',
          a: 'English, German and Bulgarian. Documents, policies, interviews and coaching sessions can be run in any of the three, and your team does not have to switch languages to talk to us.',
        },
        {
          q: 'Where are you based, and do you work remotely?',
          a: 'NewLevelHR is based in Blagoevgrad, Bulgaria, and works with teams across Europe. Most of the collaboration happens remotely, which is how our clients work anyway.\n\nThat said, we know the Bulgarian and German-speaking markets from the inside: local practice, typical contract setups and what an authority actually asks for.',
        },
      ],
    },
    {
      id: 'hiring',
      title: 'Hiring & the 90-Day Success Bridge',
      items: [
        {
          q: 'How does High-Velocity Hiring work?',
          a: 'It starts before the job ad: a role scorecard that says what success looks like in the first months, and a salary range that is explainable. Then a structured process with a clear interview sequence, fast feedback to every candidate and decisions in days rather than weeks.\n\nBig-tech hiring discipline, sized for a company that does not have a recruiting department. And it does not end with the signature: every hire comes with the 90-Day Success Bridge.',
        },
        {
          q: 'What is the 90-Day Success Bridge?',
          a: 'After the contract is signed, we stay for the first three months and coach both the new hire and the manager. Day 1: expectations, first-month goals and a check-in rhythm are agreed before the laptop arrives. Day 30: a structured feedback loop that names early friction while it is still small. Day 60: course correction against the scorecard. Day 90: a probation review with a clear decision and a development plan.\n\nMost early exits are decided in the first weeks. The bridge is there so that they do not happen.',
        },
        {
          q: 'Can we get the bridge for someone we hired ourselves?',
          a: 'Yes. The bridge is built into every High-Velocity Hiring engagement, and it is also available on its own for a person you have already hired. Ideally it starts before day one, but joining in the first weeks still works.\n\nIt is also a good fit for internal promotions: a new team lead benefits from the same 30/60/90 structure.',
        },
        {
          q: 'What does “high-velocity” actually mean, and do you guarantee results?',
          a: 'It means each step is measured in days, not months: feedback to candidates, decisions, offers. The speed comes from preparation and structure, not from cutting corners.\n\nNo, we do not promise guaranteed outcomes; no honest hiring process can. What we do promise is a clear process, honest feedback, and a bridge that catches problems early instead of on the day someone resigns.',
        },
      ],
    },
    {
      id: 'compliance',
      title: 'Compliance & the EU Pay Transparency Directive',
      items: [
        {
          q: 'What does the EU Pay Transparency Directive mean for a startup or SME?',
          a: 'In general terms: candidates get the right to know the pay range before the interview and may no longer be asked about their pay history. Employees get the right to information about pay levels for comparable work. Reporting obligations on the gender pay gap are phased in depending on company size. And pay has to rest on objective, gender-neutral criteria that you can explain.\n\nThe practical consequence for most SMEs is that “guesswork pay” stops working: you need salary bands and a structure you can defend. Please note that this is HR advisory, not legal counsel; the exact rules and timelines depend on the national implementation in your country, which you confirm with your legal counsel.',
        },
        {
          q: 'How do you help us prepare for it?',
          a: 'We build the pieces you will need anyway: a simple job architecture, salary bands with clear criteria, job-ad and interview guidelines (including what not to ask), and a process for answering pay information requests from employees.\n\nEverything is designed to be explainable in a one-page document rather than a spreadsheet nobody understands. Where legal wording is required, we work alongside your lawyer.',
        },
        {
          q: 'Can you review our employment contracts and policies?',
          a: 'Yes, from an HR perspective. We check that contracts, policies, the handbook and personnel files are complete, consistent, up to date and actually used in practice, and we flag the gaps with a prioritised fix list.\n\nThe legal wording of the final documents is confirmed with your legal counsel; we prepare, structure and keep things current so that this takes them hours, not weeks.',
        },
        {
          q: 'What does “Labor Inspection readiness” mean?',
          a: 'That the paperwork an inspection typically asks for is complete and findable: signed contracts and amendments, working-time records, policies, acknowledgements, personnel files.\n\nWe run through a checklist with you, close the gaps and set up a calm routine for keeping it that way, so that a visit is an appointment, not an emergency. Again: HR advisory that works alongside your legal counsel, not legal representation.',
        },
      ],
    },
    {
      id: 'scope',
      title: 'What we do not do',
      items: [
        {
          q: 'What do you not do?',
          a: 'NewLevelHR provides expert HR advisory and recruitment services during standard business hours; we do not provide payroll processing, tax filing, legal counsel, or PEO/co-employment services.\n\nWhat we do instead: we make sure the inputs to those services are clean (contracts, salary structures, documented decisions) and we work alongside your accountant, payroll provider and lawyer so that they get what they need from you in one go.',
        },
        {
          q: 'Do you handle payroll or tax filing?',
          a: 'No. We do not run payroll and we do not file taxes. What we do is define what payroll needs from you: salary bands, bonus rules, contract terms and the changes that come with hires, promotions and exits, documented so that your payroll provider or accountant gets clean data every month.',
        },
        {
          q: 'Can you give us legal advice?',
          a: 'No. Our compliance support is HR advisory that works alongside your legal counsel. We prepare, structure and flag; your lawyer confirms the legal wording and represents you where representation is needed.\n\nIf you do not have a lawyer yet, we will tell you clearly at which point you need one.',
        },
        {
          q: 'Do you act as employer of record or a PEO?',
          a: 'No. Your people remain employed by your own company; we do not co-employ anyone and we do not act as an employer of record. What we help with is setting up clean employment on your side: roles, contracts, onboarding and the manager who runs the team.',
        },
      ],
    },
  ],
  still: {
    eyebrow: 'Still have questions?',
    title: 'Ask us directly. A human answers.',
    text: 'Send a message or book the free 30-minute call. Either way you get a real answer within 24 hours on business days, in English, German or Bulgarian.',
    button: 'Contact us',
    secondary: 'Book a free call',
  },
} as const;
export type FaqDict = Widen<typeof faq>;
