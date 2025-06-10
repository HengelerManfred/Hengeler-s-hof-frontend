import { useTranslations } from "next-intl";
import { Phone, Email, LocationOn } from "@mui/icons-material";

export function Contacts() {
  const t = useTranslations("Contacts");
  return (
    <address className="flex flex-col gap-2 not-italic inter mt-[15px]">
      <p>{t("contacts")}</p>
      <a href={`tel:${t("phone")}`}>
        <Phone className="size-[40px]! text-[var(--main-bg)] bg-[var(--accent)] rounded-full p-1 mr-3" />
        {t("phone")}
      </a>
      <a href={`mailto:${t("email")}`} className="flex items-center gap-[15px] w-full ">
        <Email className="size-[40px]! text-[var(--main-bg)] bg-[var(--accent)] rounded-full p-1" />
        <span className="flex-1 min-w-0 text-[24px] leading-snug break-words whitespace-normal">
          {t("email")}
        </span>
      </a>
      <p>
        <LocationOn className="size-[40px]! text-[var(--main-bg)] bg-[var(--accent)] rounded-full p-1 mr-3" />
        {t("address")}
      </p>
    </address>
  );
}
