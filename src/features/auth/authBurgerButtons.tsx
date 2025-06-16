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
      <Link className="w-full" onClick={toggle} href="/auth/login">
        <Button variant="default" className="w-full">{t("login")}</Button>
      </Link>
      <Link className="w-full" onClick={toggle} href="/auth/register">
        <Button variant="default" className="w-full">{t("register")}
        </Button>
      </Link>
    </div >
  );
}
