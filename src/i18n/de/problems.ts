import type { ProblemsDict } from '../en/problems';

export const problems: ProblemsDict = {
  meta: {
    title: 'Was wir lösen: acht People-Probleme in wachsenden Unternehmen',
    description: 'Gründer-Überlastung, ungeschulte Führungskräfte, Gehalt nach Bauchgefühl, Fehlbesetzungen, Prüfungsangst, chaotisches Wachstum, riskante Kündigungen und uneinige Führung: was jedes davon Sie kostet und wie NewLevelHR es löst.',
  },
  hero: {
    eyebrow: 'Was wir lösen',
    title: 'Die People-Probleme, die wachsende Unternehmen ausbremsen.',
    text: 'Acht Situationen, die wir in Startups und KMU immer wieder sehen. Unten jede davon im Detail: wie sie sich von innen anfühlt, was sie Sie still und leise kostet und wie wir sie lösen.',
    imageAlt: 'Zwei Kolleginnen planen die nächsten Schritte an einem Whiteboard in einem hellen Büro',
  },
  navLabel: 'Zu einem Problem springen',
  labels: {
    symptoms: 'Symptome',
    cost: 'Was es Sie kostet',
    fix: 'So lösen wir es',
    alsoSee: 'Ebenfalls Teil der Lösung:',
    problem: 'Problem {n} von {total}',
    sideCtaTitle: 'Nicht sicher, welches Ihres ist?',
    sideCtaText: 'Ein kostenloses 30-Minuten-Gespräch ist der schnellste Weg herauszufinden, was zuerst helfen würde.',
  },
  items: {
    overwhelm: {
      symptoms: [
        'Ihr Kalender ist voll mit 1:1s über Konflikte, nicht über das Produkt.',
        'Verträge, Richtlinien und Onboarding-Checklisten leben in Ihrem Kopf oder in verstreuten Dokumenten.',
        'Jede HR-Frage, vom Urlaubstag bis zur Gehaltserhöhung, landet auf Ihrem Schreibtisch.',
        'Personalentscheidungen werden aufgeschoben, weil nie Zeit ist, sie zu Ende zu denken.',
      ],
      cost: 'Gründerstunden sind die teuersten Stunden im Unternehmen. Jeder Nachmittag, der mit Schlichten oder Papierkram vergeht, ist ein Nachmittag, den das Produkt, die Kunden und die nächste Finanzierungsrunde nicht bekommen.',
      fix: {
        title: 'Eine Senior-Partnerin, die Ihnen die People-Administration abnimmt.',
        text: 'Sie bekommen eine HR-Partnerin auf Abruf, ohne Vollzeitgehalt. Wir bauen die Strukturen einmal auf und betreiben dann das Tagesgeschäft mit Ihnen, in Ihrem Slack-Channel, in Ihrer Sprache.',
        points: [
          'Eine People-Operations-Basis: Verträge, Richtlinien, Onboarding und Offboarding, einmal aufgesetzt und aktuell gehalten.',
          'Ein Kanal für jede Personalfrage, beantwortet innerhalb von 24 Stunden an Werktagen.',
          'Die schwierigen Gespräche mit Ihnen vorbereitet oder gemeinsam geführt, damit sie nicht länger aufgeschoben werden.',
        ],
      },
      serviceLabel: 'Ihre Partnerin auf Abruf für genau das:',
    },
    managers: {
      symptoms: [
        'Ihr bester Entwickler wurde Teamlead und verbringt den Tag jetzt damit, Menschen auszuweichen.',
        'Feedback wird entweder gar nicht gegeben oder kommt Monate zu spät im Jahresgespräch.',
        'Kleine Spannungen wachsen zu Kündigungen, weil niemand sie früh angesprochen hat.',
        'Leads eskalieren jede Entscheidung zu Ihnen, statt ihr Team zu verantworten.',
      ],
      cost: 'Menschen kündigen selten einem Unternehmen. Sie kündigen einer Führungskraft, der nie beigebracht wurde, wie man führt.',
      fix: {
        title: 'Praktisches Coaching, das aus Experten Führungskräfte macht.',
        text: 'Wir coachen Ihre Leads zu den Situationen, vor denen sie diesen Monat wirklich stehen: das Feedback, dem sie ausweichen, der Konflikt im Team, die Delegation, die sie nicht machen. Werkzeuge zuerst, Theorie nur, wo sie hilft.',
        points: [
          'Einzelcoaching rund um echte Fälle aus ihrem Team, keine generischen Leadership-Folien.',
          'Einfache Frameworks für Feedback, 1:1s, Delegation und schwierige Gespräche, die sie am nächsten Tag anwenden können.',
          'Ein Coach an ihrer Seite bei den ersten harten Gesprächen, bis sie diese souverän allein führen.',
        ],
      },
      serviceLabel: 'Das Programm, das genau dafür gebaut ist:',
    },
    pay: {
      symptoms: [
        'Zwei Personen in derselben Rolle verdienen sehr unterschiedlich, und niemand kann erklären, warum.',
        'Jedes Angebot wird von Grund auf neu verhandelt, und der hartnäckigste Kandidat gewinnt.',
        'Gehaltserhöhungen werden entschieden, wenn jemand mit Kündigung droht.',
        'Sie sind nicht sicher, was die EU-Entgelttransparenzrichtlinie von Ihnen verlangen wird.',
      ],
      cost: 'Unerklärbares Gehalt zerstört Vertrauen schneller als niedriges Gehalt. Sobald Gehälter verglichen werden, und das werden sie immer, werden inkonsistente Angebote zu Groll, Gegenangeboten und Kündigungen.',
      fix: {
        title: 'Einfache Gehaltsbänder und Benefit-Regeln, die jeder erklären kann.',
        text: 'Wir bauen eine Vergütungsstruktur, die zu einem Unternehmen Ihrer Größe passt: klare Level, Gehaltsspannen pro Rolle, Benefit-Regeln und ein Prozess für Erhöhungen. Transparent genug für die Richtlinie, einfach genug, um wirklich genutzt zu werden.',
        points: [
          'Rollen-Level und Gehaltsbänder auf Basis Ihres Budgets und Ihres Marktes, an einem Ort dokumentiert.',
          'Ein Prozess für Erhöhungen und Beförderungen mit festen Zeitpunkten im Jahr, damit Gehalt keine Reaktion auf Drohungen mehr ist.',
          'Eine ehrliche Standortbestimmung zur EU-Entgelttransparenzrichtlinie, bei Bedarf vorbereitet mit Ihrer Rechtsberatung.',
        ],
      },
      serviceLabel: 'Strukturiert innerhalb von:',
    },
    hiring: {
      symptoms: [
        'Stellen bleiben monatelang offen, während das Team die Lücke auffängt.',
        'Interviews sind unstrukturiert, und jede Interviewerin sucht etwas anderes.',
        'Neue Mitarbeitende gehen, oder werden gegangen, innerhalb der ersten drei Monate.',
        'Sie stellen nach Lebenslauf ein und entdecken die Fehlpassung in Woche zwei.',
      ],
      cost: 'Eine Fehlbesetzung wird dreimal bezahlt: die Monate der Suche, die Monate der Einarbeitung und die Monate, in denen alles noch einmal gemacht wird. Währenddessen ist das Team, das die Lücke aufgefangen hat, erschöpft, und die Führungskraft hat das Vertrauen in den Prozess verloren.',
      fix: {
        title: 'Strukturiertes, schnelles Recruiting, dann eine Brücke über die ersten 90 Tage.',
        text: 'Wir führen Recruiting so, wie es die besten Tech-Unternehmen tun: eine klare Rollen-Scorecard, ein straffer Prozess, strukturierte Interviews und eine Entscheidung in Tagen, nicht Wochen. Danach bleiben wir die ersten drei Monate an Bord, damit die Einstellung nicht nur startet, sondern gelingt.',
        points: [
          'Eine Rollen-Scorecard und ein Interviewplan, vereinbart bevor der erste Lebenslauf geöffnet wird.',
          'Ein schneller, respektvoller Kandidatenprozess, der starke Leute nicht abspringen lässt.',
          'Check-ins an Tag 30, 60 und 90 mit neuer Fachkraft und Führungskraft, und eine klare Probezeitentscheidung.',
        ],
      },
      serviceLabel: 'Unser Recruiting-Motor, mit eingebauter Brücke:',
    },
    audit: {
      symptoms: [
        'Arbeitsverträge wurden vor Jahren aus einer Vorlage kopiert und nie aktualisiert.',
        'Richtlinien existieren als mündliche Absprachen, wenn überhaupt.',
        'Personalakten sind unvollständig, und Sie wüssten nicht, wo Sie suchen sollten.',
        'Bei den Worten „Arbeitsinspektion“ zieht sich Ihr Magen zusammen.',
      ],
      cost: 'Prüfungsangst kostet Sie doppelt: in Bußgeldern und Nachzahlungen, wenn eine Prüfung eine Lücke findet, und in den Stunden, die Ihr Team damit verliert, Unterlagen zu rekonstruieren, die längst bereit sein sollten.',
      fix: {
        title: 'Eine Compliance-Basis, über die Sie sich keine Sorgen mehr machen müssen.',
        text: 'Wir prüfen Ihre Verträge, Richtlinien und Akten, schließen die Lücken und richten einen einfachen Rhythmus ein, um alles aktuell zu halten. Wo Rechtsberatung nötig ist, arbeiten wir mit Ihrer Anwältin oder Ihrem Anwalt zusammen; wir ersetzen sie nicht.',
        points: [
          'Eine strukturierte Prüfung von Verträgen, Richtlinien, Akten und Pflichtdokumenten gegen die aktuellen Anforderungen.',
          'Eine priorisierte Lückenliste mit Lösungen, damit das Dringende zuerst erledigt wird.',
          'Ein jährlicher Check und ein Ort für alles, damit die nächste Prüfung Routine ist, keine Krise.',
        ],
      },
      serviceLabel: 'Abgedeckt innerhalb von:',
    },
    growth: {
      symptoms: [
        'Der Personalbestand hat sich verdoppelt, aber das Organigramm existiert nur in einem Kopf.',
        'Neue Leute wissen nicht, wer was entscheidet, also geht alles zu den Gründern.',
        'Eingestellt wird in der Reihenfolge, in der Anfragen kommen, nicht in der Reihenfolge, die das Geschäft braucht.',
        'Rituale, die bei zehn Leuten funktionierten, brechen bei dreißig still und leise.',
      ],
      cost: 'Wachstum ohne Struktur multipliziert Fehler. Jede neue Person kopiert die Verwirrung der letzten, Entscheidungen werden langsamer, weil mehr Leute auf die Gründer warten, und die Kultur, auf die Sie stolz waren, wird zu etwas, das niemand mehr beschreiben kann.',
      fix: {
        title: 'Eine People-Roadmap für die nächsten zwölf Monate.',
        text: 'Wir übersetzen Ihren Businessplan in einen People-Plan: welche Rollen, in welcher Reihenfolge, mit welcher Berichtslinie, und welche Rituale ein größeres Team zusammenhalten. Struktur, die Tempo unterstützt, statt es zu bremsen.',
        points: [
          'Ein Organisationsdesign für die nächste Stufe: Rollen, Level, Berichtslinien und Entscheidungsrechte.',
          'Eine Einstellungsreihenfolge, die an Ihre Ziele und Ihr Budget gekoppelt ist, damit Sie das einstellen, was das Geschäft als Nächstes braucht.',
          'Team-Rituale, die skalieren: Planung, 1:1s, Feedbackzyklen und All-Hands, die wirklich informieren.',
        ],
      },
      serviceLabel: 'Geplant und umgesetzt innerhalb von:',
    },
    terminations: {
      symptoms: [
        'Alle wissen, dass eine bestimmte Person nicht funktioniert, einschließlich dieser Person.',
        'Leistungsprobleme wurden nebenbei erwähnt, aber nie dokumentiert.',
        'Sie haben Angst, dass ein falscher Schritt in einer Klage endet.',
        'Der Rest des Teams verliert die Geduld, während Sie warten.',
      ],
      cost: 'Jede Woche Warten kostet Gehalt, Teammoral und Ihre Glaubwürdigkeit als Führungskraft. Die Stärksten merken zuerst, wenn Minderleistung keine Konsequenzen hat.',
      fix: {
        title: 'Ein fairer, dokumentierter Prozess und ein ruhiger Trennungsplan.',
        text: 'Wir setzen einen klaren Leistungsprozess auf: Erwartungen schriftlich, ehrliche Gespräche, eine definierte Verbesserungsphase und dokumentierte Ergebnisse. Wenn eine Trennung die richtige Entscheidung ist, bereiten wir sie mit Ihrer Rechtsberatung vor und helfen Ihnen, sie würdevoll umzusetzen.',
        points: [
          'Ein Prozess zur Leistungsverbesserung mit klaren Erwartungen, Zeitplänen und Dokumentation.',
          'Vorbereitung und Coaching für die Gespräche, damit sie direkt, fair und nicht persönlich sind.',
          'Ein Trennungsplan, vorbereitet mit Ihrer Anwältin oder Ihrem Anwalt: Timing, Kommunikation ans Team und eine respektvolle Übergabe.',
        ],
      },
      serviceLabel: 'Abgewickelt innerhalb von:',
    },
    leadership: {
      symptoms: [
        'Zwei Gründer geben dem Team in derselben Woche zwei verschiedene Prioritäten.',
        'Führungsmeetings enden ohne Entscheidungen, oder mit Entscheidungen, die wieder aufgemacht werden.',
        'Das Team erfährt von Strategieänderungen über den Flurfunk.',
        'Niemand ist sicher, wer bei Personalfragen das letzte Wort hat.',
      ],
      cost: 'Uneinigkeit an der Spitze ist im Sitzungsraum unsichtbar und im Team sehr sichtbar. Menschen hören auf, Initiative zu zeigen, wenn sich die Botschaft ständig ändert, Ihre besten Führungskräfte beginnen nach oben zu managen statt zu führen, und Einstellungen, Gehalt und Beförderungen werden politisch.',
      fix: {
        title: 'Eine Botschaft von oben und klare Regeln, wie Entscheidungen fallen.',
        text: 'Wir moderieren Leadership-Alignment-Sitzungen, in denen Gründer und Führungskräfte Prioritäten, Rollen und Entscheidungsregeln vereinbaren und schriftlich festhalten. Dann helfen wir Ihnen, diese Klarheit ins Team zu tragen.',
        points: [
          'Moderierte Alignment-Sitzungen zu Zielen, Rollen und dem, was „fertig“ für das Führungsteam bedeutet.',
          'Einfache Entscheidungsregeln für die wiederkehrenden People-Themen: wer entscheidet, wer wird konsultiert, wer informiert.',
          'Ein Kommunikationsrhythmus, damit das Team Entscheidungen einmal, klar und von oben hört.',
        ],
      },
      serviceLabel: 'Moderiert innerhalb von:',
    },
  },
};
