import type { Widen } from '../types';
/** Namespace "contact": the contact page. Form labels and messages live in common.form. */
export const contact = {
  meta: {
    title: 'Contact: Book a Free 30-Minute HR Consultation',
    description: 'Talk to NewLevelHR: send a message or book a free 30-minute consultation. Fractional HR, hiring, the 90-day bridge and manager coaching, in English, German and Bulgarian. Reply within 24 hours.',
  },
  hero: {
    eyebrow: 'Let’s talk',
    title: 'Your next level starts here.',
    text: 'Even if you’re unsure if your needs fit our services, or if you just want support handling messy HR admin and advice on the EU Pay Transparency Directive, let’s talk. We’re here to help you figure it out.',
  },
  form: {
    title: 'Send us a message',
    text: 'Tell us a little about your situation. We reply within 24 hours on business days.',
  },
  book: {
    eyebrow: 'Or book a call directly',
    title: 'Schedule a free 30-minute consultation at a time that works for you.',
    text: 'No pitch deck, no pressure. You describe your situation, we ask questions, and you leave with a clear picture of what would help first.',
    button: 'Book an appointment',
  },
  info: {
    title: 'Contact details',
    email: 'Email',
    response: 'Response time',
    responseValue: 'Within 24 hours on business days',
    hours: 'Hours',
    hoursValue: 'Monday to Friday, 9-18 CET',
    languages: 'Languages',
    languagesValue: 'English, German, Bulgarian',
    address: 'Address',
  },
} as const;
export type ContactDict = Widen<typeof contact>;
