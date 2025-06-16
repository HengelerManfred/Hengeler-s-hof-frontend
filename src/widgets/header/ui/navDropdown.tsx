"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { useBurgerStore } from "@/shared/store/burgerStore";
import { Contacts } from "./contacts";
import { AuthBurgerButtons } from "@/features/auth/authBurgerButtons";

export default function NavDropdown() {
  const isOpen = useBurgerStore((state) => state.isOpen);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("NavBar");
  const toggle = useBurgerStore((state) => state.toggle);

  const changeLocale = (locale: string) => {
    const parts = pathname.split("/");
    parts[1] = locale;
    const newPath = parts.join("/");
    router.replace(newPath);
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full h-[100dvh] bg-[var(--section-bg)] z-10",
        "overflow-auto inter text-[24px] p-5 sm:pt-[170px] pt-[100px]",
        "transition-all duration-300 ease-in-out",
        isOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
      )}
    >
      <ul className="flex flex-col">
        <li className="flex justify-between items-center pb-[15px]">
          {t("language")}
          <span>
            <Button
              className="text-[24px]! text-[var(--primary-text)]!"
              onClick={() => changeLocale("en")}
            >
              EN
            </Button>
            <Button
              className="text-[24px]! text-[var(--primary-text)]!"
              onClick={() => changeLocale("uk")}
            >
              UK
            </Button>
            <Button
              className="text-[24px]! text-[var(--primary-text)]!"
              onClick={() => changeLocale("de")}
            >
              DE
            </Button>
          </span>
        </li>
        <li aria-hidden="true">
          <Divider />
        </li>
        <li>
          <Link
            onClick={toggle}
            className="block w-full py-[15px]"
            href="/booking/room1"
          >
            {t("booking")}
          </Link>
        </li>
        <li aria-hidden="true">
          <Divider />
        </li>
        <li>
          <Link
            onClick={toggle}
            className="block w-full py-[15px]"
            href="/events"
          >
            {t("events")}
          </Link>
        </li>
        <li aria-hidden="true">
          <Divider />
        </li>
        {/* <li>
          <Link
            onClick={toggle}
            className="block w-full py-[15px]"
            href="/about"
          >
            {t("about")}
          </Link>
        </li> */}
        <li aria-hidden="true">
          <Divider />
        </li>
      </ul>
      <Contacts />
      <AuthBurgerButtons />
    </nav>
  );
}
