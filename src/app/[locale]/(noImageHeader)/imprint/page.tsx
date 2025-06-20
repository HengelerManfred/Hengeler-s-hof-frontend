import { loadContacts } from "@/entities/api/contact.service";
import { getTranslations } from "next-intl/server";

export default async function Imprint() {
  const t = await getTranslations("Imprint");
  const contacts = await loadContacts();
  return (
    <main className="w-3/4 inter h-[67.1vh] mx-auto py-10">
      <h2 className="text-4xl font-bold my-6">{t("title")}</h2>
      <section>
        <ol className="list-decimal pl-6 marker:text-2xl marker:font-semibold">
          <li>
            <h3 className="text-2xl font-semibold">{t("legal.title")}</h3>
            <p>{t("legal.name")}</p>
            <p>{contacts.street}, {contacts.postalCode} {contacts.city}, {contacts.country}</p>
            <p className="mt-2">E-Mail: {t("legal.email")}</p>
            <p>Telefon: {t("legal.phone")}</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">{t("content.title")}</h3>
            <p className="text-lg font-inter">{t("content.name")}</p>
            <p>{contacts.street}</p>
            <p>{contacts.city}</p>
            <p>{contacts.country}</p>
          </li>
        </ol>
      </section>
    </main>
  );
}
