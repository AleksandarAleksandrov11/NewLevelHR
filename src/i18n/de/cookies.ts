import type { CookiesDict } from '../en/cookies';

export const cookies: CookiesDict = {
  title: 'Cookies, ganz einfach.',
  text: 'Wir verwenden nur Cookies, die für den Betrieb dieser Website unbedingt erforderlich sind. Optionale Analyse- oder Marketing-Cookies bleiben aus, solange Sie sie nicht aktivieren. Ihre Auswahl können Sie jederzeit im Footer ändern.',
  acceptAll: 'Alle akzeptieren',
  rejectAll: 'Alle ablehnen',
  settings: 'Einstellungen',
  save: 'Auswahl speichern',
  back: 'Zurück',
  policyLink: 'Cookie-Richtlinie',
  privacyLink: 'Datenschutzerklärung',
  settingsTitle: 'Cookie-Einstellungen',
  settingsText: 'Wählen Sie, welche Kategorien Sie zulassen. Notwendige Cookies sind immer aktiv, weil die Website ohne sie nicht funktioniert.',
  alwaysOn: 'Immer aktiv',
  categories: {
    necessary: {
      title: 'Notwendig',
      desc: 'Speichert Ihre Cookie-Auswahl und einfache Einstellungen wie den Sprachhinweis. Kein Tracking.',
    },
    analytics: {
      title: 'Analyse',
      desc: 'Anonyme Nutzungsstatistiken, die uns zeigen, welche Seiten hilfreich sind. Wird nur geladen, wenn ein Anbieter konfiguriert ist und Sie zustimmen.',
    },
    marketing: {
      title: 'Marketing',
      desc: 'Cookies von Drittanbietern für Marketingzwecke. Derzeit werden auf dieser Website keine eingesetzt.',
    },
  },
  toggleLabel: '{category}-Cookies zulassen',
  reopen: 'Cookie-Einstellungen',
  savedTitle: 'Auswahl gespeichert.',
  savedText: 'Sie können sie jederzeit über den Link „Cookie-Einstellungen“ im Footer ändern.',
};
