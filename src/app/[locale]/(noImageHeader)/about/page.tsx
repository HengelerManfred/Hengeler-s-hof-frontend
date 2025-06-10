import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

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
