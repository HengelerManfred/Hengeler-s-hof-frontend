import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { loadTranslations } from "@/entities/api/translation.service";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const messages = await loadTranslations();
  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}.json`)).default,
      ...messages[locale],
    },
  };
});
