export default function PrivacyPolicy() {
  return (
    <main className="w-3/4 mx-auto">
      <h2 className="text-4xl font-bold">Datenschutzerklärung</h2>
      <section>
        <ol className="list-decimal pl-6 space-y-6 marker:text-2xl marker:font-semibold">
          <li>
            <h3 className="text-2xl font-semibold">Verantwortliche Stelle</h3>
            <p className="text-lg font-inter">
              [Name des Betreibers]
            </p>
            <p>Adresse: [Straße, Hausnummer, PLZ, Ort]</p>
            <p>E-Mail: [E-Mail-Adresse]</p>
            <p>Telefon: [Telefonnummer]</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold ">Erhebung und Verarbeitung personenbezogener Daten</h3>
            <h4 className="text-xl font-medium">2.1 Registrierung</h4>
            <p>Bei der Registrierung erheben wir:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Vor- und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (z. B. für Benachrichtigungen)</li>
              <li>Passwort (nur als sicherer Hash)</li>
            </ul>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>

            <h4 className="text-xl font-medium">2.2 Anmeldung via OAuth2</h4>
            <p>
              Wird Facebook oder Google zur Anmeldung genutzt, erhalten wir ausschließlich:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ihre E-Mail-Adresse</li>
              <li>Ihre Plattform-ID</li>
            </ul>
            <p>Weitere Daten werden durch uns nicht erhoben.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>

            <h4 className="text-xl font-medium">2.3 Besuchsdaten</h4>
            <p>Zur Planung unserer Angebote speichern wir das Datum bzw. die Daten Ihrer Besuche.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>

            <h4 className="text-xl font-medium">2.4 Zahlungsabwicklung</h4>
            <p>Zahlungen erfolgen vollständig über Stripe. Wir erheben und speichern <span className="font-bold">keine</span> Zahlungsdaten.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold ">Verwendung von Cookies</h3>
            <p>Unsere Website setzt <span className="font-bold">ausschließlich technisch notwendige Cookies</span> ein, um</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ihre Anmeldung und Sitzung zu verwalten</li>
              <li>Sicherheitsfunktionen zu gewährleisten</li>
            </ul>
            <p>Es werden <span className="font-bold">keine</span> Tracking-, Analyse-, Marketing- oder A/B-Test-Cookies verwendet.</p>
            <p>Da diese Cookies für den Betrieb nötig sind, ist gemäß Art. 6 Abs. 1 lit. f DSGVO keine Einwilligung erforderlich.</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold ">Weitergabe an Dritte</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><span className="font-bold">Zahlungsdaten</span>: keine Weitergabe (Stripe übernimmt Abwicklung).</li>
              <li><span className="font-bold">OAuth-Daten</span>: keine Weitergabe an andere Dritte, nur an die von Ihnen autorisierten Plattformen.</li>
            </ul>
          </li>
          <li>
            <h3 className="text-2xl font-semibold ">Speicherdauer</h3>
            <ul className="list-disc pl-6">
              <li><span className="font-bold">Registrierungsdaten</span>: bis zur Löschung Ihres Kontos, längstens 10 Jahre nach letzter Aktivität.</li>
              <li><span className="font-bold">Besuchsdaten</span>: bis zu 2 Jahre.</li>
              <li><span className="font-bold">Cookies</span>: Session-Cookies bis zum Ende der Sitzung.</li>
            </ul>
          </li>
          <li>
            <h3 className="text-2xl font-semibold ">Ihre Betroffenenrechte</h3>
            <p>Sie haben das Recht auf</p>
            <ul className="list-disc pl-6">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p>Zur Ausübung Ihrer Rechte oder bei Fragen wenden Sie sich bitte an:</p>
            <p>E-Mail: [E-Mail-Adresse]</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold ">Aktualität und Änderungen</h3>
            <p>Diese Datenschutzerklärung ist aktuell gültig ab dem [Datum einfügen].</p>
            <p>Wir behalten uns das Recht vor, sie bei Bedarf anzupassen.</p>
          </li>
        </ol>
      </section>
    </main >
  );
}
