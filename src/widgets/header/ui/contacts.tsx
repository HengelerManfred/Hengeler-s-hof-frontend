"use client";
import { useTranslations } from "next-intl";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { Contacts as ContactsModel } from "@/entities/model/contacts";

export function Contacts({ contacts }: { contacts: ContactsModel }) {
  const t = useTranslations("Contacts");

  return (
    <address className="flex flex-col gap-2 not-italic inter mt-[15px]">
      <p>{t("contacts")}</p>
      <a className="flex items-center" href={`tel:${t("phone")}`}>
        <Phone className="size-[40px]! text-[var(--main-bg)] bg-[var(--accent)] rounded-full p-1 mr-3" />
        <div className="flex flex-col leading-snug">
          <span className="text-[var(--primary-text)]">
          {contacts.phoneNumber}
          </span>
          <span className="text-[16px] text-[var(--secondary-text)]">
            {t("phoneAnswer")}
          </span>
        </div>
      </a>
      <a href={`mailto:${t("email")}`} className="flex items-center gap-[15px] w-full ">
        <Email className="size-[40px]! text-[var(--main-bg)] bg-[var(--accent)] rounded-full p-1" />
        <span className="flex-1 min-w-0 text-[24px] leading-snug break-words whitespace-normal">
          {contacts.email}
        </span>
      </a>
      <p>
        <LocationOn className="size-[40px]! text-[var(--main-bg)] bg-[var(--accent)] rounded-full p-1 mr-3" />
        {contacts.street}, {contacts.postalCode} {contacts.city}, {contacts.country}
      </p>
    </address>
  );
}
