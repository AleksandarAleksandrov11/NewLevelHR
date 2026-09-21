import type { FaqDict } from '../en/faq';

export const faq: FaqDict = {
  meta: {
    title: 'FAQ: Antworten zu Fraktionaler HR, Recruiting und Compliance',
    description:
      'Antworten auf die Fragen, die Gründer uns zuerst stellen: Was Fraktionale HR ist, wie Preise und das kostenlose Gespräch funktionieren, wie die 90-Tage-Erfolgsbrücke abläuft, was die EU-Entgelttransparenzrichtlinie für KMU bedeutet und was wir nicht tun.',
  },
  hero: {
    eyebrow: 'FAQ',
    title: 'Die Fragen, die Gründer uns zuerst stellen.',
    text: 'Klare Antworten zu Fraktionaler HR, Recruiting, Compliance und dazu, wie sich die Zusammenarbeit mit uns tatsächlich anfühlt. Fehlt Ihre Frage, ist das kostenlose 30-Minuten-Gespräch der schnellste Weg zur Antwort.',
  },
  search: {
    label: 'Fragen durchsuchen',
    placeholder: 'Suchen, z. B. „Preise“ oder „90 Tage“',
    clear: 'Suche löschen',
    navLabel: 'Zu einem Thema springen',
    results: '{count} von {total} Fragen',
    noResults: 'Keine Frage passt zu „{query}“. Versuchen Sie ein anderes Wort oder fragen Sie uns einfach direkt.',
  },
  groups: [
    {
      id: 'basics',
      title: 'Fraktionale HR: die Grundlagen',
      items: [
        {
          q: 'Was genau ist Fraktionale HR?',
          a: 'Eine erfahrene HR-Partnerin, die für einen definierten Anteil ihrer Zeit mit Ihrem Unternehmen arbeitet, auf Retainer-Basis oder pro Projekt, statt als Festangestellte auf der Gehaltsliste.\n\nSie bekommen Strategie und Umsetzung in einer Person: Struktur, Richtlinien, Recruiting, schwierige Gespräche und die Personalentscheidungen, die mit dem Wachstum kommen. Ohne die Fixkosten einer Führungskraft, und ohne ein Dashboard, das so tut, als wäre es ein Partner.',
        },
        {
          q: 'Worin liegt der Unterschied zu einer festangestellten HR-Leitung?',
          a: 'Drei Dinge ändern sich. Seniorität: Sie bekommen vom ersten Tag an eine erfahrene Partnerin, nicht die Generalistin, die sich Ihr Budget gerade leisten kann. Tempo: Wir starten in Tagen, nicht nach Monaten aus Recruiting und Kündigungsfristen. Bindung: Der Umfang wächst mit Ihrem Bedarf, statt Fixgehalt, Benefits und Kündigungsfrist zu sein.\n\nWas gleich bleibt, ist die Nähe. Wir sind in Ihrem Slack, kennen Ihr Team beim Namen und gehen ans Telefon, wenn etwas schiefläuft.',
        },
        {
          q: 'Für wen ist Fraktionale HR gedacht?',
          a: 'Für Gründer, Geschäftsführer und Führungsteams von Start-ups und KMU in Europa, meist aus der Tech-Branche, insbesondere in Bulgarien und im deutschsprachigen Raum.\n\nTypischerweise ist das Unternehmen über den Punkt hinausgewachsen, an dem Personalthemen nebenbei erledigt werden können, aber noch nicht so weit, dass eine eigene HR-Abteilung sinnvoll wäre. Wenn Sie sich in dieser Lücke wiedererkennen, ist das Angebot für Sie gemacht.',
        },
        {
          q: 'Wie funktioniert die Preisgestaltung?',
          a: 'Zwei Modelle. Ein monatlicher Retainer für eine laufende Partnerschaft, in der wir erreichbar sind und die wiederkehrende Personalarbeit übernehmen. Oder ein fest umrissenes Projekt für klar definierte Aufgaben, etwa eine Richtlinienprüfung, eine Gehaltsstruktur oder eine Recruiting-Kampagne.\n\nEine Preisliste veröffentlichen wir nicht, weil sich der Umfang zwischen einem Fünf-Personen-Start-up und einem Unternehmen mit hundert Beschäftigten stark unterscheidet. Im kostenlosen 30-Minuten-Gespräch sehen wir uns Ihre Situation gemeinsam an; danach erhalten Sie ein klares schriftliches Angebot, bevor irgendetwas beginnt.',
        },
        {
          q: 'Wie schnell können wir starten?',
          a: 'In Tagen, nicht in Monaten. Nach dem kostenlosen Gespräch und einem Angebot, dem Sie zustimmen, richten wir die praktische Seite ein (ein Slack-Kanal, Zugang zu den Tools, die Sie nutzen, eine kurze Bestandsaufnahme Ihres aktuellen Setups) und beginnen mit der ersten Priorität.\n\nLiegt ein dringendes Personalthema auf dem Tisch, kommt das zuerst. Struktur kann folgen, sobald das Feuer gelöscht ist.',
        },
      ],
    },
    {
      id: 'working',
      title: 'Zusammenarbeit',
      items: [
        {
          q: 'Was passiert im kostenlosen 30-Minuten-Gespräch?',
          a: 'Sie beschreiben Ihre Situation, wir stellen viele Fragen. Das ist wirklich alles. Kein Pitch, kein Druck.\n\nSie gehen mit einem klaren Bild davon heraus, was Ihrem Team als Nächstes tatsächlich helfen würde: die Zusammenarbeit mit uns, ein Spezialist, an den wir Sie verweisen können, oder einfach ein paar Dinge, die Sie selbst lösen können.',
        },
        {
          q: 'Wie kommunizieren wir im Alltag?',
          a: 'So, wie Ihr Team ohnehin arbeitet: ein gemeinsamer Slack-Kanal, E-Mail und Telefonate. Die meisten Fragen beantworten wir asynchron; alles Sensible besprechen wir im Gespräch.\n\nWir sind Montag bis Freitag von 9 bis 18 Uhr MEZ erreichbar und antworten an Werktagen innerhalb von 24 Stunden. Dringende Mitarbeiterthemen haben Vorrang vor allem anderen.',
        },
        {
          q: 'In welchen Sprachen arbeiten Sie?',
          a: 'Englisch, Deutsch und Bulgarisch. Dokumente, Richtlinien, Interviews und Coaching-Sitzungen können in jeder der drei Sprachen stattfinden, und Ihr Team muss nicht die Sprache wechseln, um mit uns zu sprechen.',
        },
        {
          q: 'Wo sitzen Sie, und arbeiten Sie remote?',
          a: 'NewLevelHR hat seinen Sitz in Blagoewgrad, Bulgarien, und arbeitet mit Teams in ganz Europa. Der größte Teil der Zusammenarbeit findet remote statt, so wie unsere Kunden ohnehin arbeiten.\n\nGleichzeitig kennen wir den bulgarischen und den deutschsprachigen Markt von innen: die lokale Praxis, typische Vertragskonstellationen und das, was eine Behörde tatsächlich sehen will.',
        },
      ],
    },
    {
      id: 'hiring',
      title: 'Recruiting & die 90-Tage-Erfolgsbrücke',
      items: [
        {
          q: 'Wie funktioniert High-Velocity Hiring?',
          a: 'Es beginnt vor der Stellenanzeige: mit einer Rollen-Scorecard, die festhält, wie Erfolg in den ersten Monaten aussieht, und mit einer Gehaltsspanne, die sich erklären lässt. Dann folgt ein strukturierter Prozess mit klarer Interview-Abfolge, schnellem Feedback an jede Kandidatin und jeden Kandidaten und Entscheidungen in Tagen statt Wochen.\n\nDie Recruiting-Disziplin der großen Tech-Unternehmen, zugeschnitten auf ein Unternehmen ohne eigene Recruiting-Abteilung. Und sie endet nicht mit der Unterschrift: Jede Einstellung kommt mit der 90-Tage-Erfolgsbrücke.',
        },
        {
          q: 'Was ist die 90-Tage-Erfolgsbrücke?',
          a: 'Nach der Vertragsunterschrift bleiben wir die ersten drei Monate an Bord und coachen sowohl die neue Fachkraft als auch die Führungskraft. Tag 1: Erwartungen, Ziele für den ersten Monat und ein Check-in-Rhythmus werden vereinbart, bevor der Laptop ankommt. Tag 30: eine strukturierte Feedbackschleife, die frühe Reibung benennt, solange sie noch klein ist. Tag 60: Kurskorrektur anhand der Scorecard. Tag 90: Probezeitgespräch mit klarer Entscheidung und Entwicklungsplan.\n\nDie meisten frühen Kündigungen entscheiden sich in den ersten Wochen. Die Brücke ist dafür da, dass es nicht dazu kommt.',
        },
        {
          q: 'Bekommen wir die Brücke auch für jemanden, den wir selbst eingestellt haben?',
          a: 'Ja. Die Brücke ist in jedem High-Velocity-Hiring-Auftrag enthalten und zusätzlich einzeln buchbar für eine Person, die Sie bereits eingestellt haben. Idealerweise beginnt sie vor dem ersten Arbeitstag, ein Einstieg in den ersten Wochen funktioniert aber ebenfalls.\n\nSie eignet sich auch für interne Beförderungen: Ein neuer Teamlead profitiert von derselben 30/60/90-Struktur.',
        },
        {
          q: 'Was bedeutet „High-Velocity“ konkret, und garantieren Sie Ergebnisse?',
          a: 'Es bedeutet, dass jeder Schritt in Tagen gemessen wird, nicht in Monaten: Feedback an Kandidaten, Entscheidungen, Angebote. Das Tempo entsteht durch Vorbereitung und Struktur, nicht durch Abkürzungen.\n\nNein, wir versprechen keine garantierten Ergebnisse; das kann kein seriöser Recruiting-Prozess. Was wir versprechen, ist ein klarer Prozess, ehrliches Feedback und eine Brücke, die Probleme früh auffängt, statt an dem Tag, an dem jemand kündigt.',
        },
      ],
    },
    {
      id: 'compliance',
      title: 'Compliance & die EU-Entgelttransparenzrichtlinie',
      items: [
        {
          q: 'Was bedeutet die EU-Entgelttransparenzrichtlinie für ein Start-up oder KMU?',
          a: 'Ganz allgemein: Bewerberinnen und Bewerber erhalten das Recht, die Gehaltsspanne vor dem Interview zu erfahren, und dürfen nicht mehr nach ihrem bisherigen Gehalt gefragt werden. Beschäftigte erhalten das Recht auf Auskunft über das Entgeltniveau für vergleichbare Arbeit. Berichtspflichten zum geschlechtsspezifischen Entgeltgefälle werden abhängig von der Unternehmensgröße stufenweise eingeführt. Und die Vergütung muss auf objektiven, geschlechtsneutralen Kriterien beruhen, die Sie erklären können.\n\nDie praktische Konsequenz für die meisten KMU: „Gehalt nach Bauchgefühl“ funktioniert nicht mehr; Sie brauchen Gehaltsbänder und eine Struktur, die Sie vertreten können. Bitte beachten Sie: Das ist HR-Beratung, keine Rechtsberatung. Die genauen Regeln und Fristen hängen von der nationalen Umsetzung in Ihrem Land ab, die Sie mit Ihrer Rechtsberatung klären.',
        },
        {
          q: 'Wie helfen Sie uns bei der Vorbereitung?',
          a: 'Wir bauen die Bausteine, die Sie ohnehin brauchen werden: eine einfache Stellenarchitektur, Gehaltsbänder mit klaren Kriterien, Leitfäden für Stellenanzeigen und Interviews (inklusive dessen, was nicht gefragt werden darf) sowie einen Prozess für Auskunftsanfragen von Beschäftigten.\n\nAlles ist so angelegt, dass es sich auf einer Seite erklären lässt, statt in einer Tabelle, die niemand versteht. Wo rechtliche Formulierungen nötig sind, arbeiten wir mit Ihrer Anwältin oder Ihrem Anwalt zusammen.',
        },
        {
          q: 'Prüfen Sie unsere Arbeitsverträge und Richtlinien?',
          a: 'Ja, aus HR-Sicht. Wir prüfen, ob Verträge, Richtlinien, Handbuch und Personalakten vollständig, konsistent, aktuell und in der Praxis tatsächlich in Gebrauch sind, und benennen die Lücken mit einer priorisierten Liste von Maßnahmen.\n\nDie rechtliche Formulierung der finalen Dokumente wird mit Ihrer Rechtsberatung abgestimmt; wir bereiten vor, strukturieren und halten alles aktuell, damit das dort Stunden statt Wochen dauert.',
        },
        {
          q: 'Was bedeutet „Bereitschaft für die Arbeitsinspektion“?',
          a: 'Dass die Unterlagen, die eine Prüfung üblicherweise verlangt, vollständig und auffindbar sind: unterschriebene Verträge und Nachträge, Arbeitszeitaufzeichnungen, Richtlinien, Kenntnisnahmen, Personalakten.\n\nWir gehen mit Ihnen eine Checkliste durch, schließen die Lücken und richten eine ruhige Routine ein, damit es so bleibt. So wird aus einer Prüfung ein Termin, kein Notfall. Auch hier gilt: HR-Beratung an der Seite Ihrer Rechtsberatung, keine rechtliche Vertretung.',
        },
      ],
    },
    {
      id: 'scope',
      title: 'Was wir nicht tun',
      items: [
        {
          q: 'Was tun Sie nicht?',
          a: 'NewLevelHR bietet HR-Beratung und Recruiting-Dienstleistungen während der üblichen Geschäftszeiten; wir bieten keine Lohnabrechnung, Steuererklärung, Rechtsberatung oder PEO-/Co-Employment-Dienstleistungen an.\n\nWas wir stattdessen tun: Wir sorgen dafür, dass die Grundlagen für diese Leistungen sauber sind (Verträge, Gehaltsstrukturen, dokumentierte Entscheidungen), und arbeiten mit Ihrer Steuerberatung, Ihrem Lohnbüro und Ihrer Rechtsberatung zusammen, damit diese alles Nötige in einem Durchgang von Ihnen bekommen.',
        },
        {
          q: 'Übernehmen Sie Lohnabrechnung oder Steuererklärungen?',
          a: 'Nein. Wir führen keine Lohnabrechnung durch und geben keine Steuererklärungen ab. Was wir tun: Wir definieren, was die Lohnabrechnung von Ihnen braucht: Gehaltsbänder, Bonusregeln, Vertragsbedingungen und die Änderungen, die mit Einstellungen, Beförderungen und Austritten kommen, dokumentiert, damit Ihr Lohnbüro oder Ihre Steuerberatung jeden Monat saubere Daten erhält.',
        },
        {
          q: 'Können Sie uns rechtlich beraten?',
          a: 'Nein. Unsere Compliance-Unterstützung ist HR-Beratung, die an der Seite Ihrer Rechtsberatung arbeitet. Wir bereiten vor, strukturieren und weisen auf Risiken hin; Ihre Anwältin oder Ihr Anwalt bestätigt die rechtliche Formulierung und vertritt Sie, wo Vertretung nötig ist.\n\nWenn Sie noch keine Rechtsberatung haben, sagen wir Ihnen klar, an welchem Punkt Sie eine brauchen.',
        },
        {
          q: 'Treten Sie als Employer of Record oder PEO auf?',
          a: 'Nein. Ihre Mitarbeitenden bleiben bei Ihrem eigenen Unternehmen angestellt; wir beschäftigen niemanden mit und treten nicht als Employer of Record auf. Wobei wir helfen, ist ein sauberes Arbeitsverhältnis auf Ihrer Seite: Rollen, Verträge, Onboarding und die Führungskraft, die das Team leitet.',
        },
      ],
    },
  ],
};
