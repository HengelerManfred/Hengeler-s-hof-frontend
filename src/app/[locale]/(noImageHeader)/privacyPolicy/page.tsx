import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicy() {
  const t = await getTranslations("PrivacyPolicy");

  return (
    <main className="w-3/4 mx-auto py-10">
      <h2 className="text-4xl font-bold">{t("title")}</h2>
      <section>
        <ol className="list-decimal pl-6 space-y-6 marker:text-2xl marker:font-semibold">
          <li>
            <h3 className="text-2xl font-semibold">{t("responsible.title")}</h3>
            <p className="text-lg font-inter">{t("responsible.operator")}</p>
            <p>{t("responsible.address")}</p>
            <p>{t("responsible.email")}</p>
            <p>{t("responsible.phone")}</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">
              {t("dataProcessing.title")}
            </h3>
            <h4 className="text-xl font-medium">
              {t("dataProcessing.registration.title")}
            </h4>
            <p>{t("dataProcessing.registration.text")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {t
                .raw("dataProcessing.registration.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("dataProcessing.registration.legal")}</p>

            <h4 className="text-xl font-medium">
              {t("dataProcessing.oauth.title")}
            </h4>
            <p>{t("dataProcessing.oauth.text")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {t
                .raw("dataProcessing.oauth.items")
                .map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>{t("dataProcessing.oauth.additional")}</p>
            <p>{t("dataProcessing.oauth.legal")}</p>

            <h4 className="text-xl font-medium">
              {t("dataProcessing.visitData.title")}
            </h4>
            <p>{t("dataProcessing.visitData.text")}</p>
            <p>{t("dataProcessing.visitData.legal")}</p>

            <h4 className="text-xl font-medium">
              {t("dataProcessing.payment.title")}
            </h4>
            <p>{t("dataProcessing.payment.text")}</p>
            <p>{t("dataProcessing.payment.legal")}</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">{t("cookies.title")}</h3>
            <p>{t("cookies.text")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {t.raw("cookies.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t("cookies.noTracking")}</p>
            <p>{t("cookies.legal")}</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">{t("thirdParty.title")}</h3>
            <ul className="list-disc pl-6 space-y-1">
              {t.raw("thirdParty.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">{t("retention.title")}</h3>
            <ul className="list-disc pl-6">
              {t.raw("retention.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">{t("rights.title")}</h3>
            <p>{t("rights.text")}</p>
            <ul className="list-disc pl-6">
              {t.raw("rights.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t("rights.contact")}</p>
            <p>{t("responsible.email")}</p>
          </li>
          <li>
            <h3 className="text-2xl font-semibold">{t("updates.title")}</h3>
            <p>{t("updates.validFrom")}</p>
            <p>{t("updates.changes")}</p>
          </li>
        </ol>
      </section>
    </main>
  );
}
