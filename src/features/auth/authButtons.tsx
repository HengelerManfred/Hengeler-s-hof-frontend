import { Button } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { auth } from "@/auth";
import { UserMenu } from "./userMenu";

export async function AuthButtons() {
  const t = await getTranslations("Auth");
  const session = await auth();

  if (session) {
    return <UserMenu session={session} logoutText={t("logout")} />;
  }

  return (
    <div className="flex gap-[15px]">
      <Button variant="headerNoImage">
        <Link href="/auth/login">{t("login")}</Link>
      </Button>
      <Button variant="headerNoImage">
        <Link href="/auth/register">{t("register")}</Link>
      </Button>
    </div>
  );
}
