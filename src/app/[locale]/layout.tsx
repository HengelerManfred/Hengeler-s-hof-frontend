import { routing } from "@/i18n/routing";
import { createTranslator, hasLocale, NextIntlClientProvider } from "next-intl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { notFound } from "next/navigation";
import { roundhand, inter } from "../fonts";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/config/theme";
import { CookiesBanner } from "@/widgets/cookiesBanner/cookiesBanner";
import { Footer } from "@/widgets/footer/footer";
import { Toaster } from "react-hot-toast";
import "@/app/datePicker.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params:  Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const locale = (await params).locale;
  const messages = (await import(`@/../messages/${locale}.json`)).default;
  const t = createTranslator({ locale: locale, messages });

  return {
    title: t("Meta.title"),
    description: t("Meta.description"),
    openGraph: {
      title:  t("Meta.title"),
      description: t("Meta.description"),
      url: process.env.NEXT_PUBLIC_CURRENT_HOST,
      siteName: "Hengeler's Hof",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_CURRENT_HOST}cow.png`,
          width: 792,
          height: 789,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("Meta.title"),
      description: t("Meta.description"),
      images: [`${process.env.NEXT_PUBLIC_CURRENT_HOST}/favicon.ico`],
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_CURRENT_HOST!),
    keywords: t("Meta.keywords"),
    robots: { index: true, follow: true }
  };
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${roundhand.variable} ${inter.variable}`}>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="relative">
        <NextIntlClientProvider key={locale} locale={locale}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <SessionProvider session={session}>{children}</SessionProvider>
              <CookiesBanner />
              <Toaster position="top-center" />
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
