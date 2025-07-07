import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  robots: {
    index: false,
    follow: false,
  },
});

export default async function SuccessPage() {
  const t = await getTranslations("Success");

  return (
    <div className="w-full xl:h-[calc(100vh-400px)] py-10 flex items-center justify-center">
      <div className="w-9/10 lg:w-3/4 flex flex-col items-center justify-center gap-10 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg p-10">
        <img
          className="w-[150px] h-[150px]"
          src="/images/success.png"
          alt="success"
          width={150}
          height={150}
        />
        <div className="text-center text-[var(--primary-text)]">
          <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
          <p className="mb-4">{t("orderConfirmation")}</p>
          <p className="mb-4">{t("spamNote")}</p>
          <p>{t("thankYou")}</p>
        </div>
      </div>
    </div>
  );
}
