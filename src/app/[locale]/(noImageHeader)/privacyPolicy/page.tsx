import { getTranslations } from "next-intl/server";
import { loadContacts } from "@/entities/api/contact.service";
import { Metadata } from "next";


export const generateMetadata = async ({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  const { locale } = params;
  const t = await getTranslations("PrivacyPolicy");

  return {
    title: t("titleMeta"),
    description: t("descriptionMeta"),
    keywords: t("keywords"),
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_CURRENT_HOST!),
    alternates: {
      canonical: `/${locale}/privacyPolicy`,
      languages: {
        en: `/en/privacyPolicy`,
        de: `/de/privacyPolicy`,
        uk: `/uk/privacyPolicy`,
        "x-default": `/en/privacyPolicy`,
      },
    },
  };
};

export default async function PrivacyPolicy() {
  const t = await getTranslations("PrivacyPolicy");
  const contacts = await loadContacts();

  return (
    <main className="w-3/4 mx-auto">
      <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>

      <h3 className="text-2xl font-semibold mt-6 mb-2">
        {t("responsibleTitle")}
      </h3>
      <span className="mb-4">
        {t("responsibleText")}
        <br />
        Manfred Hengeler
        <br />
        <p>
          {t("responsibleAddress", {
            street: contacts.street,
            postalCode: contacts.postalCode,
            city: contacts.city,
            country: contacts.country,
          })}
        </p>
        <p>{contacts.email}</p>
        <p> {contacts.phoneNumber}</p>
      </span>
      <p className="mb-4">{t("responsibleLaw")}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">{t("dataTitle")}</h3>
      <p className="mb-4">{t("dataText")}</p>
      <h4 className="text-xl font-semibold mt-4 mb-2">{t("stripeTitle")}</h4>
      <ul className="list-disc list-inside mb-4">
        {t.raw("stripeList").map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className="mb-4">{t("stripeText")}</p>

      <h4 className="text-xl font-semibold mt-4 mb-2">
        {t("ownCookiesTitle")}
      </h4>
      <ul className="list-disc list-inside mb-4">
        {t.raw("ownCookiesList").map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className="mb-4">{t("ownCookiesText")}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">{t("paymentTitle")}</h3>
      <p className="mb-4">{t("paymentText1")}</p>
      <p className="mb-4">{t("paymentText2")}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">{t("oauthTitle")}</h3>
      <p className="mb-4">{t("oauthText1")}</p>
      <p className="mb-4">{t("oauthText2")}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">{t("rightsTitle")}</h3>
      <p className="mb-2">{t("rightsTitle")}</p>
      <ul className="list-disc list-inside mb-4">
        {t.raw("rightsList").map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className="mb-4">{t("rightsText")}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">
        {t("retentionTitle")}
      </h3>
      <p className="mb-4">{t("retentionText")}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2">{t("updateTitle")}</h3>
      <p className="mb-4">{t("updateText")}</p>
    </main>
  );
}
