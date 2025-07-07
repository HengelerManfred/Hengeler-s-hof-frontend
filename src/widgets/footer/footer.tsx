import { TextLogo } from "@/shared/ui/textLogo";
import { getTranslations } from "next-intl/server";
import {
  PhoneIphone,
  Email,
  LocationOn,
  Instagram,
  Facebook,
  Telegram,
  WhatsApp,
} from "@mui/icons-material";
import { Link } from "@/i18n/navigation";

import { loadContacts } from "@/entities/api/contact.service";

export async function Footer() {
  const contacts = await loadContacts();
  const t = await getTranslations("Contacts");
  const tr = await getTranslations("Footer");
  return (
    <footer className="p-[5%] lg:p-[10px] w-[100dvw] backface-hidden lg:pb-5 flex justify-center z-5 bg-[var(--accent)] relative">
      <div className="flex flex-col lg:flex-row max-w-[450px] lg:max-w-[auto] lg:min-w-3/4 gap-6 items-center lg:items-end justify-between">
        <address className="flex flex-col max-w-[450px] w-full not-italic inter">
          <TextLogo />
          <a className="flex items-center" href={`tel:${t("phone")}`}>
            <PhoneIphone className="!size-[40px] text-[var(--main-bg)] gap-2 mr-3" />
            <span className="text-[var(--main-bg)]">
              {t("phoneAnswer")}
              <br />
              {contacts.phoneNumber}
            </span>
          </a>
          <a
            href={`mailto:${t("email")}`}
            className="flex items-center gap-[15px] w-full "
          >
            <Email className="size-[40px]! text-[var(--main-bg)] rounded-full gap-2 " />
            <span className="text-[16px] text-[var(--main-bg)]">
              {contacts.email}
            </span>
          </a>
          <p className="flex items-center">
            <LocationOn className="size-[40px]! text-[var(--main-bg)] rounded-full gap-2 mr-3" />
            <span className="text-[var(--main-bg)]">
              {contacts.street}, {contacts.postalCode} {contacts.city},{" "}
              {contacts.country}
            </span>
          </p>
        </address>
        <img
          className="hidden lg:block h-[130px] w-[130px]"
          src="/images/cow.png"
          alt="Farm Icon"
        />
        <div className="lg:w-[285px] flex flex-col gap-2 text-justify">
          <span className="text-[var(--main-bg)]">{tr("slogan")}</span>
          <div className="flex justify-between text-[var(--main-bg)]">
            <a
              href={contacts.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="size-[40px]! " />
            </a>
            <a
              href={contacts.telegram}
              target="_blank"
              aria-label="Telegram"
              rel="noopener noreferrer"
            >
              <Telegram className="size-[40px]!" />
            </a>
            <a
              href={contacts.whatsapp}
              target="_blank"
              aria-label="Whatsapp"
              rel="noopener noreferrer"
            >
              <WhatsApp className="size-[40px]!" />
            </a>
            <a
              href={contacts.instagram}
              target="_blank"
              aria-label="Instagram"
              rel="noopener noreferrer"
            >
              <Instagram className="size-[40px]!" />
            </a>
          </div>
          <div className="flex pt-2 items-center justify-between">
            <Link
              href="/privacyPolicy"
              className="text-[var(--main-bg)] border-b-2 border-transparent underline"
            >
              {tr("privacyPolicy")}
            </Link>
            <Link
              href="/imprint"
              className="text-[var(--main-bg)] border-b-2 border-transparent underline"
            >
              {tr("imprint")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
