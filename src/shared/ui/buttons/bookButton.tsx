"use client";
import { CalendarMonth } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function BookButton() {
  const t = useTranslations("Buttons");

  return (
    <Button variant="default" className="gap-2 w-fit h-[34px]" component={Link} href="/booking">
        <CalendarMonth className="text-[var(--main-bg)]" />
        <span className="text-nowrap">{t("book")}</span>
    </Button>
  );
}
