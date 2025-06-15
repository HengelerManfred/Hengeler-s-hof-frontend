import { getTranslations } from "next-intl/server";

export default async function Imprint() {
  const t = await getTranslations("Imprint");

  return (
    <main className="w-3/4 h-[67.1vh] mx-auto py-10">
      <h2 className="text-4xl font-bold my-6">{t("title")}</h2>
      <section>
        <ol className="list-decimal pl-6 marker:text-2xl marker:font-semibold">
          <li>
            <h3 className="text-2xl font-semibold">{t("legal.title")}</h3>
            <p className="text-lg font-inter">{t("legal.name")}</p>
            <p>{t("legal.street")}</p>
            <p>{t("legal.city")}</p>
            <p>{t("legal.country")}</p>
            <p className="mt-2">E-Mail: {t("legal.email")}</p>
            <p>Telefon: {t("legal.phone")}</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">{t("content.title")}</h3>
            <p className="text-lg font-inter">{t("content.name")}</p>
            <p>{t("content.street")}</p>
            <p>{t("content.city")}</p>
            <p>{t("content.country")}</p>
          </li>
        </ol>
      </section>
    </main>
  );
}
