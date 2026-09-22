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
    text: 'Not sure your needs fit our services? Tell us anyway. We will point you to what would help first.',
  },
  form: {
    title: 'Send us a message',
    text: 'Tell us a little about your situation. We reply within 24 hours on business days.',
  },
  book: {
    eyebrow: 'Or book a call directly',
    title: 'Schedule a free 30-minute consultation at a time that works for you.',
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
