"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const COOKIE_NAME = "cookies-accepted";

export function CookiesBanner() {
  const [cookiesAccepted, setCookiesAccepted] = useState(true);
  const t = useTranslations("CookiesBanner");
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const value = cookie?.split("=")[1] === "true";
    setCookiesAccepted(value);
  }, []);

  const acceptCookies = () => {
    document.cookie = `${COOKIE_NAME}=true; max-age=${
      60 * 60 * 24 * 365
    }; path=/`;
    setCookiesAccepted(true);
    router.refresh();
  };

  if (cookiesAccepted) return null;

  return (
    <div className="flex flex-col w-full py-5 px-[12.5%] px-auto fixed bottom-0 left-0 bg-[var(--accent)] text-[16px] text-[var(--section-bg)] inter z-1000">
      <p>{t("mainText")}</p>
      <p className="pb-3">
        {t("moreInfo")}{" "}
        <Link href="/privacyPolicy" className="underline">
          {t("privacyPolicy")}
        </Link>
      </p>
      <button
        aria-label="Accept cookies"
        onClick={acceptCookies}
        className="bg-[var(--main-bg)] cursor-pointer text-[var(--primary-text)] px-4 py-2 rounded-md"
      >
        {t("accept")}
      </button>
    </div>
  );
}
