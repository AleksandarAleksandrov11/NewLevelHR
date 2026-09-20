import type { Widen } from '../types';
/**
 * Namespace "legal": Legal Notice (Impressum), Terms (AGB), Privacy Policy and Cookie Policy.
 *
 * The Impressum, the AGB and the original Privacy Policy sections are reproduced
 * VERBATIM from the previous site (docs/reference/live-content/legal-*.html),
 * including every "TO BE ADDED" placeholder. The additional privacy sections and
 * the Cookie Policy are new. Legal wording must not be reworded without review.
 *
 * Content model (rendered by src/components/pages/LegalLayout.astro):
 *   { type: 'p', text }                       plain paragraph
 *   { type: 'html', html }                    paragraph with inline HTML (links, <strong>, <br>,
 *                                             <span class="todo-client">…</span> for client placeholders)
 *   { type: 'ul', items }                     plain list
 *   { type: 'address', lines }                postal address, first line bold
 *   { type: 'dl', terms: [{ term, text }] }   definition list
 *   { type: 'table', caption, headers, rows } data table (scrolls inside its wrapper on mobile)
 *   { type: 'consentButton' }                 <button data-consent-open> labelled common.footer.cookieSettings
 *
 * Placeholders replaced by the layout: {email}, {legalNoticeUrl}, {termsUrl}, {privacyUrl},
 * {cookiesUrl}, {consentCookie}, {langBannerKey}, {preloaderKey}, {cookieSettings}.
 *
 * English is the type reference for de/ and bg/: object shape and array lengths must match.
 */
