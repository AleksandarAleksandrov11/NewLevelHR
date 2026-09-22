/**
 * Central site configuration. Items the client still has to supply (booking link,
 * verified KPIs, testimonials, logos) are listed in /TODO-CLIENT.md.
 */
const env = import.meta.env;

/**
 * Canonical origin. SITE_URL wins; on a Vercel *preview* deployment the
 * deployment's own host is used instead, so canonicals and hreflang describe
 * the page an auditor is actually looking at. Production never falls back to
 * VERCEL_URL, which is a per-deployment host, not the custom domain.
 */
function siteUrl(): string {
  const explicit = (env.SITE_URL as string | undefined)?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  const vercelHost = (env.VERCEL_URL as string | undefined)?.trim();
  if (env.VERCEL_ENV === 'preview' && vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
  return 'https://newlevelhr.com';
}

export const site = {
  name: 'NewLevelHR',
  legalName: 'NewLevelHR',
  url: siteUrl(),
  email: 'info@newlevelhr.com',
  /**
   * Booking link for the free call; see TODO-CLIENT.md. Point PUBLIC_BOOKING_URL
   * at the Calendly event itself (https://calendly.com/<user>/<event>) and the
   * contact page shows the calendar inline instead of only linking out.
   */
  bookingUrl: (env.PUBLIC_BOOKING_URL as string | undefined) || 'https://calendly.com/',
  formEndpoint: (env.PUBLIC_FORM_ENDPOINT as string | undefined) || '/api/contact',
  /** True once the booking link points at a specific Calendly event, not just the domain. */
  get bookingEmbedUrl(): string | null {
    const url = this.bookingUrl;
    return /^https:\/\/(www\.)?calendly\.com\/[^/]+\/[^/]+/.test(url) ? url : null;
  },
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
  },
  copyrightYear: 2026,
} as const;

export type Site = typeof site;
