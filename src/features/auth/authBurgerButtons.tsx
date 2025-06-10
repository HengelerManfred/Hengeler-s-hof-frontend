'use client'
import { useBurgerStore } from "@/shared/store/burgerStore";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function AuthBurgerButtons() {
  const t = useTranslations("Auth");
  const toggle = useBurgerStore((state) => state.toggle);
  return (
    <div className="flex flex-col sm:flex-row mt-[15px] gap-[15px]">
      <Button variant="default" className="w-full">
        <Link onClick={toggle} href="/auth/login">{t("login")}</Link>
      </Button>
      <Button variant="default" className="w-full">
        <Link onClick={toggle} href="/auth/register">{t("register")}</Link>
      </Button>
    </div>
  );
}
