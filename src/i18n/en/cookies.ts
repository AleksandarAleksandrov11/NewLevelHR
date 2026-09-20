import type { Widen } from '../types';
/** Cookie consent banner and settings dialog. */
export const cookies = {
  title: 'Cookies, kept simple.',
  text: 'We only use cookies that are strictly necessary for this site to work. Optional analytics or marketing cookies are off unless you switch them on. You can change your choice at any time in the footer.',
  acceptAll: 'Accept all',
  rejectAll: 'Reject all',
  settings: 'Settings',
  save: 'Save choices',
  back: 'Back',
  policyLink: 'Cookie policy',
  privacyLink: 'Privacy policy',
  settingsTitle: 'Cookie settings',
  settingsText: 'Choose which categories you allow. Necessary cookies are always active because the site cannot work without them.',
  alwaysOn: 'Always on',
  categories: {
    necessary: {
      title: 'Necessary',
      desc: 'Stores your cookie choice and basic preferences such as the language banner. No tracking.',
    },
    analytics: {
      title: 'Analytics',
      desc: 'Anonymous usage statistics that help us understand which pages are useful. Only loaded if a provider is configured and you allow it.',
    },
    marketing: {
      title: 'Marketing',
      desc: 'Cookies from third-party services used for marketing. Currently none are in use on this site.',
    },
  },
  toggleLabel: 'Allow {category} cookies',
  reopen: 'Cookie settings',
  savedTitle: 'Choice saved.',
  savedText: 'You can change it at any time using the “Cookie settings” link in the footer.',
} as const;
export type CookiesDict = Widen<typeof cookies>;