export const legal = {
  /** ISO date shown as "Last updated" on all four pages. */
  updated: '2026-09-19',
  common: {
    eyebrow: 'Legal',
    lastUpdated: 'Last updated: {date}',
    onThisPage: 'On this page',
    otherPages: 'Other legal pages',
    contactTitle: 'Questions about this page?',
    contactLine: 'Write to us at {email}. On business days we reply within 24 hours.',
    todoNote: 'Highlighted entries are still to be completed or confirmed by NewLevelHR before publication.',
  },

  /* ------------------------------------------------------------------ */
  /* Legal Notice (Impressum) — verbatim                                 */
  /* ------------------------------------------------------------------ */
  legalNotice: {
    meta: {
      title: 'Legal Notice (Impressum)',
      description: 'Legal notice of NewLevelHR: provider identification, contact details and company registration data of NewLevelHR, Blagoevgrad, Bulgaria.',
    },
    title: 'Impressum (Legal Notice)',
    lead: '',
    blurb: 'Provider identification, contact details and registration data.',
    intro: [
      { type: 'p', text: 'Information according to § 5 TMG / Bulgarian Commerce Act:' },
      { type: 'address', lines: ['NewLevelHR', 'Orfei 1', '2700 Blagoevgrad', 'Bulgaria'] },
    ],
    sections: [
      {
        id: 'represented-by',
        title: 'Represented by',
        blocks: [{ type: 'p', text: 'Mariyana Velkova — Managing Director' }],
      },
      {
        id: 'contact',
        title: 'Contact',
        blocks: [
          { type: 'html', html: 'Email: <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a><br>Website: <a href="https://newlevelhr.com">newlevelhr.com</a>' },
        ],
      },
      {
        id: 'registration',
        title: 'Company Registration',
        blocks: [
          { type: 'p', text: 'Commercial Register / Registry Agency of Bulgaria' },
          { type: 'html', html: 'Unified Identification Code (UIC / EIK): <span class="todo-client">TO BE ADDED</span>' },
          { type: 'html', html: 'VAT Identification Number (if applicable): <span class="todo-client">TO BE ADDED</span>' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* General Terms and Conditions (AGB) — verbatim                       */
  /* ------------------------------------------------------------------ */
  terms: {
    meta: {
      title: 'General Terms and Conditions (AGB)',
      description: 'General Terms and Conditions of NewLevelHR for HR consulting, recruitment and talent acquisition services: scope, conclusion of contract, fees, liability and governing law.',
    },
    title: 'General Terms and Conditions (AGB)',
    lead: '',
    blurb: 'Scope, conclusion of contract, fees, liability and governing law.',
    intro: [],
    sections: [
      {
        id: 'scope',
        title: '§ 1 Scope of Application',
        blocks: [
          { type: 'p', text: 'These General Terms and Conditions (AGB) apply to all business relations, services, and contracts provided by NewLevelHR (hereinafter "Provider") to its clients (hereinafter "Client") via the website and associated services.' },
        ],
      },
      {
        id: 'services',
        title: '§ 2 Services Provided',
        blocks: [
          { type: 'p', text: 'NewLevelHR provides human resources consulting, recruitment, and talent acquisition services. The specific scope of services is determined by individual written agreements or project contracts.' },
        ],
      },
      {
        id: 'conclusion',
        title: '§ 3 Conclusion of Contract',
        blocks: [
          { type: 'p', text: 'A contract is established when the Client accepts a written offer from NewLevelHR, or when both parties sign a separate service agreement. Initial inquiries via the website do not constitute a binding contract.' },
        ],
      },
      {
        id: 'fees',
        title: '§ 4 Fees and Terms of Payment',
        blocks: [
          { type: 'p', text: 'All prices and fees are subject to statutory VAT (where applicable) unless stated otherwise.' },
          { type: 'html', html: 'Invoices are payable within <span class="todo-client">TO BE ADDED — e.g. 14 days</span> from the invoice date without deductions, unless otherwise agreed in writing.' },
        ],
      },
      {
        id: 'liability',
        title: '§ 5 Liability',
        blocks: [
          { type: 'p', text: 'NewLevelHR acts as a service provider and does not guarantee specific employment outcomes, candidate retention, or financial success.' },
          { type: 'p', text: 'Liability for slight negligence is excluded, except in cases of injury to life, body, or health, or breaches of core contractual obligations.' },
        ],
      },
      {
        id: 'governing-law',
        title: '§ 6 Governing Law and Jurisdiction',
        blocks: [
          { type: 'p', text: 'The laws of the Republic of Bulgaria apply. The place of jurisdiction for all disputes arising from this contract is Blagoevgrad, Bulgaria.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Privacy Policy — sections 1, 3, 10 and 11 verbatim; the rest new    */
  /* ------------------------------------------------------------------ */
  privacy: {
    meta: {
      title: 'Privacy Policy',
      description: 'How NewLevelHR processes personal data on this website: controller, hosting, contact form, Calendly booking, cookies, your rights under the GDPR and the competent supervisory authority.',
    },
    title: 'Privacy Policy',
    lead: '',
    blurb: 'What data we process on this website, why, and your rights.',
    intro: [],
    sections: [
      {
        id: 'overview',
        title: '1. Data Protection at a Glance',
        blocks: [
          { type: 'p', text: 'NewLevelHR takes the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations (GDPR) and this Privacy Policy.' },
        ],
      },
      {
        id: 'controller',
        title: '2. Controller',
        blocks: [
          { type: 'p', text: 'The controller within the meaning of the General Data Protection Regulation (GDPR) and other national data protection laws is:' },
          { type: 'address', lines: ['NewLevelHR', 'Orfei 1', '2700 Blagoevgrad', 'Bulgaria'] },
          { type: 'html', html: 'Email: <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a>' },
          { type: 'p', text: 'Represented by: Mariyana Velkova, Managing Director.' },
        ],
      },
      {
        id: 'data-collection',
        title: '3. Data Collection on Our Website',
        blocks: [
          { type: 'html', html: '<strong>Contact Form / Email:</strong> If you send us inquiries via email or the contact form, your details (including your email address and name) will be stored for the purpose of processing the inquiry. We do not share this data without your explicit consent.' },
          { type: 'html', html: '<strong>Server Log Files:</strong> The website provider automatically collects and stores information that your browser automatically transmits to us in "server log files" (e.g., IP address, browser type, time of server request). This data cannot be assigned to specific persons and is used solely for technical optimization.' },
        ],
      },
      {
        id: 'hosting',
        title: '4. Hosting and Server Log Files',
        blocks: [
          { type: 'html', html: 'This website is a static website delivered by a hosting provider (<span class="todo-client">[hosting provider — TO BE ADDED]</span>). Each time the site is accessed, the hosting provider automatically processes the following data in server log files: the IP address of the requesting device, the browser type and version (user agent), the date and time of the request and the requested URL.' },
          { type: 'p', text: 'This data is processed to ensure the secure and stable operation of the website, to detect and defend against attacks and to analyse technical faults. The legal basis is Art. 6(1)(f) GDPR (our legitimate interest in the security and availability of the website). The log data is not merged with other data sources.' },
          { type: 'html', html: 'Retention period: <span class="todo-client">[typically up to 30 days — TO BE CONFIRMED]</span>. Log data that must be retained for evidential purposes is excluded from deletion until the relevant incident has been finally clarified.' },
        ],
      },
      {
        id: 'contact-form',
        title: '5. Contact Form',
        blocks: [
          { type: 'p', text: 'If you use the contact form on this website, we process the data you enter in the form fields:' },
          { type: 'ul', items: ['Name', 'Email address', 'Company (optional)', 'Topic', 'Message', 'Your consent to this Privacy Policy'] },
          { type: 'p', text: 'In addition, your IP address and the time of submission are processed. These two data points are used solely for spam protection and rate limiting and are not used for any other purpose.' },
          { type: 'html', html: 'Your message is transmitted to us by email to <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a> via the mail service of our hosting provider or a transactional email provider (<span class="todo-client">[e.g. Resend — TO BE CONFIRMED]</span>) and is then processed in our email system.' },
          { type: 'p', text: 'The legal basis is Art. 6(1)(b) GDPR where your inquiry is aimed at concluding a contract or relates to pre-contractual measures, and otherwise Art. 6(1)(f) GDPR (our legitimate interest in responding to inquiries addressed to us).' },
          { type: 'html', html: 'Retention period: <span class="todo-client">[12 months after the last contact unless a business relationship follows — TO BE CONFIRMED]</span>. Statutory retention obligations remain unaffected.' },
          { type: 'p', text: 'We do not share the data from your inquiry with third parties for marketing purposes.' },
        ],
      },
      {
        id: 'booking',
        title: '6. Booking a Call (Calendly)',
        blocks: [
          { type: 'p', text: 'To book a free consultation, we provide a link to the scheduling service Calendly (Calendly LLC, USA), which opens in a new tab. No data is transmitted to Calendly by merely visiting our website. Only when you use the booking link and enter your details on Calendly’s pages are the data you provide there (such as your name, email address and the selected appointment) processed by Calendly.' },
          { type: 'html', html: 'The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures taken at your request) and Art. 6(1)(f) GDPR (our legitimate interest in simple appointment scheduling). Calendly processes data in the United States. The transfer is based on the EU standard contractual clauses and/or Calendly’s certification under the EU-US Data Privacy Framework <span class="todo-client">[to be confirmed]</span>. Details can be found in Calendly’s privacy policy: <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">calendly.com/privacy</a>.' },
        ],
      },
      {
        id: 'cookies-consent',
        title: '7. Cookies and Consent',
        blocks: [
          { type: 'p', text: 'Without your consent, this website only uses storage that is strictly necessary for its operation: your cookie choice, whether you have dismissed the language suggestion, and whether the intro animation has already been shown. These entries do not track you and are not shared with third parties (Art. 6(1)(f) GDPR).' },
          { type: 'p', text: 'Optional analytics or marketing cookies are set only after you have given your consent through the cookie dialog (Art. 6(1)(a) GDPR). You can withdraw your consent at any time with effect for the future via the “{cookieSettings}” button in the footer of every page.' },
          { type: 'html', html: 'A complete list of the cookies and local storage entries used by this website can be found in our <a href="{cookiesUrl}">Cookie Policy</a>.' },
        ],
      },
      {
        id: 'fonts',
        title: '8. Fonts and External Resources',
        blocks: [
          { type: 'p', text: 'The fonts used on this website are hosted on our own server. No connection is established to Google Fonts or other content delivery networks when a page loads, and no data is transmitted to such providers for this purpose.' },
          { type: 'p', text: 'Scripts and stylesheets are likewise delivered from our own hosting. External services are only loaded when you actively use a corresponding function (such as the booking link) or have given your consent.' },
        ],
      },
      {
        id: 'analytics',
        title: '9. Analytics',
        blocks: [
          { type: 'p', text: 'By default, this website does not use any analytics or tracking tools. Should we in future use a privacy-friendly analytics tool to measure page views in aggregate, it will be named in this section before activation and loaded only after your consent through the cookie dialog.' },
        ],
      },
      {
        id: 'legal-basis',
        title: '10. Legal Basis for Processing',
        blocks: [
          { type: 'p', text: 'Data processing is carried out on the basis of:' },
          {
            type: 'ul',
            items: [
              'Art. 6(1)(b) GDPR: For the performance of a contract or prior to entering into a contract.',
              'Art. 6(1)(a) GDPR: Based on consent you have given us (e.g., subscribing to a newsletter or submitting a CV).',
              'Art. 6(1)(f) GDPR: To protect our legitimate business interests (website security and optimization).',
            ],
          },
        ],
      },
      {
        id: 'your-rights',
        title: '11. Your Rights',
        blocks: [
          { type: 'p', text: 'Under the GDPR, you have the following rights regarding your personal data:' },
          {
            type: 'ul',
            items: [
              'Right of access (Art. 15 GDPR)',
              'Right to rectification (Art. 16 GDPR)',
              'Right to erasure / "Right to be forgotten" (Art. 17 GDPR)',
              'Right to restrict processing (Art. 18 GDPR)',
              'Right to data portability (Art. 20 GDPR)',
              'Right to object (Art. 21 GDPR)',
            ],
          },
          { type: 'html', html: 'If you wish to exercise any of these rights, please contact us at <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a>. You also have the right to lodge a complaint with the competent supervisory authority (in Bulgaria: Commission for Personal Data Protection – CPDP).' },
        ],
      },
      {
        id: 'supervisory-authority',
        title: '12. Supervisory Authority',
        blocks: [
          { type: 'p', text: 'The supervisory authority competent for NewLevelHR is:' },
          { type: 'address', lines: ['Commission for Personal Data Protection (CPDP / КЗЛД)', '2 Prof. Tsvetan Lazarov Blvd.', '1592 Sofia', 'Bulgaria'] },
          { type: 'html', html: 'Website: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>' },
          { type: 'p', text: 'If you reside in another EU Member State, you may also contact the supervisory authority of your place of residence.' },
        ],
      },
      {
        id: 'changes',
        title: '13. Changes to This Privacy Policy',
        blocks: [
          { type: 'p', text: 'We reserve the right to amend this Privacy Policy so that it always reflects the current legal requirements or changes to our services, for example when new services are introduced. The version published on this website at the time of your visit applies.' },
          { type: 'html', html: 'Effective date: <span class="todo-client">[date — TO BE ADDED]</span>.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Cookie Policy — new                                                 */
  /* ------------------------------------------------------------------ */
  cookies: {
    meta: {
      title: 'Cookie Policy',
      description: 'Which cookies and local storage NewLevelHR uses (only strictly necessary entries), how long they are kept and how you can change your cookie choice at any time.',
    },
    title: 'Cookie Policy',
    lead: 'This page explains what cookies and local storage are, which entries this website actually uses, and how you can change your choice at any time.',
    blurb: 'The three entries this site stores, and how to change your choice.',
    intro: [],
    sections: [
      {
        id: 'what-cookies-are',
        title: '1. What Cookies and Local Storage Are',
        blocks: [
          { type: 'p', text: 'Cookies are small text files that a website stores on your device via your browser. They allow the website to recognise your browser on later visits and, for example, to remember your settings. Local storage is a comparable storage area in your browser in which a website can save entries; unlike cookies, these entries are not sent to the server with every request.' },
          { type: 'p', text: 'Both types of storage can be strictly necessary (without them the website or a function you requested does not work) or optional (analytics, marketing). Optional entries are set only with your consent.' },
        ],
      },
      {
        id: 'what-we-use',
        title: '2. What This Website Uses',
        blocks: [
          { type: 'p', text: 'This website deliberately keeps its footprint small. The following entries are all first-party and strictly necessary; none of them tracks your behaviour across websites:' },
          {
            type: 'table',
            caption: 'Cookies and local storage used by this website',
            headers: ['Name', 'Type', 'Purpose', 'Duration', 'Category'],
            rows: [
              ['{consentCookie}', 'First-party cookie', 'Stores your cookie choices.', '12 months', 'Necessary'],
              ['{langBannerKey}', 'localStorage', 'Remembers that you dismissed the language suggestion or chose a language.', 'Until deleted', 'Necessary'],
              ['{preloaderKey}', 'localStorage', 'Remembers that the first-visit intro animation was shown.', 'Until deleted', 'Necessary'],
            ],
          },
          {
            type: 'dl',
            terms: [
              { term: 'Analytics', text: 'None at present. If enabled, listed here before activation.' },
              { term: 'Marketing', text: 'None.' },
            ],
          },
        ],
      },
      {
        id: 'change-your-choice',
        title: '3. How to Change Your Choice',
        blocks: [
          { type: 'p', text: 'You can reopen the cookie dialog at any time using the “{cookieSettings}” button in the footer of every page, or directly here:' },
          { type: 'consentButton' },
          { type: 'p', text: 'Your new choice takes effect immediately and is stored in the {consentCookie} cookie. Withdrawing consent does not affect the lawfulness of processing carried out on the basis of that consent before its withdrawal.' },
          { type: 'p', text: 'You can also delete or block cookies and local storage in your browser settings. Most browsers let you delete stored data for individual websites, block third-party cookies or refuse all cookies. Please note that blocking strictly necessary entries may limit the functionality of this website; for example, the cookie dialog will then appear again on every visit.' },
        ],
      },
      {
        id: 'third-party',
        title: '4. Third-Party Links',
        blocks: [
          { type: 'html', html: 'To book a call, our website links to the scheduling service Calendly (Calendly LLC, USA). This link opens in a new tab; only when you use it does Calendly set its own cookies according to its own policies. We have no influence on this processing. Details can be found in Calendly’s privacy policy: <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">calendly.com/privacy</a>. Merely visiting our website does not transmit any data to Calendly.' },
        ],
      },
      {
        id: 'contact',
        title: '5. Contact',
        blocks: [
          { type: 'html', html: 'If you have questions about our use of cookies or about data protection in general, please write to <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a>. Further information on the processing of personal data can be found in our <a href="{privacyUrl}">Privacy Policy</a>.' },
        ],
      },
    ],
  },
} as const;

export type LegalDict = Widen<typeof legal>;
