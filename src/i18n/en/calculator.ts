import type { Widen } from '../types';
/**
 * Cost of a bad hire. Every input is editable and the formula is shown on screen.
 * Default values are assumptions, not statistics.
 */
export const calculator = {
  eyebrow: 'Cost of a bad hire',
  title: 'What does a mis-hire really cost you?',
  text: 'Adjust the assumptions to your situation. Every line of the calculation is shown; nothing is a hidden statistic.',
  assumptionsTitle: 'Your assumptions',
  resultTitle: 'Estimated cost of one bad hire',
  perYear: 'per year of gross salary',
  currency: 'EUR',
  /** Short unit suffixes shown next to the number fields ("%" and the currency code need no translation). */
  units: { months: 'months', hours: 'h' },
  inputs: {
    salary: { label: 'Annual gross salary', help: 'Of the role you are hiring for.' },
    monthsEmployed: { label: 'Months until the person leaves', help: 'How long a mis-hire typically stays before the exit.' },
    recruitingPct: { label: 'Recruiting cost (% of salary)', help: 'Agency fee, job ads, internal time. Enter 0 if you hire without any cost.' },
    managerHours: { label: 'Manager hours per week on the hire', help: 'Onboarding, extra supervision, fixing mistakes.' },
    hourlyRate: { label: 'Manager hourly cost', help: 'Fully loaded hourly cost of the manager’s time.' },
    severanceMonths: { label: 'Severance and notice (months)', help: 'Paid months without productive work.' },
    vacancyMonths: { label: 'Months the seat stays empty afterwards', help: 'Time to re-hire and start over.' },
  },
  lines: {
    salary: 'Salary paid during the unsuccessful period',
    recruiting: 'Recruiting cost of the first hire',
    manager: 'Manager time spent',
    severance: 'Severance and notice period',
    rehire: 'Recruiting cost of the replacement',
    vacancy: 'Empty seat (salary equivalent)',
    total: 'Estimated total',
  },
  formula: 'Total = salary × months / 12 + recruiting + manager hours × weeks × rate + salary × severance / 12 + recruiting again + salary × vacancy / 12',
  note: 'This is a simplified model for orientation. It ignores lost revenue, team morale and customer impact, which usually make the real number higher.',
  cta: 'Avoid the next one: talk to us',
  reset: 'Reset to defaults',
  multipleLabel: 'That is roughly {multiple}× the annual salary.',
} as const;
export type CalculatorDict = Widen<typeof calculator>;
