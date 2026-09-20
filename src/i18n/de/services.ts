import type { ServicesDict } from '../en/services';

export const services: ServicesDict = {
  meta: {
    title: 'Leistungen: Fraktionale HR, Recruiting, 90-Tage-Brücke und Manager-Coaching',
    description:
      'Vier Wege, mit NewLevelHR zu arbeiten: fraktionale HR-Partnerschaft, High-Velocity Hiring, die 90-Tage-Erfolgsbrücke und Manager-Coaching. Senior-HR-Unterstützung für Startups und KMU in Europa, als Retainer oder Projekt.',
  },
  hero: {
    eyebrow: 'Unsere Leistungen',
    title: 'Senior-HR-Unterstützung, passend zur Größe Ihres Unternehmens.',
    text: 'Fraktionale HR-Partnerschaft, High-Velocity Hiring, eine 90-Tage-Erfolgsbrücke und Manager-Coaching. Wählen Sie eine Leistung, kombinieren Sie sie oder starten Sie mit einem kostenlosen Gespräch, in dem wir Ihnen sagen, was Sie wirklich brauchen.',
    imageAlt: 'Ein Team feiert gemeinsam einen Meilenstein in einem hellen Büro',
  },
  cardsSection: {
    eyebrow: 'Vier Leistungen',
    title: 'Wählen Sie die Leistung, die zu Ihrer Situation passt.',
    text: 'Jede Leistung wird von einer Senior-Partnerin erbracht, die Ihr Team beim Namen kennt. Keine Dashboards, keine Bots, keine Ticket-Warteschlange.',
  },
  cards: [
    {
      key: 'fractional',
      summary: 'Die Alternative zur Festanstellung. Bedarfsgerechte Unterstützung, um Ihre Teamstruktur zu ordnen, Richtlinien umzusetzen und Ihre Mitarbeitenden auf Ihre Unternehmensziele auszurichten.',
      bullets: [
        'Struktur, Rollen und eine People-Roadmap für die nächsten 12 Monate',
        'Richtlinien, Verträge und Compliance, geprüft gemeinsam mit Ihrer Rechtsberatung',
        'Gehaltsbänder und faire Angebote, im Einklang mit der EU-Entgelttransparenzrichtlinie',
      ],
     
      image: 'one-on-one',
      imageAlt: 'HR-Partnerin im Vieraugengespräch mit einem Gründer',
    },
    {
      key: 'hiring',
      summary: 'Schluss mit „Einstellen und Hoffen“. Big-Tech-Recruiting-Tempo kombiniert mit einer 3-Monats-Erfolgsbrücke, damit Ihre neue Fachkraft nicht nur startet, sondern erfolgreich wird.',
      bullets: [
        'Rollen-Scorecard und klare Erwartungen vor dem ersten Interview',
        'Ein strukturierter, schneller Prozess, den Kandidatinnen und Kandidaten respektieren',
        'Die 90-Tage-Erfolgsbrücke ist bei jeder Einstellung inklusive',
      ],
     
      image: 'interview',
      imageAlt: 'Ein strukturiertes Vorstellungsgespräch zwischen Kandidatin und Hiring Manager',
    },
    {
      key: 'bridge',
      summary: 'Unsere Arbeit endet nicht mit der Vertragsunterschrift. Wir bleiben die ersten 3 Monate an Bord und coachen neue Fachkraft und Führungskraft, damit die Passung wirklich stimmt.',
      bullets: [
        'Tag 1: Erwartungen und Scorecard auf beiden Seiten vereinbart',
        'Tag 30 und 60: Feedbackschleifen und Kurskorrektur',
        'Tag 90: bestätigte Passung, Probezeitentscheidung, Entwicklungsplan',
      ],
     
      image: 'onboarding-welcome',
      imageAlt: 'Ein neues Teammitglied wird am ersten Tag willkommen geheißen',
    },
    {
      key: 'coaching',
      summary: 'Aus Experten werden Führungskräfte. Wir coachen Ihre Manager und geben ihnen Werkzeuge, um Konflikte zu lösen, Feedback zu geben und leistungsstarke Teams eigenständig zu führen.',
      bullets: [
        'Praktische Werkzeuge für Feedback, Delegation und schwierige Gespräche',
        'Ein Coach an ihrer Seite bei den ersten harten Entscheidungen',
        'Leadership-Alignment, damit das Team eine Botschaft hört',
      ],
     
      image: 'coaching-mentoring',
      imageAlt: 'Eine Führungskraft und ein Coach im Mentoring-Gespräch',
    },
  ],
  intro: {
    eyebrow: 'So arbeiten wir mit Ihnen',
    title: 'Eine Partnerin. Ihr Slack-Channel. Keine Ticket-Warteschlange.',
    text: 'Welche Leistung Sie auch wählen, die Arbeitsweise bleibt gleich: eine erfahrene Person, die Verantwortung übernimmt, schnell antwortet und Ihnen die Wahrheit sagt.',
    points: [
      {
        title: 'Retainer oder Projekt',
        body: 'Laufende Unterstützung mit festem monatlichem Umfang oder ein klar definiertes Projekt mit Anfang und Ende. Wir empfehlen die passende Variante, nicht die größere.',
      },
      {
        title: 'Die Partnerin in Ihrem Slack',
        body: 'Eine Person in Ihrem Channel, die die unbequemen Fragen beantwortet, Montag bis Freitag, 9-18 Uhr MEZ, auf Englisch, Deutsch oder Bulgarisch. Antwort innerhalb von 24 Stunden.',
      },
      {
        title: 'Zuerst ein kostenloses 30-Minuten-Gespräch',
        body: 'Vor jedem Angebot erhalten Sie eine kostenlose 30-minütige Beratung. Sie gehen mit einem klaren Bild davon heraus, was helfen würde, ob Sie mit uns arbeiten oder nicht.',
      },
    ],
    valuesTitle: 'Was jede Zusammenarbeit prägt',
    values: [
      { title: 'Geschwindigkeit statt Bürokratie', body: 'Recruiting sollte Tage dauern, nicht Monate.' },
      { title: 'Menschlichkeit statt Automatisierung', body: 'Sie brauchen kein weiteres KI-Dashboard, sondern eine Partnerin, die Ihre Herausforderungen versteht.' },
      { title: 'Strategische Präzision', body: 'Der Kopf einer Senior-Partnerin, ohne das Gehalt einer Führungskraft.' },
    ],
  },
  howToChoose: {
    eyebrow: 'Nicht sicher, wo Sie anfangen sollen?',
    title: 'Beginnen Sie beim Symptom, nicht bei der Leistung.',
    text: 'Die meisten Gründerinnen und Gründer kommen mit einer Situation zu uns, nicht mit einer Einkaufsliste. So lesen Sie die Karte am schnellsten.',
    optionLabel: 'Starten Sie mit',
    options: [
      { when: 'Sie machen HR selbst, irgendwo zwischen Produkt und Vertrieb, und man merkt es.', service: 'fractional' },
      { when: 'Eine Schlüsselposition ist seit Wochen offen, oder Ihre letzte Einstellung hat nach wenigen Monaten gekündigt.', service: 'hiring' },
      { when: 'Sie haben bereits jemanden eingestellt und wollen, dass die ersten 90 Tage gelingen.', service: 'bridge' },
      { when: 'Ihre besten Entwickler wurden Führungskräfte, und niemand hat sie darauf vorbereitet.', service: 'coaching' },
    ],
    callTitle: 'In 30 Minuten gemeinsam durchgehen',
    callText: 'Die kostenlose Beratung ist der schnellste Weg herauszufinden, welche Leistung passt. Kein Pitch, kein Druck.',
    callButton: 'Kostenloses Gespräch buchen',
    checkTitle: 'Oder machen Sie den HR Health Check',
    checkText: 'Eine kurze Selbsteinschätzung auf der Startseite, die zeigt, wo Ihr People-Setup solide ist und wo es Lücken hat.',
    checkButton: 'Zum Health Check',
  },
  labels: {
    bookCall: 'Kostenloses Gespräch buchen',
    askQuestion: 'Frage stellen',
    allServices: 'Alle Leistungen',
    exploreService: 'Leistung entdecken',
    includesEyebrow: 'Umfang',
    processEyebrow: 'Der Ablauf',
    forWhomEyebrow: 'Passt das?',
    yesTitle: 'Das ist etwas für Sie, wenn …',
    deliverablesEyebrow: 'Ergebnisse',
    deliverablesImageAlt: 'Planungssitzung an einem Whiteboard',
    faqEyebrow: 'FAQ',
    relatedEyebrow: 'Passend dazu',
    relatedTitle: 'Leistungen, die sich damit kombinieren lassen',
    relatedText: 'Eine Partnerin, vier Formen der Zusammenarbeit. Diese gehen meist Hand in Hand.',
    stepLabel: 'Schritt {n}',
  },
  pages: {
    fractional: {
      meta: {
        title: 'Fraktionale HR-Partnerschaft: Senior-HR ohne Festanstellung',
        description:
          'Bedarfsgerechte Senior-HR-Unterstützung für Startups und KMU: Teamstruktur, Richtlinien, Gehaltsbänder, Compliance gemeinsam mit Ihrer Rechtsberatung und Leadership-Alignment. Als Retainer oder Projekt, auf EN, DE und BG.',
      },
      serviceType: 'Fraktionale HR-Partnerschaft',
      hero: {
        eyebrow: 'Fraktionale HR-Partnerschaft',
        title: 'Senior-HR auf Abruf. Die Alternative zur Festanstellung.',
        sub: 'Bedarfsgerechte Unterstützung, um Ihre Teamstruktur zu ordnen, Richtlinien umzusetzen und Ihre Mitarbeitenden auf Ihre Unternehmensziele auszurichten. Sie bekommen den Kopf einer Senior-Partnerin in Ihrem Slack-Channel, ohne das Gehalt einer Führungskraft.',
        image: 'one-on-one',
        imageAlt: 'Gründer und HR-Partnerin klären eine Personalfrage im Vieraugengespräch',
       
      },
      problem: {
        eyebrow: 'Die Situation',
        title: 'HR passiert Ihnen, statt für Sie zu arbeiten.',
        text: 'Irgendwo zwischen zehn und hundert Mitarbeitenden hört das Thema Menschen auf, eine Nebenaufgabe zu sein. Gründerinnen und Gründer werden zur unfreiwilligen Personalabteilung, und die Lücken beginnen, echtes Geld zu kosten.',
        points: [
          'Mitarbeiterfragen, Papierkram und Streitigkeiten fressen die Stunden, die für Produkt und Kunden gedacht waren.',
          'Gehälter und Benefits werden von Angebot zu Angebot entschieden, sodass keine zwei Personen nach derselben Logik bezahlt werden.',
          'Verträge und Richtlinien wurden einmal geschrieben und nie aktualisiert; eine Prüfung wäre eine unangenehme Überraschung.',
          'Der Personalbestand wächst schneller als die Struktur, und das Führungsteam sendet widersprüchliche Signale.',
        ],
      },
      solution: {
        eyebrow: 'Die Partnerschaft',
        title: 'Eine Senior-Partnerin, die Ihnen die People-Arbeit vom Schreibtisch nimmt.',
        text: 'Wir arbeiten als Ihre HR-Leitung für einen definierten Teil der Woche: Strategie, wo Sie sie brauchen, operative Umsetzung, wo Ihnen die Zeit fehlt. Compliance-Unterstützung ist HR-Beratung, die gemeinsam mit Ihrer Rechtsberatung erbracht wird, niemals Rechtsberatung.',
        points: [
          'Struktur zuerst: Rollen, Berichtslinien und eine People-Roadmap für 12 Monate.',
          'Richtlinien, Verträge und Personalakten geprüft, geschlossen und gemeinsam mit Ihrer Anwältin oder Ihrem Anwalt aktuell gehalten.',
          'Einfache Gehaltsbänder und Benefit-Regeln im Einklang mit der EU-Entgelttransparenzrichtlinie.',
          'Schwierige Gespräche, Leistungsfälle und Trennungen vorbereitet und, wo sinnvoll, gemeinsam mit Ihnen geführt.',
        ],
      },
      includes: {
        title: 'Was enthalten ist',
        text: 'Der Umfang wird im ersten Monat gemeinsam festgelegt und angepasst, wenn sich das Unternehmen verändert.',
        items: [
          { title: 'Teamstruktur & Rollen', body: 'Klare Rollenbeschreibungen, Berichtslinien und eine Einstellungsreihenfolge für die nächsten 12 Monate, damit Wachstum einem Plan folgt statt einer Panik.' },
          { title: 'Richtlinien & Mitarbeiterhandbuch', body: 'Arbeitszeit, Remote-Arbeit, Urlaub, Ausstattung, Verhalten: in klarer Sprache geschrieben, in den Sprachen, die Ihr Team tatsächlich spricht.' },
          { title: 'Verträge & Compliance-Prüfung', body: 'Arbeitsverträge, Zusatzvereinbarungen und Personalakten auf Lücken geprüft und aktuell gehalten, in Abstimmung mit Ihrer Rechtsberatung.' },
          { title: 'Gehaltsbänder & Benefits', body: 'Eine einfache Gehaltsstruktur und Benefit-Regeln, die jedes Angebot erklärbar machen und die EU-Entgelttransparenzrichtlinie unterstützen.' },
          { title: 'Leistung & schwierige Gespräche', body: 'Ein dokumentierter Leistungsprozess, Feedback-Vorlagen und ein ruhiger Trennungsplan, damit niemand monatelang mit dem Handeln wartet.' },
          { title: 'Leadership-Alignment', body: 'Arbeitssitzungen mit Gründern und Führungskräften, damit Entscheidungen einmal getroffen werden und das Team eine Botschaft hört.' },
          { title: 'Mitarbeiterthemen & Mediation', body: 'Konflikte, Beschwerden und sensible Fälle mit einer neutralen, erfahrenen Partnerin am Tisch.' },
          { title: 'Beratung auf Abruf', body: 'Eine Person in Ihrem Slack für Fragen, die nicht warten können: Montag bis Freitag, 9-18 Uhr MEZ, Antwort innerhalb von 24 Stunden.' },
        ],
      },
      process: {
        title: 'So startet die Partnerschaft',
        text: 'Vom ersten Gespräch zu einem laufenden Rhythmus in wenigen Wochen, nicht in wenigen Quartalen.',
        steps: [
          { tag: 'Kostenloses Gespräch', title: 'Diagnose', body: 'Ein 30-minütiges Gespräch darüber, wo das People-Setup am meisten schmerzt. Sie gehen mit einem klaren Bild heraus, ob wir zusammenarbeiten oder nicht.' },
          { tag: 'Woche 1', title: 'Audit', body: 'Wir prüfen Verträge, Richtlinien, Gehaltslogik und Organigramm, sprechen mit dem Führungsteam und listen die Lücken nach Risiko und Aufwand.' },
          { tag: 'Woche 2-4', title: 'Das Dringende schließen', body: 'Punkte, die jetzt rechtliches oder personelles Risiko erzeugen, werden zuerst geschlossen, bei Bedarf gemeinsam mit Ihrer Rechtsberatung.' },
          { tag: 'Ab Monat 2', title: 'Das System aufbauen', body: 'Struktur, Richtlinien, Gehaltsbänder und Rituale gehen nacheinander live, jedes erklärt den Menschen, die damit arbeiten werden.' },
          { tag: 'Laufend', title: 'Gemeinsam betreiben', body: 'Ein fester Wochenrhythmus, eine Partnerin in Ihrem Slack und ein monatlicher Blick darauf, was das Unternehmen als Nächstes braucht.' },
        ],
      },
      forWhom: {
        title: 'Passt das zu Ihnen?',
        yes: [
          'Sie führen ein Startup oder KMU mit etwa zehn bis hundertfünfzig Mitarbeitenden und haben keine erfahrene HR-Person im Team.',
          'Sie wollen Struktur und Richtlinien, die standhalten, ohne eine HR-Leitung einzustellen, die Sie noch nicht auslasten können.',
          'Sie sind bereit, Entscheidungen zu Gehalt, Rollen und Leistung zu treffen, statt sie aufzuschieben.',
          'Sie wollen eine verantwortliche Partnerin statt eines Tools, einer Plattform oder eines wechselnden Agenturteams.',
        ],
        noTitle: 'Nichts für Sie, wenn …',
        no: [
          'Sie Lohnabrechnung, Steuererklärungen oder Rechtsberatung brauchen; wir arbeiten mit diesen Anbietern zusammen, wir ersetzen sie nicht.',
          'Sie eine HR-Präsenz in Vollzeit vor Ort an jedem Tag der Woche suchen.',
          'Sie eine HR-Software-Lizenz wollen statt einer Person, die Verantwortung übernimmt.',
        ],
      },
      deliverables: {
        title: 'Was Sie mitnehmen',
        text: 'Konkrete Dokumente und funktionierende Systeme, keine Folienpräsentation.',
        items: [
          'Ein People-Audit mit Lücken, priorisiert nach Risiko und Aufwand',
          'Eine 12-Monats-People-Roadmap: Rollen, Einstellungsreihenfolge, Struktur',
          'Mitarbeiterhandbuch und Kernrichtlinien in Ihren Arbeitssprachen',
          'Geprüfte Vertragsvorlagen und eine saubere Struktur für Personalakten',
          'Gehaltsbänder und Benefit-Regeln mit einer schriftlichen Angebotslogik',
          'Leistungsprozess, Feedback-Vorlagen und Trennungs-Checkliste',
          'Ein Wochenrhythmus und ein monatlicher Review mit dem Führungsteam',
        ],
      },
      faq: {
        title: 'Fragen zur Partnerschaft',
        items: [
          { q: 'Wie viel Ihrer Zeit bekommen wir?', a: 'Das hängt vom Umfang ab, den wir im ersten Monat vereinbaren. Die meisten Partnerschaften laufen als monatlicher Retainer mit einer festen Anzahl von Tagen; Projekte wie eine Überarbeitung der Richtlinien oder das Design von Gehaltsbändern haben einen definierten Anfang und ein Ende. Wir empfehlen die kleinere Variante, wenn sie ausreicht.' },
          { q: 'Ist das Rechtsberatung?', a: 'Nein. Compliance-Unterstützung ist HR-Beratung: Wir wissen, wo die Lücken üblicherweise sind, bereiten Dokumente und Prozesse vor und arbeiten für alles, was eine Anwältin oder einen Anwalt braucht, mit Ihrer Rechtsberatung zusammen. Wir bieten keine Rechtsberatung, Lohnabrechnung oder Steuererklärungen an.' },
          { q: 'Können Sie mit unserer bestehenden HR-Person oder Office-Managerin zusammenarbeiten?', a: 'Ja, und das funktioniert meist sehr gut. Wir übernehmen die strategischen und sensiblen Senior-Themen; Ihre interne Person behält die tägliche Administration und wächst mit einer Senior-Partnerin im Rücken.' },
          { q: 'Welche Länder und Sprachen decken Sie ab?', a: 'Wir arbeiten mit Teams in ganz Europa, vor allem in Bulgarien und im deutschsprachigen Raum, auf Englisch, Deutsch und Bulgarisch. Dokumente, Sitzungen und Mitarbeitergespräche können in jeder der drei Sprachen stattfinden.' },
          { q: 'Wie schnell können wir starten?', a: 'Das kostenlose Gespräch ist meist innerhalb weniger Tage möglich, und das Audit beginnt, sobald der Umfang vereinbart ist. Es gibt keine Kündigungsfrist, keinen Recruiting-Prozess und keine Ausstattung, auf die Sie warten müssten.' },
          { q: 'Was, wenn sich unser Bedarf ändert?', a: 'Das wird er. Der Umfang wird monatlich überprüft und kann wachsen, schrumpfen oder von Retainer auf Projekt wechseln. Ein fraktionales Setup ist dafür gebaut, mit dem Unternehmen zu skalieren, nicht gegen es.' },
        ],
      },
      cta: {
        title: 'Sehen Sie, was eine fraktionale Partnerin bei Ihnen verändern würde.',
        text: 'Buchen Sie ein kostenloses 30-Minuten-Gespräch. Wir schauen uns Ihr Setup an und sagen Ihnen ehrlich, ob eine Partnerschaft sinnvoll ist.',
        button: 'Kostenloses Gespräch buchen',
      },
      related: ['hiring', 'coaching', 'bridge'],
    },
    hiring: {
      meta: {
        title: 'High-Velocity Hiring: schnelles, strukturiertes Recruiting mit 90-Tage-Brücke',
        description:
          'Schluss mit „Einstellen und Hoffen“. Strukturiertes Recruiting im Big-Tech-Tempo für Startups und KMU, mit klaren Erwartungen, einer Rollen-Scorecard und der 90-Tage-Erfolgsbrücke bei jeder Einstellung.',
      },
      serviceType: 'Recruiting und Einstellung',
      hero: {
        eyebrow: 'High-Velocity Hiring',
        title: 'Schluss mit „Einstellen und Hoffen“.',
        sub: 'Big-Tech-Recruiting-Tempo kombiniert mit einer 3-Monats-Erfolgsbrücke, damit Ihre neue Fachkraft nicht nur startet, sondern erfolgreich wird. Klare Erwartungen vor dem ersten Interview, ein Prozess, den Kandidatinnen und Kandidaten respektieren, und eine Partnerin, die nach der Unterschrift bleibt.',
        image: 'interview',
        imageAlt: 'Ein strukturiertes Vorstellungsgespräch zwischen Kandidatin und Hiring Manager',
       
      },
      problem: {
        eyebrow: 'Die Situation',
        title: 'Einstellen nach Bauchgefühl kostet doppelt: einmal bei der Einstellung, noch einmal bei der Kündigung.',
        text: 'Eine Stelle bleibt monatelang offen, dann wird jemand eingestellt, weil der Kalender mehr schmerzt als die Zweifel. Drei Monate später ist die Person weg, und die Einarbeitung beginnt von vorn.',
        points: [
          'Keine schriftliche Scorecard, also misst jede Interviewerin etwas anderes.',
          'Langsame, unstrukturierte Prozesse verlieren die stärksten Kandidaten an schnellere Unternehmen.',
          'Angebote werden improvisiert, was Verhandlungen unberechenbar und unfair macht.',
          'Nach der Unterschrift ist niemand für die ersten 90 Tage verantwortlich; die Passung bleibt dem Zufall überlassen.',
        ],
      },
      solution: {
        eyebrow: 'Der Motor',
        title: 'Ein Recruiting-Prozess für Tempo, und eine Brücke für Bindung.',
        text: 'Wir führen die Suche so, wie es starke Tech-Unternehmen tun: eine klare Scorecard, ein schlanker Interview-Ablauf, schnelle Entscheidungen und eine Candidate Experience, die für Ihr Unternehmen wirbt. Danach bleiben wir 90 Tage.',
        points: [
          'Rollen-Scorecard und Erfolgskriterien mit dem Hiring Manager vereinbart, bevor die Suche beginnt.',
          'Strukturierte Interviews mit definierten Fragen, damit Entscheidungen vergleichbar und schnell sind.',
          'Angebote auf Basis Ihrer Gehaltsbänder, klar erklärt, ohne Drama abgeschlossen.',
          'Die 90-Tage-Erfolgsbrücke für jede Einstellung: Coaching für die neue Fachkraft und die Führungskraft.',
        ],
      },
      includes: {
        title: 'Was enthalten ist',
        text: 'Vom ersten Briefing bis zur bestätigten Probezeitentscheidung.',
        items: [
          { title: 'Rollen-Scorecard', body: 'Was die Rolle im ersten Jahr erreichen muss, welche Fähigkeiten essenziell und welche wünschenswert sind, schriftlich mit dem Hiring Manager vereinbart.' },
          { title: 'Sourcing & Ansprache', body: 'Aktive Suche und persönliche Ansprache auf EN, DE oder BG, plus eine Stellenbeschreibung, die Kandidatinnen und Kandidaten wirklich lesen wollen.' },
          { title: 'Strukturierter Interview-Ablauf', body: 'Eine schlanke Abfolge von Interviews mit definierten Fragen, Bewertung und einer schnellen Feedback-Regel für jede Interviewerin.' },
          { title: 'Candidate Experience', body: 'Klare Kommunikation, schnelle Antworten und ehrliche Zeitpläne; die stärksten Kandidaten erinnern sich daran, wie sie behandelt wurden.' },
          { title: 'Angebot & Verhandlung', body: 'Ein Angebot auf Basis Ihrer Gehaltslogik, so präsentiert und verhandelt, dass beide Seiten mit Vertrauen starten.' },
          { title: 'Coaching für den Hiring Manager', body: 'Interview-Training und Entscheidungsunterstützung für die Führungskraft, damit der Prozess auch nach uns gut läuft.' },
          { title: '90-Tage-Erfolgsbrücke', body: 'Erwartungen an Tag 1, Check-ins an Tag 30 und 60 und eine klare Probezeitentscheidung an Tag 90, mit Coaching für beide Seiten.' },
        ],
      },
      process: {
        title: 'So läuft eine Suche',
        text: 'Tage und Wochen, nicht Quartale. Der genaue Zeitplan hängt von Rolle und Markt ab, und wir sagen Ihnen vorab, was realistisch ist.',
        steps: [
          { tag: 'Kick-off', title: 'Scorecard & Plan', body: 'Wir definieren Rolle, Must-haves, Interview-Ablauf und Entscheidungsregel mit dem Hiring Manager in einer Arbeitssitzung.' },
          { tag: 'Sourcing', title: 'Finden & ansprechen', body: 'Aktive Suche, persönliche Ansprache und eine erste Shortlist, die wir gemeinsam durchgehen, mit ehrlichem Feedback zum Markt.' },
          { tag: 'Interviews', title: 'Strukturierter Ablauf', body: 'Eine schlanke Interview-Sequenz mit definierten Fragen und Feedback am selben Tag, damit niemand im Ungewissen wartet.' },
          { tag: 'Angebot', title: 'Entscheiden & abschließen', body: 'Eine klare Entscheidung, ein Angebot auf Basis Ihrer Gehaltsbänder und eine Verhandlung, nach der sich beide Seiten auf Tag eins freuen.' },
          { tag: 'Tag 1-90', title: 'Erfolgsbrücke', body: 'Wir bleiben an Bord: Erwartungen an Tag 1, Feedbackschleifen an Tag 30 und 60, bestätigte Passung an Tag 90.' },
        ],
      },
      forWhom: {
        title: 'Passt das zu Ihnen?',
        yes: [
          'Sie besetzen Rollen, bei denen eine Fehlentscheidung wehtut: Entwickler, Leads, erste Vertriebs- oder Operations-Positionen.',
          'Sie wollen einen strukturierten Prozess, keinen Stapel Lebensläufe, den eine Agentur weiterleitet.',
          'Sie können sich zu schnellem Feedback und schnellen Entscheidungen auf Ihrer Seite verpflichten.',
          'Sie wollen, dass die Person nach Tag eins erfolgreich ist, nicht nur unterschreibt.',
        ],
        noTitle: 'Nichts für Sie, wenn …',
        no: [
          'Sie in kurzer Zeit Dutzende identische Stellen besetzen müssen.',
          'Sie die günstigstmögliche Vermittlungsgebühr suchen und nach der Unterschrift nichts mehr erwarten.',
          'Niemand in Ihrem Unternehmen Zeit für Interviews und Entscheidungen hat; ein Prozess kann keinen Hiring Manager ersetzen.',
        ],
      },
      deliverables: {
        title: 'Was Sie mitnehmen',
        text: 'Eine Einstellung, die gelingt, und einen Prozess, den Sie behalten.',
        items: [
          'Eine schriftliche Rollen-Scorecard mit Erfolgskriterien',
          'Eine Stellenbeschreibung und Ansprache-Nachrichten in Ihren Arbeitssprachen',
          'Ein strukturiertes Interview-Kit mit Fragen und Bewertung',
          'Eine geprüfte Shortlist mit Kandidatenprofilen und Empfehlungen',
          'Eine Angebotslogik und ein Verhandlungsplan auf Basis Ihrer Gehaltsbänder',
          'Ein 90-Tage-Plan mit Check-ins an Tag 1, 30, 60 und 90',
          'Ein Hiring Manager, der die nächste Suche mit weniger Hilfe führen kann',
        ],
      },
      faq: {
        title: 'Fragen zum Recruiting mit uns',
        items: [
          { q: 'Wie schnell ist „High Velocity“?', a: 'Schnell genug, dass starke Kandidatinnen und Kandidaten nicht das Interesse verlieren: ein schlanker Interview-Ablauf, Feedback innerhalb eines Tages und Entscheidungen innerhalb von Tagen. Der gesamte Zeitplan hängt von Rolle und Markt ab, und wir sagen Ihnen vorab, was realistisch ist, statt eine Zahl zu versprechen.' },
          { q: 'Ersetzen Sie unseren Recruiter oder unsere Agentur?', a: 'Das können wir, oder wir arbeiten mit ihnen zusammen. Der Unterschied ist Verantwortung: Wir bauen die Scorecard, führen den Prozess, coachen den Hiring Manager und bleiben die ersten 90 Tage.' },
          { q: 'Für welche Rollen rekrutieren Sie?', a: 'Vor allem Tech-, Produkt-, Operations- und Führungsrollen in Startups und KMU in ganz Europa, auf Englisch, Deutsch und Bulgarisch. Wenn eine Rolle außerhalb dessen liegt, was wir gut können, sagen wir das im kostenlosen Gespräch.' },
          { q: 'Ist die 90-Tage-Erfolgsbrücke wirklich inklusive?', a: 'Ja, bei jeder Einstellung, die wir durchführen. Sie ist außerdem als eigenständige Leistung für Personen verfügbar, die Sie selbst eingestellt haben.' },
          { q: 'Wie rechnen Sie ab?', a: 'Pro Suche oder als Teil eines fraktionalen HR-Retainers. Modell und Umfang werden vor dem Start vereinbart, ohne versteckte Gebühren.' },
          { q: 'Was passiert, wenn die Einstellung nicht funktioniert?', a: 'Die Brücke existiert, damit das an Tag 30 oder 60 auffällt, nicht nach der Probezeit. Wird die Passung an Tag 90 nicht bestätigt, erhalten Sie eine klare Empfehlung und einen Plan für den nächsten Schritt, bei Bedarf vorbereitet mit Ihrer Rechtsberatung.' },
        ],
      },
      cta: {
        title: 'Besetzen Sie die Stelle, und halten Sie sie besetzt.',
        text: 'Erzählen Sie uns in einem kostenlosen 30-Minuten-Gespräch von der Position. Sie bekommen eine ehrliche Einschätzung des Marktes und einen Plan für die Suche.',
        button: 'Kostenloses Gespräch buchen',
      },
      related: ['bridge', 'fractional', 'coaching'],
    },
    bridge: {
      meta: {
        title: '90-Tage-Erfolgsbrücke: Onboarding-Begleitung für neue Fachkräfte und Führungskräfte',
        description:
          'Unsere Arbeit endet nicht mit der Vertragsunterschrift. Wir coachen neue Fachkraft und Führungskraft durch die ersten 90 Tage: klare Erwartungen an Tag 1, Feedbackschleifen an Tag 30 und 60, bestätigte Passung an Tag 90. Bei unserem Recruiting inklusive, auch eigenständig buchbar.',
      },
      serviceType: 'Onboarding- und Probezeit-Coaching',
      hero: {
        eyebrow: '90-Tage-Erfolgsbrücke',
        title: 'Unsere Arbeit endet nicht mit der Vertragsunterschrift.',
        sub: 'Wir bleiben die ersten 3 Monate an Bord und coachen neue Fachkraft und Führungskraft, damit die Passung wirklich stimmt. Klare Erwartungen an Tag 1, Feedbackschleifen an Tag 30 und 60, eine bestätigte Entscheidung an Tag 90.',
        image: 'onboarding-welcome',
        imageAlt: 'Ein neues Teammitglied wird am ersten Tag willkommen geheißen',
       
      },
      problem: {
        eyebrow: 'Die Situation',
        title: 'Die ersten Wochen entscheiden, ob die Einstellung gelungen ist. Niemand schaut hin.',
        text: 'Die meisten frühen Kündigungen sind lange vor dem Ende der Probezeit entschieden: unklare Erwartungen, eine Führungskraft ohne Zeit, kleine Reibungen, die niemand anspricht. Wenn es sich in einer Kündigung zeigt, ist die Einarbeitung verloren.',
        points: [
          'Die neue Fachkraft hat einen Laptop und einen Slack-Zugang, aber keine klare Definition von Erfolg.',
          'Die Führungskraft ist beschäftigt und nimmt an, dass Schweigen bedeutet, alles sei in Ordnung.',
          'Frühe Reibung bleibt unausgesprochen, bis sie eine Entscheidung ist statt ein Gespräch.',
          'Die Probezeit endet stillschweigend, ohne echte Bewertung und ohne Entwicklungsplan.',
        ],
      },
      solution: {
        eyebrow: 'Die Brücke',
        title: 'Eine Partnerin auf beiden Seiten des Tisches, 90 Tage lang.',
        text: 'Wir coachen neue Fachkraft und Führungskraft parallel, mit einer Scorecard, einem festen Check-in-Rhythmus und ehrlichen Feedbackschleifen. Das Ziel ist eine bestätigte Passung oder eine klare, frühe Entscheidung, nie eine Überraschung.',
        points: [
          'Tag 1: Erwartungen, Scorecard und Ziele für den ersten Monat von beiden Seiten vereinbart.',
          'Tag 30: erste strukturierte Feedbackschleife; Reibung wird angesprochen, solange sie klein ist.',
          'Tag 60: Kurskorrektur bei Aufgabenumfang, Unterstützung oder Arbeitsweise, wo nötig.',
          'Tag 90: Probezeitgespräch mit klarer Entscheidung und Entwicklungsplan.',
        ],
      },
      includes: {
        title: 'Was enthalten ist',
        text: 'Bei jeder Einstellung, die wir durchführen, inklusive. Auch eigenständig buchbar für Personen, die Sie selbst eingestellt haben.',
        items: [
          { title: 'Erwartungs-Kit für Tag 1', body: 'Eine Rollen-Scorecard, Ziele für den ersten Monat und ein Check-in-Rhythmus, vor oder am ersten Tag mit der neuen Fachkraft und der Führungskraft vereinbart.' },
          { title: 'Onboarding-Plan', body: 'Wen die neue Fachkraft trifft, was sie lernt und was sie in den Wochen eins bis vier liefert, schriftlich festgehalten und geteilt.' },
          { title: 'Coaching für die neue Fachkraft', body: 'Vertrauliche 1:1-Sitzungen zu Erwartungen, Prioritäten und den ungeschriebenen Regeln des Unternehmens.' },
          { title: 'Coaching für die Führungskraft', body: 'Kurze Sitzungen dazu, wie man Ziele setzt, früh Feedback gibt und Signale liest, bevor sie zu Problemen werden.' },
          { title: 'Feedbackschleifen an Tag 30 und 60', body: 'Strukturierte Gespräche mit beiden Seiten, eine schriftliche Zusammenfassung und vereinbarte Anpassungen.' },
          { title: 'Probezeitgespräch an Tag 90', body: 'Eine klare, dokumentierte Entscheidung auf Basis der Scorecard, mit einem Entwicklungsplan für die bestätigte Fachkraft.' },
          { title: 'Dokumentation', body: 'Jeder Check-in hinterlässt ein kurzes schriftliches Protokoll, nützlich für den Entwicklungsplan und, falls nötig, für eine faire Probezeitentscheidung, vorbereitet mit Ihrer Rechtsberatung.' },
        ],
      },
      process: {
        title: 'Die vier Meilensteine',
        text: 'Feste Punkte im Kalender, damit nichts dem Zufall überlassen bleibt.',
        steps: [
          { tag: 'Tag 1', title: 'Klare Erwartungen', body: 'Rollen-Scorecard, Ziele für den ersten Monat und ein Check-in-Rhythmus, mit neuer Fachkraft und Führungskraft vereinbart, bevor der Laptop ankommt.' },
          { tag: 'Tag 30', title: 'Erste Feedbackschleife', body: 'Strukturiertes 1:1 mit der Fachkraft und der Führungskraft. Frühe Reibung wird benannt und behoben, solange sie klein ist.' },
          { tag: 'Tag 60', title: 'Kurskorrektur', body: 'Leistung gemessen an der Scorecard, Coaching zu den Lücken und Anpassungen bei Umfang oder Unterstützung, wo nötig.' },
          { tag: 'Tag 90', title: 'Bestätigte Passung', body: 'Probezeitgespräch mit klarer Entscheidung, einem Entwicklungsplan und einer Führungskraft, die den Prozess jetzt allein führt.' },
        ],
      },
      forWhom: {
        title: 'Passt das zu Ihnen?',
        yes: [
          'Sie haben gerade jemanden eingestellt oder stehen kurz davor, dessen Erfolg zählt: einen Lead, eine Senior-Entwicklerin, die erste Person in einer neuen Funktion.',
          'Sie wollen, dass die Führungskraft den Prozess lernt, nicht nur auslagert.',
          'Sie bevorzugen eine frühe, ehrliche Entscheidung gegenüber einer Probezeit, die stillschweigend endet.',
          'Sie haben die Person selbst eingestellt und wollen dieselbe Brücke, die unsere Recruiting-Kunden bekommen.',
        ],
        noTitle: 'Nichts für Sie, wenn …',
        no: [
          'Sie wollen, dass wir den Job der Führungskraft übernehmen; wir coachen, die Führungskraft führt.',
          'Sie eine Software-Onboarding-Checkliste suchen statt einer Person.',
          'Die Probezeitentscheidung bereits gefallen ist und Sie ein rechtliches Verfahren brauchen; das gehört zu Ihrer Rechtsberatung.',
        ],
      },
      deliverables: {
        title: 'Was Sie mitnehmen',
        text: 'Eine bestätigte Einstellung, eine geschulte Führungskraft und eine Dokumentation, hinter der Sie stehen können.',
        items: [
          'Eine Rollen-Scorecard und Ziele für den ersten Monat, von beiden Seiten abgenommen',
          'Ein schriftlicher Onboarding-Plan für die Wochen eins bis vier',
          'Check-in-Zusammenfassungen von Tag 30 und Tag 60 mit vereinbarten Anpassungen',
          'Ein dokumentiertes Probezeitgespräch mit Entscheidung an Tag 90',
          'Ein Entwicklungsplan für die bestätigte Fachkraft',
          'Eine Führungskraft, die das nächste Onboarding allein führen kann',
        ],
      },
      faq: {
        title: 'Fragen zur Brücke',
        items: [
          { q: 'Ist die Brücke in Ihrem Recruiting enthalten?', a: 'Ja. Jede Einstellung, die wir über High-Velocity Hiring durchführen, enthält die 90-Tage-Erfolgsbrücke. Sie ist außerdem eigenständig buchbar für Personen, die Sie selbst eingestellt haben.' },
          { q: 'Können wir starten, wenn die Person bereits angefangen hat?', a: 'Ja, solange genug Probezeit übrig ist, um mindestens die Schleifen an Tag 30 und Tag 60 durchzuführen. Je früher wir beginnen, desto nützlicher ist die Brücke.' },
          { q: 'Mit wem sprechen Sie, mit der Fachkraft oder mit der Führungskraft?', a: 'Mit beiden, getrennt und gemeinsam. Nur die neue Fachkraft zu coachen löst die Hälfte des Problems; an den meisten frühen Kündigungen ist die Führungskraft genauso beteiligt wie die Mitarbeiterin oder der Mitarbeiter.' },
          { q: 'Was, wenn klar wird, dass die Passung nicht stimmt?', a: 'Dann hören Sie es an Tag 30 oder 60, nicht am Ende der Probezeit. Sie erhalten eine ehrliche Empfehlung und, falls nötig, einen ruhigen Trennungsplan, vorbereitet mit Ihrer Rechtsberatung.' },
          { q: 'Funktioniert das auch remote?', a: 'Ja. Die meisten Check-ins laufen als Videocalls, und die Dokumente liegen dort, wo Ihr Team ohnehin arbeitet. Sitzungen vor Ort sind möglich, wo sie helfen.' },
        ],
      },
      cta: {
        title: 'Geben Sie Ihrer nächsten Einstellung eine Brücke statt einer Klippe.',
        text: 'Erzählen Sie uns, wer wann anfängt. In einem kostenlosen 30-Minuten-Gespräch skizzieren wir die ersten 90 Tage gemeinsam.',
        button: 'Kostenloses Gespräch buchen',
      },
      related: ['hiring', 'coaching', 'fractional'],
    },
    coaching: {
      meta: {
        title: 'Manager-Coaching: aus Experten werden Führungskräfte',
        description:
          'Coaching für neue und erfahrene Führungskräfte in Startups und KMU: praktische Werkzeuge für Feedback, Konflikte, Delegation und Leadership-Alignment, mit einem Coach an ihrer Seite bei den ersten schwierigen Gesprächen.',
      },
      serviceType: 'Leadership- und Manager-Coaching',
      hero: {
        eyebrow: 'Manager-Coaching',
        title: 'Aus Experten werden Führungskräfte.',
        sub: 'Wir coachen Ihre Manager und geben ihnen Werkzeuge, um Konflikte zu lösen, Feedback zu geben und leistungsstarke Teams eigenständig zu führen. Für den Entwickler, der letztes Quartal Lead geworden ist, und für das Führungsteam, das mit einer Stimme sprechen muss.',
        image: 'coaching-mentoring',
        imageAlt: 'Eine Führungskraft und ein Coach im Mentoring-Gespräch',
       
      },
      problem: {
        eyebrow: 'Die Situation',
        title: 'Ihr bester Experte wurde befördert. Niemand hat ihm den Job beigebracht.',
        text: 'Fachliche Exzellenz bringt die Beförderung; Menschen zu führen ist ein anderes Handwerk. Ohne Unterstützung weichen neue Führungskräfte Feedback aus, schlucken Konflikte und brennen aus, und das Team zahlt dafür.',
        points: [
          'Feedbackgespräche werden aufgeschoben, bis sie zu Leistungsproblemen werden.',
          'Konflikte im Team werden „gemanagt“, indem man hofft, dass sie verschwinden.',
          'Die Führungskraft macht weiterhin die Expertenarbeit und delegiert nichts.',
          'Gründer und Führungskräfte ziehen in verschiedene Richtungen, und das Team hört widersprüchliche Signale.',
        ],
      },
      solution: {
        eyebrow: 'Das Coaching',
        title: 'Praktische Werkzeuge, echte Situationen, ein Coach an ihrer Seite.',
        text: 'Kein Marathon der Führungstheorie. Wir arbeiten an den Gespräche, vor denen Ihre Manager diesen Monat tatsächlich stehen, geben ihnen ein kleines Set an Werkzeugen, das funktioniert, und bleiben für die ersten harten Entscheidungen erreichbar.',
        points: [
          'Individuelle Coaching-Sitzungen rund um echte Fälle aus dem Team der Führungskraft.',
          'Werkzeuge für Feedback, 1:1s, Delegation, Zielsetzung und Konflikte.',
          'Leadership-Alignment-Sitzungen für Gründer und Führungskräfte.',
          'Ein klarer Weg in die Eigenständigkeit: Das Ziel ist eine Führungskraft, die uns nicht mehr braucht.',
        ],
      },
      includes: {
        title: 'Was enthalten ist',
        text: 'Ein definiertes Programm für eine Führungskraft, eine Gruppe von Leads oder das gesamte Führungsteam.',
        items: [
          { title: 'Individuelles Coaching', body: 'Regelmäßige vertrauliche Sitzungen mit jeder Führungskraft, strukturiert um die Situationen, vor denen sie gerade steht.' },
          { title: 'Feedback- & 1:1-Toolkit', body: 'Einfache Frameworks für regelmäßige 1:1s, Lob, das ankommt, und kritisches Feedback, das Verhalten ändert, ohne Vertrauen zu beschädigen.' },
          { title: 'Konfliktmanagement', body: 'Wie man Spannungen früh benennt, ein schwieriges Gespräch führt und zwischen Teammitgliedern vermittelt, ohne Partei zu ergreifen.' },
          { title: 'Delegation & Zielsetzung', body: 'Die Expertenarbeit loslassen, klare Ziele setzen und Verantwortung einfordern, ohne Mikromanagement.' },
          { title: 'Teambuilding', body: 'Arbeitssitzungen mit dem ganzen Team zu Rollen, Ritualen und den Regeln der Zusammenarbeit.' },
          { title: 'Leadership-Alignment', body: 'Sitzungen mit Gründern und Führungskräften zu Zielen, Entscheidungsregeln und der Botschaft, die das Team hören soll.' },
          { title: 'Unterstützung auf Abruf', body: 'Eine Nachricht in Slack vor dem schwierigen Gespräch, ein Debrief danach. Montag bis Freitag, 9-18 Uhr MEZ.' },
        ],
      },
      process: {
        title: 'So läuft das Coaching',
        text: 'Ein definiertes Programm mit Anfang und Ende, kein Abonnement ohne Enddatum.',
        steps: [
          { tag: 'Kick-off', title: 'Diagnose', body: 'Gespräche mit den Führungskräften und ihren Vorgesetzten, um die echten Situationen zu verstehen, nicht die Jobtitel.' },
          { tag: 'Sitzung 1', title: 'Ziele vereinbaren', body: 'Jede Führungskraft setzt zwei oder drei konkrete Ziele für das Programm, abgestimmt auf das, was das Unternehmen von ihr braucht.' },
          { tag: 'Sitzungen', title: 'An den Fällen arbeiten', body: 'Regelmäßiges Coaching rund um aktuelle Situationen: ein Feedbackgespräch, ein Konflikt, ein Delegationsproblem, eine Entscheidung.' },
          { tag: 'Dazwischen', title: 'Üben & Unterstützung', body: 'Die Führungskräfte wenden die Werkzeuge in ihren Teams an, mit einem Coach, der vor und nach den harten Momenten erreichbar ist.' },
          { tag: 'Abschluss', title: 'Eigenständig', body: 'Ein Review anhand der Ziele, ein persönlicher Entwicklungsplan und eine Führungskraft, die ihr Team ohne uns führt.' },
        ],
      },
      forWhom: {
        title: 'Passt das zu Ihnen?',
        yes: [
          'Sie haben starke Fachkräfte in Lead-Rollen befördert und wollen, dass sie erfolgreich sind.',
          'Führungskräfte in Ihrem Unternehmen weichen Feedback oder Konflikten aus, und man sieht es im Team.',
          'Ihr Führungsteam muss sich auf Ziele und Entscheidungsregeln einigen.',
          'Sie wollen praktisches Coaching zu echten Situationen, keinen generischen Trainingstag.',
        ],
        noTitle: 'Nichts für Sie, wenn …',
        no: [
          'Sie einen Führungskurs mit Zertifikat für das ganze Unternehmen wollen.',
          'Die Führungskraft bereits entschieden hat, dass sie die Rolle nicht will; Coaching kann diese Entscheidung nicht ersetzen.',
          'Sie einen Leistungsfall oder eine Trennung abwickeln müssen; das ist eine Aufgabe für die fraktionale Partnerschaft, gemeinsam mit Ihrer Rechtsberatung.',
        ],
      },
      deliverables: {
        title: 'Was Sie mitnehmen',
        text: 'Führungskräfte, die führen, und Werkzeuge, die sie weiter benutzen werden.',
        items: [
          'Ein Coaching-Plan mit zwei oder drei konkreten Zielen pro Führungskraft',
          'Ein Feedback- und 1:1-Toolkit, das die Führungskraft tatsächlich nutzt',
          'Ein Konflikt-Playbook für die typischen Situationen des Teams',
          'Vereinbarte Team-Rituale und Regeln der Zusammenarbeit',
          'Leadership-Alignment-Notizen: Ziele, Entscheidungsregeln, eine Botschaft',
          'Ein persönlicher Entwicklungsplan für jede Führungskraft zum Abschluss',
        ],
      },
      faq: {
        title: 'Fragen zum Coaching',
        items: [
          { q: 'Ist das Coaching oder Training?', a: 'Vor allem Coaching: individuelle Sitzungen rund um echte Situationen, mit kurzen Werkzeug-Inputs, wo nötig. Team-Workshops sind Teil des Programms, wenn sich das ganze Team abstimmen muss.' },
          { q: 'Wie lange dauert ein Programm?', a: 'Lang genug, um Gewohnheiten zu verändern, kurz genug, um ein Ende zu haben: Die Dauer hängt von der Anzahl der Führungskräfte und den Zielen ab, die wir im Kick-off vereinbaren. Wir sagen Ihnen vorab, was wir empfehlen.' },
          { q: 'Können Sie auch unsere Gründer coachen?', a: 'Ja. Leadership-Alignment-Sitzungen mit Gründern und Führungskräften sind Teil der Leistung, und individuelles Coaching für Gründerinnen und Gründer ist möglich.' },
          { q: 'Ist es vertraulich?', a: 'Individuelle Sitzungen sind vertraulich zwischen Führungskraft und Coach. Das Unternehmen sieht die vereinbarten Ziele und den Fortschritt, nicht den Inhalt der Gespräche.' },
          { q: 'In welchen Sprachen coachen Sie?', a: 'Englisch, Deutsch und Bulgarisch. Gemischtsprachige Teams sind in unserer Arbeit üblich, und Materialien können in allen drei Sprachen bereitgestellt werden.' },
          { q: 'Ersetzt das eine fraktionale HR-Partnerin?', a: 'Nein, es ergänzt sie. Coaching baut die Führungskräfte auf; die fraktionale Partnerschaft baut die Strukturen, Richtlinien und Prozesse um sie herum. Viele Kunden kombinieren beides.' },
        ],
      },
      cta: {
        title: 'Machen Sie aus Ihren Experten Führungskräfte, denen ihre Teams folgen wollen.',
        text: 'Erzählen Sie uns in einem kostenlosen 30-Minuten-Gespräch von Ihren Führungskräften. Wir schlagen ein passendes Programm vor oder sagen Ihnen, wenn etwas Einfacheres genügt.',
        button: 'Kostenloses Gespräch buchen',
      },
      related: ['fractional', 'bridge', 'hiring'],
    },
  },
};
