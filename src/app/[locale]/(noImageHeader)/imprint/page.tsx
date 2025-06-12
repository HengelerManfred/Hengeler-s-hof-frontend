export default function Imprint() {
  return (
    <main className="w-3/4 h-[67.1vh] mx-auto">
      <h2 className="text-4xl font-bold my-6">Impressum</h2>
      <section>
        <ol className="list-decimal pl-6 marker:text-2xl marker:font-semibold">
          <li>
            <h3 className="text-2xl font-semibold">Angaben gemäß § 5 DDG</h3>
            <p className="text-lg font-inter">[Name Familiename]</p>
            <p>[Straße Nr.]</p>
            <p>[PLZ Ort]</p>
            <p>Deutschland</p>
            <p className="mt-2">E-Mail: [E-Mail]</p>
            <p>Telefon: [Telefon]</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h3>
            <p className="text-lg font-inter">[Name Familiename]</p>
            <p>[Straße Nr.]</p>
            <p>[PLZ Ort]</p>
            <p>Deutschland</p>
          </li>
        </ol>
      </section>
    </main>
  );
}
