"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button, Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
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
    router.push(newPath);
  };

  return (
    <nav
      className={clsx(
        "top-[-150%] fixed left-0 w-full h-[calc(100vh-74px)] overflow-scroll sm:h-[calc(100vh-128px)] inter bg-[var(--section-bg)] z-10 p-5 text-[24px]",
        "transition-top duration-300 ease-in-out",
        isOpen && "block top-[74px] sm:top-[128px]",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
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
        <li>
          <Link
            onClick={toggle}
            className="block w-full py-[15px]"
            href="/about"
          >
            {t("about")}
          </Link>
        </li>
        <li aria-hidden="true">
          <Divider />
        </li>
      </ul>
      <Contacts />
      <AuthBurgerButtons />
    </nav>
  );
}
