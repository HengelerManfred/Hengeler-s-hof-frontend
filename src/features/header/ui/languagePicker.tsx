"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Language, LANGUAGES } from "@/features/header/models/langugae";

export function LanguagePicker() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLanguage = locale.toUpperCase() as Language;
  const language = Object.keys(LANGUAGES).includes(currentLanguage)
    ? currentLanguage
    : "DE";

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newLanguage: Language) => {
    setAnchorEl(null);
    const newPath = pathname.replace(
      /^\/[a-z]{2}/i,
      `/${newLanguage.toLowerCase()}`
    );

    router.push(newPath);
  };

  return (
    <>
      <Button
        className="p-1!"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span className="flex text-[#FFF] inter items-center text-[24px] gap-1">
          <LanguageIcon /> {language}
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <MenuItem key={code} onClick={() => handleClose(code as Language)}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
