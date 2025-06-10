"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main>
      <h1>{t("welcome")}</h1>
      <nav>
        <ul>
          <li>{t("menu.home")}</li>
          <li>{t("menu.about")}</li>
          <li>{t("menu.contact")}</li>
        </ul>
      </nav>
    </main>
  );
}
