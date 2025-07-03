import { getTranslations } from "next-intl/server";
import { loadContacts } from "@/entities/api/contact.service";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  robots: {
    index: false,
    follow: false,
  },
});

export default async function PrivacyPolicy() {
  const t = await getTranslations("PrivacyPolicy");
  const contacts = await loadContacts();

  return (
    <main className="w-3/4 mx-auto">
      <h2 className="text-3xl font-bold mb-4">Datenschutzerklärung</h2>

      <h3 className="text-2xl font-semibold mt-6 mb-2">1. Verantwortlicher</h3>
      <p className="mb-4">
        Verantwortlich für die Datenverarbeitung ist:<br />
        Hengeler’s Hof<br />
        <p>{contacts.street}, {contacts.postalCode} {contacts.city}, {contacts.country}</p>
        <p>{contacts.email}</p>
        <p>{contacts.phoneNumber}</p>
      </p>
      <p className="mb-4">
        Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Basis der EU-Datenschutzgrundverordnung (DSGVO), des Bundesdatenschutzgesetzes (BDSG) sowie des Telekommunikation-Telemedien-Datenschutzgesetzes (TTDSG). Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, z. B. IT-Sicherheit) und ggf. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sofern Daten an Empfänger in Drittländern übermittelt werden, verwenden wir EU-Standardvertragsklauseln oder andere geeignete Garantien.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">2. Erhobene Daten und Cookies</h3>
      <p className="mb-4">
        Wir erheben personenbezogene Daten, um unsere vertraglichen Leistungen (z. B. Buchung und Beherbergung) zu erbringen, die Sicherheit unserer IT-Systeme zu gewährleisten und unsere Webseite technisch bereitzustellen. Zur Sicherung Ihrer Daten verwenden wir beim Aufruf unserer Webseite eine SSL/TLS-Verschlüsselung.
      </p>
      <h4 className="text-xl font-semibold mt-4 mb-2">2.1 Stripe (stripe.com)</h4>
      <ul className="list-disc list-inside mb-4">
        <li><strong>stripe.csrf:</strong> CSRF‑Schutz bei Zahlungen.</li>
        <li><strong>site-auth:</strong> Händler-Autorisierung im Stripe-Dashboard.</li>
        <li><strong>private_machine_identifier, machine_identifier:</strong> Betrugsprävention und Geräteerkennung.</li>
        <li><strong>merchant, cid:</strong> Stripe-Account-ID und Client-ID zur Identifikation des Händlers.</li>
        <li><strong>_ga:</strong> Stripe-internes Google Analytics (nicht für unsere Webseite).</li>
        <li><strong>stripe_sid, stripe_mid:</strong> Sitzungs-IDs zur sicheren Zuordnung von Zahlungssitzungen.</li>
        <li><strong>stripe_orig_props:</strong> Referrer- und Landing-Page-Informationen zur Betrugsprävention.</li>
        <li><strong>secure-has_logged_in:</strong> Anzeige des Login-Status im Stripe-Dashboard.</li>
      </ul>
      <p className="mb-4">
        Stripe verarbeitet Ihre Zahlungsdaten (z. B. Kreditkarteninformationen) als eigenständiger Verantwortlicher zum Zweck der Betrugsprävention und Zahlungsabwicklung. Unsere Rechtsgrundlage für die Übermittlung der Zahlungsdaten ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Internationale Datenübermittlungen erfolgen auf Basis von EU-Standardvertragsklauseln.
      </p>

      <h4 className="text-xl font-semibold mt-4 mb-2">2.2 Eigene Cookies (hengelershof.com)</h4>
      <ul className="list-disc list-inside mb-4">
        <li><strong>cookies-accepted:</strong> Speichert Ihre Einwilligung zum Setzen von nicht notwendigen Cookies.</li>
        <li><strong>NEXT_LOCALE:</strong> Speichert die von Ihnen gewählte Sprache (Next.js i18n).</li>
        <li><strong>Secure-authjs.session-token:</strong> Zugriffstoken für Ihre Sitzung über NextAuth.js.</li>
        <li><strong>Secure-authjs.callback-url:</strong> Speichert die URL für die Rückleitung nach OAuth-Login.</li>
        <li><strong>__Host-authjs.csrf-token:</strong> CSRF-Token zur Absicherung Ihres Logins über Auth.js.</li>
      </ul>
      <p className="mb-4">
        Technisch notwendige Cookies sind für den Betrieb der Seite unerlässlich und werden auch ohne Einwilligung gesetzt. Nicht notwendige Cookies setzen wir nur nach Ihrer aktiven Zustimmung (Art. 6 Abs. 1 lit. a DSGVO) durch unser Cookie-Banner.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">3. Zahlungsabwicklung mit Stripe</h3>
      <p className="mb-4">
        Für die Abwicklung Ihrer Online-Zahlung verwenden wir Stripe (Stripe Payments), einen Zahlungsdienst der Stripe.com. Ihre Zahlungsdaten werden direkt an Stripe übertragen; wir erhalten lediglich eine Bestätigung über den Zahlungserfolg. Ohne diese Übermittlung können wir Ihre Buchung nicht abschließen.
      </p>
      <p className="mb-4">
        Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Stripe verarbeitet Zahlungsdaten als eigenverantwortlicher Anbieter zur Betrugsprävention und Zahlungsabwicklung. Internationale Datenübertragungen sind durch EU-Standardvertragsklauseln abgesichert.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">4. Anmeldung via Google OAuth</h3>
      <p className="mb-4">
        Sie können sich auf unserer Website mittels Ihres Google-Accounts anmelden. Dabei erhalten wir nur jene Informationen (z. B. Name, E-Mail-Adresse), die Sie uns im OAuth-Consent-Screen von Google explizit freigeben.
      </p>
      <p className="mb-4">
        Wir verwenden diese Daten ausschließlich zur Authentifizierung und Verwaltung Ihres Nutzerkontos. Unsere Datenschutzerklärung ist auf derselben Domain gehostet und wird im OAuth-Consent-Screen hinterlegt, wie von Google gefordert. Wir halten uns an die Google-Richtlinien zur eingeschränkten Nutzung (Limited Use Policy).
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">5. Ihre Rechte</h3>
      <p className="mb-2">Sie haben gemäß DSGVO folgende Rechte:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten</li>
        <li>Recht auf Berichtigung unrichtiger oder unvollständiger Daten</li>
        <li>Recht auf Löschung („Recht auf Vergessenwerden“)</li>
        <li>Recht auf Einschränkung der Verarbeitung</li>
        <li>Recht auf Datenübertragbarkeit</li>
        <li>Widerspruchsrecht gegen Verarbeitung auf Basis berechtigter Interessen</li>
        <li>Recht auf Widerruf bereits erteilter Einwilligungen</li>
        <li>Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde</li>
      </ul>
      <p className="mb-4">
        Zur Ausübung dieser Rechte können Sie uns jederzeit über die oben angegebenen Kontaktdaten kontaktieren.
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">6. Datenlöschung und Speicherdauer</h3>
      <p className="mb-4">
        Ihre personenbezogenen Daten werden gelöscht oder gesperrt, sobald der Zweck der Verarbeitung entfällt. Eine Speicherung über diesen Zeitraum hinaus erfolgt nur, wenn dies gesetzlich vorgeschrieben ist (z. B. steuerrechtliche Aufbewahrungsfristen).
      </p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">7. Aktualisierung der Datenschutzerklärung</h3>
      <p className="mb-4">
        Diese Datenschutzerklärung ist stets auf https://www.hengelershof.com/de/privacypolicy verfügbar und wird bei Änderungen unserer Datenverarbeitungsprozesse umgehend aktualisiert. Datum der letzten Aktualisierung: 03. Juli 2025.
      </p>
    </main >
  );
}
