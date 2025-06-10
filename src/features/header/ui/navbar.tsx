import { ClientNavbar } from "./clientNavbar";
import { getTranslations } from "next-intl/server";

export async function Navbar() {
  const t = await getTranslations("NavBar");
  const translations = {
    booking: t("booking"),
    events: t("events"),
    about: t("about"),
  };

  return (
    <ClientNavbar t={translations} />
  );
}