import type { ToolsDict } from '../en/tools';

export const tools: ToolsDict = {
  health: {
    meta: {
      title: 'Kostenloser HR-Check für Startups und KMU | NewLevelHR',
      description: 'Fünf Fragen zu Ihrer Woche, Ihren Führungskräften, Gehalt, Recruiting und Unterlagen. Sie erhalten einen People-Risiko-Wert und den ersten Punkt, der sich zu beheben lohnt. Ohne Anmeldung, nichts wird gespeichert.',
    },
    hero: {
      eyebrow: 'Kostenloses Werkzeug',
      title: 'Fünf Fragen. Ein ehrliches Bild.',
      text: 'Wo die People-Seite Ihres Unternehmens heute steht, in etwa einer Minute. Nichts wird an uns gesendet und nichts gespeichert.',
      start: 'Check starten',
    },
    areas: {
      title: 'Was der Check anschaut',
      items: [
        { title: 'Ihre Woche', body: 'Wie viele Stunden in Mitarbeiterthemen und HR-Administration gehen statt ins Geschäft.' },
        { title: 'Ihre Führungskräfte', body: 'Ob Ihre Leads Feedback und Konflikte selbst führen können oder sie still vermeiden.' },
        { title: 'Gehalt', body: 'Ob Gehälter Bändern folgen, die Sie erklären können, oder dem Ergebnis der letzten Verhandlung.' },
        { title: 'Recruiting', body: 'Wie oft eine neue Person in den ersten drei Monaten geht oder hinter den Erwartungen bleibt.' },
        { title: 'Unterlagen', body: 'Wie Ihre Verträge und Richtlinien standhalten würden, wenn morgen eine Prüfung käme.' },
      ],
    },
    privacy: 'Der Check läuft vollständig in Ihrem Browser. Keine E-Mail, kein Konto, keine Antwort verlässt Ihr Gerät.',
    otherTool: {
      title: 'Fragen Sie sich, was eine Fehlbesetzung kostet?',
      text: 'Das zweite Werkzeug beziffert eine Fehlbesetzung, Zeile für Zeile.',
      button: 'Kostenrechner öffnen',
    },
  },
  cost: {
    meta: {
      title: 'Kosten einer Fehlbesetzung: kostenloser Rechner | NewLevelHR',
      description: 'Beziffern Sie eine Fehlbesetzung: Gehalt in der erfolglosen Zeit, Recruiting, Zeit der Führungskraft, Abfindung und die leere Stelle danach. Jede Zeile ist sichtbar.',
    },
    hero: {
      eyebrow: 'Kostenloses Werkzeug',
      title: 'Was eine Fehlbesetzung wirklich kostet.',
      text: 'Passen Sie die Annahmen an Ihr Unternehmen an und sehen Sie die Zahl sich bewegen. Jede Zeile der Rechnung ist sichtbar, Sie können also jeder einzelnen widersprechen.',
      start: 'Rechner öffnen',
    },
    privacy: 'Der Rechner läuft vollständig in Ihrem Browser. Nichts wird gespeichert und nichts an uns gesendet.',
    included: {
      title: 'Was in die Zahl einfließt',
      items: [
        { title: 'Gehalt in der erfolglosen Zeit', body: 'Was Sie gezahlt haben, während die Stelle nicht ausgefüllt wurde.' },
        { title: 'Recruiting der ersten Einstellung', body: 'Honorar, Stellenanzeigen und die internen Stunden, die in die Suche geflossen sind.' },
        { title: 'Zeit der Führungskraft', body: 'Einarbeitung, zusätzliche Begleitung und Nacharbeit, zum echten Stundensatz der Führungskraft.' },
        { title: 'Abfindung und Kündigungsfrist', body: 'Bezahlte Monate am Ende, in denen kaum produktiv gearbeitet wird.' },
        { title: 'Recruiting der Nachbesetzung', body: 'Dieselbe Suche noch einmal, von vorn.' },
        { title: 'Die leere Stelle', body: 'Die Monate, in denen die Arbeit gar nicht gemacht wird, während Sie neu besetzen.' },
      ],
    },
    notPrice: {
      title: 'Das ist keine Preisliste',
      text: 'Die Summe ist eine Schätzung dessen, was eine Fehlbesetzung Ihr Unternehmen kostet. Sie hat nichts mit unserem Honorar zu tun: Unsere Arbeit wird nach dem kostenlosen Gespräch angeboten, wenn klar ist, was Sie tatsächlich brauchen.',
    },
    otherTool: {
      title: 'Unsicher, wo das Risiko liegt?',
      text: 'Der HR-Check findet in fünf Fragen den Bereich, der Sie am meisten kostet.',
      button: 'HR-Check öffnen',
    },
  },
};
