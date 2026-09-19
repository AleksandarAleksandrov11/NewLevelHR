import type { BlogDict } from '../en/blog';

export const blog: BlogDict = {
  meta: {
    title: 'Blog – Notizen von der People-Seite des Wachstums',
    description: 'Artikel zu Recruiting, Onboarding, Führung, Kultur und Compliance für Gründerinnen, Gründer und Führungsteams von Startups und KMU, geschrieben von NewLevelHR.',
  },
  hero: {
    eyebrow: 'Blog',
    title: 'Notizen von der People-Seite des Wachstums.',
    text: 'Kurze, praktische und gelegentlich humorvolle Texte zu Recruiting, Onboarding, Führungskräften, Kultur und den Regeln, die sich rund ums Gehalt gerade ändern.',
  },
  categories: {
    culture: 'Kultur',
    recruiting: 'Recruiting',
    leadership: 'Führung',
    compliance: 'Compliance',
    onboarding: 'Onboarding',
  },
  all: 'Alle',
  filterLabel: 'Nach Thema filtern',
  count: '{count} von {total} Artikeln',
  empty: 'Zu diesem Thema gibt es noch keine Artikel. Schauen Sie bald wieder vorbei oder wählen Sie ein anderes Thema.',
  featured: 'Neu',
  post: {
    toc: 'Auf dieser Seite',
    share: 'Teilen',
    shareLinkedIn: 'Auf LinkedIn teilen',
    shareX: 'Auf X teilen',
    shareEmail: 'Per E-Mail teilen',
    copyLink: 'Link kopieren',
    copied: 'Link kopiert',
    related: 'Ähnliche Artikel',
    backToBlog: 'Zurück zum Blog',
    writtenBy: 'Geschrieben von',
    publishedOn: 'Veröffentlicht am',
    updatedOn: 'Aktualisiert am',
    ctaTitle: 'Erkennen Sie Ihr eigenes Team darin wieder?',
    ctaText: 'Ein kostenloses 30-Minuten-Gespräch ist der schnellste Weg herauszufinden, was helfen würde. Kein Pitch, kein Druck.',
    ctaButton: 'Kostenloses Gespräch buchen',
    tags: 'Themen',
    minutes: '{minutes} Min. Lesezeit',
  },
  comingSoon: {
    eyebrow: 'Demnächst',
    title: 'In Arbeit',
    text: 'Drei längere Beiträge, die wir als Nächstes schreiben.',
    items: [
      { title: 'Die EU-Entgelttransparenzrichtlinie: Was Sie wissen müssen', text: 'Wie die neue Richtlinie Ihr Recruiting und Ihre Gehaltsstrukturen beeinflusst und was Sie jetzt vorbereiten sollten.' },
      { title: 'Warum Ihre erste Führungskraft die wichtigste Einstellung ist', text: 'Die versteckten Kosten, wenn großartige Entwickler ohne Führungstraining befördert werden.' },
      { title: 'Die 90-Tage-Brücke: Wie Sie aufhören, neue Mitarbeitende zu verlieren', text: 'Eine Fallstudie zur Reduzierung früher Fluktuation durch strukturierte Onboarding-Begleitung.' },
    ],
  },
};
