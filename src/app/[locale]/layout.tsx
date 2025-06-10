import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { notFound } from "next/navigation";
import { roundhand, inter } from '../fonts';
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/config/theme";
import { CookiesBanner } from "@/widgets/cookiesBanner/cookiesBanner";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "uk" }, { locale: "de" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${roundhand.variable} ${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="/theme.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      </head>
      <body className="relative">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NextIntlClientProvider locale={locale}>
              {children}
              <CookiesBanner />
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
