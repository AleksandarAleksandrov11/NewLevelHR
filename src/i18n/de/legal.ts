import type { LegalDict } from '../en/legal';

/**
 * Impressum, AGB und die ursprünglichen Datenschutz-Abschnitte (1, 3, 10, 11)
 * sind WÖRTLICH von der bisherigen Website übernommen, einschließlich aller
 * Platzhalter. Die zusätzlichen Datenschutz-Abschnitte und die Cookie-Richtlinie
 * sind neu und vor Veröffentlichung rechtlich zu prüfen.
 */
export const legal: LegalDict = {
  updated: '2026-09-19',
  common: {
    eyebrow: 'Rechtliches',
    lastUpdated: 'Zuletzt aktualisiert: {date}',
    onThisPage: 'Auf dieser Seite',
    otherPages: 'Weitere rechtliche Seiten',
    contactTitle: 'Fragen zu dieser Seite?',
    contactLine: 'Schreiben Sie uns an {email}. An Werktagen antworten wir innerhalb von 24 Stunden.',
    todoNote: 'Hervorgehobene Einträge sind von NewLevelHR vor der Veröffentlichung noch zu ergänzen oder zu bestätigen.',
  },
  legalNotice: {
    meta: {
      title: 'Impressum',
      description: 'Impressum von NewLevelHR: Anbieterkennzeichnung, Kontaktdaten und Registerangaben von NewLevelHR, Blagoewgrad, Bulgarien.',
    },
    title: 'Impressum',
    lead: '',
    blurb: 'Anbieterkennzeichnung, Kontaktdaten und Registerangaben.',
    intro: [
      { type: 'p', text: 'Angaben gemäß § 5 TMG / bulgarisches Handelsgesetzbuch:' },
      { type: 'address', lines: ['NewLevelHR', 'Orfei 1', '2700 Blagoewgrad', 'Bulgarien'] },
    ],
    sections: [
      { id: 'represented-by', title: 'Vertreten durch', blocks: [{ type: 'p', text: 'Mariyana Velkova – Geschäftsführerin' }] },
      { id: 'contact', title: 'Kontakt', blocks: [{ type: 'html', html: 'E-Mail: <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a><br>Website: <a href="https://newlevelhr.com">newlevelhr.com</a>' }] },
      {
        id: 'registration',
        title: 'Handelsregistereintrag',
        blocks: [
          { type: 'p', text: 'Handelsregister / Registeragentur Bulgariens' },
          { type: 'html', html: 'Einheitlicher Identifikationscode (EIK): <span class="todo-client">TO BE ADDED</span>' },
          { type: 'html', html: 'Umsatzsteuer-Identifikationsnummer (falls zutreffend): <span class="todo-client">TO BE ADDED</span>' },
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: 'Allgemeine Geschäftsbedingungen (AGB)',
      description: 'Allgemeine Geschäftsbedingungen von NewLevelHR für HR-Beratung, Recruiting und Talentakquise: Geltungsbereich, Vertragsschluss, Vergütung, Haftung und anwendbares Recht.',
    },
    title: 'Allgemeine Geschäftsbedingungen (AGB)',
    lead: '',
    blurb: 'Geltungsbereich, Vertragsschluss, Vergütung, Haftung und anwendbares Recht.',
    intro: [],
    sections: [
      { id: 'scope', title: '§ 1 Geltungsbereich', blocks: [{ type: 'p', text: 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Geschäftsbeziehungen, Dienstleistungen und Verträge, die NewLevelHR (nachfolgend „Anbieter“) seinen Kunden (nachfolgend „Kunde“) über die Website und die damit verbundenen Leistungen anbietet.' }] },
      { id: 'services', title: '§ 2 Leistungsumfang', blocks: [{ type: 'p', text: 'NewLevelHR bietet Beratungsleistungen im Bereich Personalwesen, Recruiting und Talentakquise an. Der konkrete Leistungsumfang wird durch individuelle schriftliche Vereinbarungen oder Projektverträge festgelegt.' }] },
      { id: 'conclusion', title: '§ 3 Vertragsschluss', blocks: [{ type: 'p', text: 'Ein Vertrag kommt zustande, wenn der Kunde ein schriftliches Angebot von NewLevelHR annimmt oder beide Parteien eine gesonderte Dienstleistungsvereinbarung unterzeichnen. Erstanfragen über die Website stellen keinen verbindlichen Vertrag dar.' }] },
      {
        id: 'fees',
        title: '§ 4 Vergütung und Zahlungsbedingungen',
        blocks: [
          { type: 'p', text: 'Alle Preise und Honorare verstehen sich zzgl. der gesetzlichen Umsatzsteuer (soweit anwendbar), sofern nicht anders angegeben.' },
          { type: 'html', html: 'Rechnungen sind innerhalb von <span class="todo-client">TO BE ADDED — z. B. 14 Tage</span> ab Rechnungsdatum ohne Abzug zahlbar, sofern nichts anderes schriftlich vereinbart wurde.' },
        ],
      },
      {
        id: 'liability',
        title: '§ 5 Haftung',
        blocks: [
          { type: 'p', text: 'NewLevelHR handelt als Dienstleister und garantiert keine bestimmten Einstellungsergebnisse, keine Bindung von Kandidaten und keinen wirtschaftlichen Erfolg.' },
          { type: 'p', text: 'Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, außer bei Verletzung von Leben, Körper oder Gesundheit oder bei der Verletzung wesentlicher Vertragspflichten.' },
        ],
      },
      { id: 'governing-law', title: '§ 6 Anwendbares Recht und Gerichtsstand', blocks: [{ type: 'p', text: 'Es gilt das Recht der Republik Bulgarien. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist Blagoewgrad, Bulgarien.' }] },
    ],
  },
  privacy: {
    meta: {
      title: 'Datenschutzerklärung',
      description: 'Wie NewLevelHR personenbezogene Daten auf dieser Website verarbeitet: Verantwortlicher, Hosting, Kontaktformular, Calendly-Terminbuchung, Cookies, Ihre Rechte nach der DSGVO und die zuständige Aufsichtsbehörde.',
    },
    title: 'Datenschutzerklärung',
    lead: '',
    blurb: 'Welche Daten wir auf dieser Website verarbeiten, warum, und welche Rechte Sie haben.',
    intro: [],
    sections: [
      { id: 'overview', title: '1. Datenschutz auf einen Blick', blocks: [{ type: 'p', text: 'NewLevelHR nimmt den Schutz Ihrer personenbezogenen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.' }] },
      {
        id: 'controller',
        title: '2. Verantwortlicher',
        blocks: [
          { type: 'p', text: 'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze ist:' },
          { type: 'address', lines: ['NewLevelHR', 'Orfei 1', '2700 Blagoewgrad', 'Bulgarien'] },
          { type: 'html', html: 'E-Mail: <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a>' },
          { type: 'p', text: 'Vertreten durch: Mariyana Velkova, Geschäftsführerin.' },
        ],
      },
      {
        id: 'data-collection',
        title: '3. Datenerfassung auf unserer Website',
        blocks: [
          { type: 'html', html: '<strong>Kontaktformular / E-Mail:</strong> Wenn Sie uns per E-Mail oder über das Kontaktformular kontaktieren, werden Ihre Angaben (einschließlich E-Mail-Adresse und Name) zur Bearbeitung der Anfrage gespeichert. Eine Weitergabe dieser Daten erfolgt nicht ohne Ihre ausdrückliche Einwilligung.' },
          { type: 'html', html: '<strong>Server-Log-Dateien:</strong> Der Website-Anbieter erhebt und speichert automatisch Informationen, die Ihr Browser automatisch übermittelt, in „Server-Log-Dateien“ (z. B. IP-Adresse, Browsertyp, Zeitpunkt der Serveranfrage). Diese Daten lassen sich keiner bestimmten Person zuordnen und werden ausschließlich zur technischen Optimierung genutzt.' },
        ],
      },
      {
        id: 'hosting',
        title: '4. Hosting und Server-Log-Dateien',
        blocks: [
          { type: 'html', html: 'Diese Website ist eine statische Website, die von einem Hosting-Anbieter (<span class="todo-client">[Hosting-Anbieter — TO BE ADDED]</span>) ausgeliefert wird. Bei jedem Aufruf verarbeitet der Hosting-Anbieter automatisch folgende Daten in Server-Log-Dateien: die IP-Adresse des anfragenden Geräts, Browsertyp und -version (User Agent), Datum und Uhrzeit der Anfrage sowie die aufgerufene URL.' },
          { type: 'p', text: 'Die Verarbeitung dient dem sicheren und stabilen Betrieb der Website, der Erkennung und Abwehr von Angriffen sowie der Analyse technischer Störungen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an der Sicherheit und Verfügbarkeit der Website). Die Log-Daten werden nicht mit anderen Datenquellen zusammengeführt.' },
          { type: 'html', html: 'Speicherdauer: <span class="todo-client">[in der Regel bis zu 30 Tage — TO BE CONFIRMED]</span>. Log-Daten, die zu Beweiszwecken aufbewahrt werden müssen, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.' },
        ],
      },
      {
        id: 'contact-form',
        title: '5. Kontaktformular',
        blocks: [
          { type: 'p', text: 'Wenn Sie das Kontaktformular auf dieser Website nutzen, verarbeiten wir die Daten, die Sie in die Formularfelder eingeben:' },
          { type: 'ul', items: ['Name', 'E-Mail-Adresse', 'Unternehmen (optional)', 'Thema', 'Nachricht', 'Ihre Zustimmung zu dieser Datenschutzerklärung'] },
          { type: 'p', text: 'Zusätzlich werden Ihre IP-Adresse und der Zeitpunkt der Absendung verarbeitet. Diese beiden Angaben dienen ausschließlich dem Spam-Schutz und der Begrenzung der Anfragehäufigkeit und werden für keinen anderen Zweck verwendet.' },
          { type: 'html', html: 'Ihre Nachricht wird per E-Mail an <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a> über den Maildienst unseres Hosting-Anbieters oder einen Anbieter für Transaktions-E-Mails (<span class="todo-client">[z. B. Resend — TO BE CONFIRMED]</span>) übermittelt und anschließend in unserem E-Mail-System verarbeitet.' },
          { type: 'p', text: 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss eines Vertrags gerichtet ist oder vorvertragliche Maßnahmen betrifft, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an der Beantwortung der an uns gerichteten Anfragen).' },
          { type: 'html', html: 'Speicherdauer: <span class="todo-client">[12 Monate nach dem letzten Kontakt, sofern keine Geschäftsbeziehung folgt — TO BE CONFIRMED]</span>. Gesetzliche Aufbewahrungspflichten bleiben unberührt.' },
          { type: 'p', text: 'Wir geben die Daten aus Ihrer Anfrage nicht zu Marketingzwecken an Dritte weiter.' },
        ],
      },
      {
        id: 'booking',
        title: '6. Terminbuchung (Calendly)',
        blocks: [
          { type: 'p', text: 'Zur Buchung einer kostenlosen Beratung stellen wir einen Link zum Terminplanungsdienst Calendly (Calendly LLC, USA) bereit, der sich in einem neuen Tab öffnet. Durch den bloßen Besuch unserer Website werden keine Daten an Calendly übermittelt. Erst wenn Sie den Buchungslink nutzen und Ihre Angaben auf den Seiten von Calendly eingeben, werden die dort angegebenen Daten (etwa Name, E-Mail-Adresse und der gewählte Termin) von Calendly verarbeitet.' },
          { type: 'html', html: 'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre Anfrage) sowie Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an einer einfachen Terminvereinbarung). Calendly verarbeitet Daten in den USA. Die Übermittlung stützt sich auf die EU-Standardvertragsklauseln und/oder die Zertifizierung von Calendly nach dem EU-US Data Privacy Framework <span class="todo-client">[zu bestätigen]</span>. Einzelheiten finden Sie in der Datenschutzerklärung von Calendly: <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">calendly.com/privacy</a>.' },
        ],
      },
      {
        id: 'cookies-consent',
        title: '7. Cookies und Einwilligung',
        blocks: [
          { type: 'p', text: 'Ohne Ihre Einwilligung verwendet diese Website ausschließlich Speicherungen, die für den Betrieb unbedingt erforderlich sind: Ihre Cookie-Auswahl, ob Sie den Sprachhinweis geschlossen haben und ob die Intro-Animation bereits angezeigt wurde. Diese Einträge verfolgen Sie nicht und werden nicht an Dritte weitergegeben (Art. 6 Abs. 1 lit. f DSGVO).' },
          { type: 'p', text: 'Optionale Analyse- oder Marketing-Cookies werden erst gesetzt, nachdem Sie über den Cookie-Dialog eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über die Schaltfläche „{cookieSettings}“ im Footer jeder Seite widerrufen.' },
          { type: 'html', html: 'Eine vollständige Liste der von dieser Website verwendeten Cookies und Local-Storage-Einträge finden Sie in unserer <a href="{cookiesUrl}">Cookie-Richtlinie</a>.' },
        ],
      },
      {
        id: 'fonts',
        title: '8. Schriftarten und externe Ressourcen',
        blocks: [
          { type: 'p', text: 'Die auf dieser Website verwendeten Schriftarten werden auf unserem eigenen Server gehostet. Beim Laden einer Seite wird keine Verbindung zu Google Fonts oder anderen Content-Delivery-Netzwerken aufgebaut, und es werden zu diesem Zweck keine Daten an solche Anbieter übermittelt.' },
          { type: 'p', text: 'Skripte und Stylesheets werden ebenfalls von unserem eigenen Hosting ausgeliefert. Externe Dienste werden nur geladen, wenn Sie eine entsprechende Funktion aktiv nutzen (etwa den Buchungslink) oder eingewilligt haben.' },
        ],
      },
      {
        id: 'analytics',
        title: '9. Analyse',
        blocks: [
          { type: 'p', text: 'Standardmäßig verwendet diese Website keine Analyse- oder Tracking-Tools. Sollten wir künftig ein datenschutzfreundliches Analysetool einsetzen, um Seitenaufrufe aggregiert zu messen, wird es vor der Aktivierung in diesem Abschnitt genannt und nur nach Ihrer Einwilligung über den Cookie-Dialog geladen.' },
        ],
      },
      {
        id: 'legal-basis',
        title: '10. Rechtsgrundlage der Verarbeitung',
        blocks: [
          { type: 'p', text: 'Die Datenverarbeitung erfolgt auf Grundlage von:' },
          {
            type: 'ul',
            items: [
              'Art. 6 Abs. 1 lit. b DSGVO: zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen.',
              'Art. 6 Abs. 1 lit. a DSGVO: aufgrund Ihrer Einwilligung (z. B. Newsletter-Anmeldung oder Übermittlung eines Lebenslaufs).',
              'Art. 6 Abs. 1 lit. f DSGVO: zur Wahrung unserer berechtigten Interessen (Sicherheit und Optimierung der Website).',
            ],
          },
        ],
      },
      {
        id: 'your-rights',
        title: '11. Ihre Rechte',
        blocks: [
          { type: 'p', text: 'Nach der DSGVO stehen Ihnen folgende Rechte in Bezug auf Ihre personenbezogenen Daten zu:' },
          {
            type: 'ul',
            items: [
              'Recht auf Auskunft (Art. 15 DSGVO)',
              'Recht auf Berichtigung (Art. 16 DSGVO)',
              'Recht auf Löschung / „Recht auf Vergessenwerden“ (Art. 17 DSGVO)',
              'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
              'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
              'Widerspruchsrecht (Art. 21 DSGVO)',
            ],
          },
          { type: 'html', html: 'Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a>. Außerdem haben Sie das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren (in Bulgarien: Kommission für den Schutz personenbezogener Daten – CPDP).' },
        ],
      },
      {
        id: 'supervisory-authority',
        title: '12. Aufsichtsbehörde',
        blocks: [
          { type: 'p', text: 'Die für NewLevelHR zuständige Aufsichtsbehörde ist:' },
          { type: 'address', lines: ['Kommission für den Schutz personenbezogener Daten (CPDP / КЗЛД)', 'Bul. „Prof. Tsvetan Lazarov“ 2', '1592 Sofia', 'Bulgarien'] },
          { type: 'html', html: 'Website: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>' },
          { type: 'p', text: 'Wenn Sie in einem anderen EU-Mitgliedstaat wohnen, können Sie sich auch an die Aufsichtsbehörde Ihres Wohnorts wenden.' },
        ],
      },
      {
        id: 'changes',
        title: '13. Änderungen dieser Datenschutzerklärung',
        blocks: [
          { type: 'p', text: 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder Änderungen unserer Leistungen abbildet, etwa bei der Einführung neuer Dienste. Es gilt die zum Zeitpunkt Ihres Besuchs auf dieser Website veröffentlichte Fassung.' },
          { type: 'html', html: 'Stand: <span class="todo-client">[Datum — TO BE ADDED]</span>.' },
        ],
      },
    ],
  },
  cookies: {
    meta: {
      title: 'Cookie-Richtlinie',
      description: 'Welche Cookies und Local-Storage-Einträge NewLevelHR verwendet (ausschließlich unbedingt erforderliche), wie lange sie gespeichert werden und wie Sie Ihre Cookie-Auswahl jederzeit ändern können.',
    },
    title: 'Cookie-Richtlinie',
    lead: 'Diese Seite erklärt, was Cookies und Local Storage sind, welche Einträge diese Website tatsächlich verwendet und wie Sie Ihre Auswahl jederzeit ändern können.',
    blurb: 'Die drei Einträge, die diese Website speichert, und wie Sie Ihre Auswahl ändern.',
    intro: [],
    sections: [
      {
        id: 'what-cookies-are',
        title: '1. Was Cookies und Local Storage sind',
        blocks: [
          { type: 'p', text: 'Cookies sind kleine Textdateien, die eine Website über Ihren Browser auf Ihrem Gerät speichert. Sie ermöglichen es der Website, Ihren Browser bei späteren Besuchen wiederzuerkennen und sich zum Beispiel Ihre Einstellungen zu merken. Local Storage ist ein vergleichbarer Speicherbereich in Ihrem Browser, in dem eine Website Einträge ablegen kann; anders als Cookies werden diese Einträge nicht bei jeder Anfrage an den Server gesendet.' },
          { type: 'p', text: 'Beide Speicherarten können unbedingt erforderlich sein (ohne sie funktioniert die Website oder eine von Ihnen gewünschte Funktion nicht) oder optional (Analyse, Marketing). Optionale Einträge werden nur mit Ihrer Einwilligung gesetzt.' },
        ],
      },
      {
        id: 'what-we-use',
        title: '2. Was diese Website verwendet',
        blocks: [
          { type: 'p', text: 'Diese Website hält ihren Fußabdruck bewusst klein. Die folgenden Einträge sind alle Erstanbieter-Einträge und unbedingt erforderlich; keiner davon verfolgt Ihr Verhalten über Websites hinweg:' },
          {
            type: 'table',
            caption: 'Von dieser Website verwendete Cookies und Local-Storage-Einträge',
            headers: ['Name', 'Art', 'Zweck', 'Dauer', 'Kategorie'],
            rows: [
              ['{consentCookie}', 'Erstanbieter-Cookie', 'Speichert Ihre Cookie-Auswahl.', '12 Monate', 'Notwendig'],
              ['{langBannerKey}', 'localStorage', 'Merkt sich, dass Sie den Sprachhinweis geschlossen oder eine Sprache gewählt haben.', 'Bis zur Löschung', 'Notwendig'],
              ['{preloaderKey}', 'localStorage', 'Merkt sich, dass die Intro-Animation beim ersten Besuch angezeigt wurde.', 'Bis zur Löschung', 'Notwendig'],
            ],
          },
          {
            type: 'dl',
            terms: [
              { term: 'Analyse', text: 'Derzeit keine. Falls aktiviert, wird sie vor der Aktivierung hier aufgeführt.' },
              { term: 'Marketing', text: 'Keine.' },
            ],
          },
        ],
      },
      {
        id: 'change-your-choice',
        title: '3. So ändern Sie Ihre Auswahl',
        blocks: [
          { type: 'p', text: 'Sie können den Cookie-Dialog jederzeit über die Schaltfläche „{cookieSettings}“ im Footer jeder Seite oder direkt hier erneut öffnen:' },
          { type: 'consentButton' },
          { type: 'p', text: 'Ihre neue Auswahl gilt sofort und wird im Cookie {consentCookie} gespeichert. Der Widerruf einer Einwilligung berührt nicht die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung.' },
          { type: 'p', text: 'Sie können Cookies und Local Storage auch in den Einstellungen Ihres Browsers löschen oder blockieren. Die meisten Browser erlauben es, gespeicherte Daten einzelner Websites zu löschen, Drittanbieter-Cookies zu blockieren oder alle Cookies abzulehnen. Bitte beachten Sie, dass das Blockieren unbedingt erforderlicher Einträge die Funktionalität dieser Website einschränken kann; zum Beispiel erscheint der Cookie-Dialog dann bei jedem Besuch erneut.' },
        ],
      },
      {
        id: 'third-party',
        title: '4. Links zu Drittanbietern',
        blocks: [
          { type: 'html', html: 'Zur Terminbuchung verlinkt unsere Website auf den Terminplanungsdienst Calendly (Calendly LLC, USA). Dieser Link öffnet sich in einem neuen Tab; erst wenn Sie ihn nutzen, setzt Calendly eigene Cookies nach seinen eigenen Richtlinien. Auf diese Verarbeitung haben wir keinen Einfluss. Einzelheiten finden Sie in der Datenschutzerklärung von Calendly: <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">calendly.com/privacy</a>. Durch den bloßen Besuch unserer Website werden keine Daten an Calendly übermittelt.' },
        ],
      },
      {
        id: 'contact',
        title: '5. Kontakt',
        blocks: [
          { type: 'html', html: 'Wenn Sie Fragen zu unserer Verwendung von Cookies oder zum Datenschutz im Allgemeinen haben, schreiben Sie bitte an <a href="mailto:info@newlevelhr.com">info@newlevelhr.com</a>. Weitere Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer <a href="{privacyUrl}">Datenschutzerklärung</a>.' },
        ],
      },
    ],
  },
};
