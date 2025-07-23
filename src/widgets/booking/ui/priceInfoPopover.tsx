"use client";

import { PriceItem } from "@/entities/api/adminSettings.service";
import { Info } from "@mui/icons-material";
import {
  Popover,
  Typography,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function PriceInfoPopover({ items }: { items: PriceItem[] }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const t = useTranslations("Booking.priceInfo");
  const handleClick = (event: React.SyntheticEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "price-info-popover" : undefined;

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick(e);
        }}
        aria-describedby={id}
        aria-label={t("title")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "content-box",
          position: "absolute",
          left: -12,
          top: -12,
          padding: "12px",
          marginLeft: 4,
          color: "var(--accent)",
          cursor: "pointer",
        }}
      >
        <Info fontSize="small" />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: "200px",
              p: 2,
              border: "1px solid var(--section-border)",
              backgroundColor: "var(--section-bg)",
              boxShadow: 3,
            },
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
            fontSize: "16px",
          }}
        >
          <span>{t("people")}</span> <span>{t("price")}</span>
        </Typography>

        <List dense disablePadding>
          {items.map((item) => (
            <ListItem
              key={item.numOfPersons}
              disableGutters
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
                gap: 1,
                px: 0,
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                {item.numOfPersons}
              </Typography>

              <Box
                sx={{
                  borderBottom: "1px dotted gray",
                  mt: "6px",
                  height: "1px",
                }}
              />

              <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                {item.price}€
              </Typography>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}
