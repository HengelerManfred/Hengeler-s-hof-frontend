"use client";
import { useState } from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function UserMenu({
  session,
  logoutText,
}: {
  session: Session;
  logoutText: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const t = useTranslations("AdminSettings");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await signOut({ redirect: false });
  };

  return (
    <div>
      <IconButton onClick={handleClick} size="small" sx={{ p: 0 }}>
        <img
          src={session.user?.image ?? "/icons/default_avatar.png"}
          alt="user avatar"
          className="object-cover rounded-full h-[50px] w-[50px]"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        {process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",").includes(
          session.user.email ?? ""
        ) && [
          <Link key={1} href="/admin/events">
            <MenuItem>{t("events")}</MenuItem>
          </Link>,
          <Link key={2} href="/admin/contacts">
            <MenuItem>{t("contacts")}</MenuItem>
          </Link>,
          <Link key={3} href="/admin/settings/room1">
            <MenuItem>{t("settings")}</MenuItem>
          </Link>,
          <Link key={4} href="/admin/slides">
            <MenuItem>{t("slides")}</MenuItem>
          </Link>,
          <Link key={5} href="/admin/sliders">
            <MenuItem>{t("Slider")}</MenuItem>
          </Link>,
        ]}
        <MenuItem onClick={handleLogout}>{logoutText}</MenuItem>
      </Menu>
    </div>
  );
}
