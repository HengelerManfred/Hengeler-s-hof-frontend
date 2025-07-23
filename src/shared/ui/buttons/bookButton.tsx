"use client";
import { CalendarMonth } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function BookButton({ disabled = false }: { disabled: boolean }) {
  const t = useTranslations("Buttons");

  return (
    <Button
      variant="default"
      disabled={disabled}
      className="focus-visible:ring-2 gap-2 w-fit h-[34px]"
      component={Link}
      href="/booking/room1"
    >
      <CalendarMonth className="text-[var(--section-bg)]" />
      <span className="text-nowrap text-[var(--section-bg)]">{t("book")}</span>
    </Button>
  );
}
