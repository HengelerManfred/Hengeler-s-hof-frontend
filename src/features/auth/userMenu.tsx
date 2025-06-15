"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

export function UserMenu({
  session,
  logoutText,
}: {
  session: Session;
  logoutText: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <IconButton onClick={handleClick} size="small" sx={{ p: 0 }}>
        <Image
          src={session.user?.image ?? "/icons/default_avatar.png"}
          alt="user avatar"
          className="rounded-full"
          width={50}
          height={50}
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
        <MenuItem onClick={handleLogout}>{logoutText}</MenuItem>
      </Menu>
    </div>
  );
}
