import { loadContacts } from "@/entities/api/contact.service";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const locale = (await params).locale;
  const t = await getTranslations("ImprintMeta");
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_CURRENT_HOST!),
    alternates: {
      canonical: `/${locale}/imprint`,
      languages: {
        en: `/en/imprint`,
        de: `/de/imprint`,
        uk: `/uk/imprint`,
        "x-default": `/en/imprint`,
      },
    },
  };
};

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
            <p>
              {contacts.street}, {contacts.postalCode} {contacts.city},{" "}
              {contacts.country}
            </p>
            <p className="mt-2">E-Mail: {contacts.email}</p>
            <p>Telefon: {contacts.phoneNumber}</p>
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
