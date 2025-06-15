"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { UserMenu } from "./userMenu";

export function AuthButtons() {
  const { data: session } = useSession();
  const t = useTranslations("Auth");

  if (session) {
    return <UserMenu session={session} logoutText={t("logout")} />;
  }

  return (
    <div className="flex gap-[15px]">
      <Link href="/auth/login">
        <Button variant="headerNoImage">{t("login")}</Button>
      </Link>
      <Link href="/auth/register">
        <Button variant="headerNoImage">{t("register")}</Button>
      </Link>
    </div>
  );
}
