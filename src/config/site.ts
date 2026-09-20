/**
 * Central site configuration. Items the client still has to supply (booking link,
 * verified KPIs, testimonials, logos) are listed in /TODO-CLIENT.md.
 */
const env = import.meta.env;

export const site = {
  name: 'NewLevelHR',
  legalName: 'NewLevelHR',
  url: (env.SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://newlevelhr.com',
  email: 'info@newlevelhr.com',
  /** Booking link for the free call; see TODO-CLIENT.md. */
  bookingUrl: (env.PUBLIC_BOOKING_URL as string | undefined) || 'https://calendly.com/',
  formEndpoint: (env.PUBLIC_FORM_ENDPOINT as string | undefined) || '/api/contact',
  formToken: (env.PUBLIC_FORM_TOKEN as string | undefined) || '',
  analytics: {
    provider: (env.PUBLIC_ANALYTICS as string | undefined) || '',
    domain: (env.PUBLIC_ANALYTICS_DOMAIN as string | undefined) || '',
    src: (env.PUBLIC_ANALYTICS_SRC as string | undefined) || '',
  },
  founder: {
    name: 'Mariyana Velkova',
    role: 'Managing Director',
    portrait: 'mariyana-velkova' as string | null,
  },
  address: {
    street: 'Orfei 1',
    streetLocal: 'ул. „Орфей“ № 1',
    postalCode: '2700',
    city: 'Blagoevgrad',
    cityLocal: 'Благоевград',
    cityDe: 'Blagoewgrad',
    country: 'Bulgaria',
    countryCode: 'BG',
  },
  /** Business hours in CET, Monday to Friday. */
  hours: { days: [1, 2, 3, 4, 5], open: '09:00', close: '18:00', tz: 'CET' },
  responseTimeHours: 24,
  consultationMinutes: 30,
  bridgeDays: 90,
  languages: ['EN', 'DE', 'BG'] as const,
  /**
   * KPI counters. The previous site showed hiring-success, time-to-hire and
   * client-retention counters without verified data. They stay disabled until
   * the client provides real, verifiable numbers.
   */
  kpis: {
    enabled: false,
    items: [
      { id: 'hiringSuccess', value: 0, suffix: '%', decimals: 0 },
      { id: 'timeToHire', value: 0, suffix: '', decimals: 0 },
      { id: 'clientRetention', value: 0, suffix: '%', decimals: 0 },
    ],
  },
  /** Testimonials stay hidden until real client quotes are supplied. */
  testimonials: {
    enabled: false,
    items: [] as Array<{ quote: string; name: string; role: string; company: string }>,
  },
  /** Client logos stay hidden until supplied. */
  clientLogos: { enabled: false, items: [] as Array<{ name: string; src: string }> },
  social: [] as Array<{ name: string; url: string }>,
  /** Cookie / storage names actually used by this site (see Cookie Policy). */
  storage: {
    consentCookie: 'nlhr_consent',
    consentMaxAgeDays: 365,
    langBannerKey: 'nlhr_lang_banner',
    preloaderKey: 'nlhr_seen',
  },
  copyrightYear: 2026,
} as const;

export type Site = typeof site;
