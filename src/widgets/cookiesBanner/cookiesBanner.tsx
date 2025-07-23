import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { AcceptButton } from "./acceptButton";
const COOKIE_NAME = "cookies-accepted";

export async function CookiesBanner() {
  const t = await getTranslations("CookiesBanner");
  const cookieStore = await cookies();
  const cookiesAccepted = cookieStore.get(COOKIE_NAME)?.value === "true";

  if (cookiesAccepted) {
    return null;
  }
  return (
    <div className=" flex flex-col w-full py-5 px-[12.5%] px-auto fixed bottom-0 left-0 bg-[var(--accent)] text-[16px] text-[var(--section-bg)] inter z-1000">
      <p>{t("mainText")}</p>
      <p className="pb-3">
        {t("moreInfo")}{" "}
        <Link href="/privacyPolicy" className="underline">
          {t("privacyPolicy")}
        </Link>
      </p>
      <AcceptButton text={t("accept")} />
    </div>
  );
}
