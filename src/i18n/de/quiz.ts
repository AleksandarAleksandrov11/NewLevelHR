import type { QuizDict } from '../en/quiz';

export const quiz: QuizDict = {
  eyebrow: 'HR-Gesundheitscheck',
  title: 'Wie gesund ist die Personalseite Ihres Unternehmens?',
  text: 'Fünf kurze Fragen, etwa eine Minute, keine E-Mail nötig. Ihre Antworten bleiben in Ihrem Browser.',
  start: 'Check starten',
  next: 'Weiter',
  back: 'Zurück',
  seeResult: 'Ergebnis anzeigen',
  restart: 'Neu starten',
  progress: 'Frage {current} von {total}',
  privacy: 'Nichts wird gespeichert oder gesendet. Das Ergebnis wird auf Ihrem Gerät berechnet.',
  questions: [
    { id: 'overwhelm', q: 'Wie viel Ihrer Woche geht für Mitarbeiterthemen und HR-Administration drauf?', options: ['Fast nichts, das läuft von allein', 'Ein paar Stunden, mehr als mir lieb ist', 'Zu viel. Es verdrängt regelmäßig die Produktarbeit'] },
    { id: 'managers', q: 'Wie gut sind Ihre Teamleads auf Feedback- und Konfliktgespräche vorbereitet?', options: ['Gut vorbereitet, sie meistern das', 'Gemischt. Manche weichen den harten Gesprächen aus', 'Gar nicht. Die meisten wurden wegen ihrer Fachkompetenz befördert'] },
    { id: 'pay', q: 'Wie werden Gehälter und Benefits festgelegt?', options: ['Klare Gehaltsbänder und Regeln, die jeder erklären kann', 'Grobe Spannen, von Fall zu Fall entschieden', 'Bauchgefühl und was die Kandidaten verlangen'] },
    { id: 'hiring', q: 'Wie oft gehen neue Mitarbeitende in den ersten 3 Monaten wieder oder bleiben hinter den Erwartungen zurück?', options: ['Selten, das Onboarding funktioniert', 'Ab und zu kommt es vor', 'Oft genug, dass sich Recruiting wie ein Glücksspiel anfühlt'] },
    { id: 'audit', q: 'Wenn morgen die Arbeitsinspektion vor der Tür stünde: Wie gut hielten Ihre Verträge und Richtlinien stand?', options: ['Gut, alles ist aktuell', 'Größtenteils gut, ein paar Dinge sind veraltet', 'Ehrlich gesagt möchte ich das lieber nicht herausfinden'] },
  ],
  result: {
    title: 'Ihr Ergebnis',
    scoreLabel: 'Personalrisiko-Score',
    levels: [
      { max: 3, label: 'Solides Fundament', text: 'Die Grundlagen stehen. Der beste nächste Schritt: die Struktur dem Wachstum voraus halten, damit das so bleibt.' },
      { max: 6, label: 'Ein paar Lücken zu schließen', text: 'Einige Bereiche kosten Sie Zeit oder schaffen Risiken. Mit der richtigen Struktur und einem Partner, der die operative Arbeit übernimmt, sind sie in Wochen behoben.' },
      { max: 10, label: 'Dringend: Personalprobleme bremsen Ihr Wachstum', text: 'Mehrere Bereiche brauchen jetzt Aufmerksamkeit. Beginnen Sie mit dem schwierigsten und geben Sie den Rest ab, bevor es Sie eine Schlüsselperson oder ein Bußgeld kostet.' },
    ],
    recommendedTitle: 'Empfohlen für Sie',
    recommendedIntro: 'Auf Basis Ihrer Antworten hätten diese Leistungen die größte Wirkung:',
    noIssues: 'Keine dringenden Lücken. Wenn Sie trotzdem einen zweiten Blick möchten, ist das kostenlose Erstgespräch ein guter Anfang.',
    book: 'Mein Ergebnis im kostenlosen Gespräch besprechen',
    explore: 'Entdecken',
  },
};
