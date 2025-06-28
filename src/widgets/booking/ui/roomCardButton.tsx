"use client";

import { Button } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

export function RoomCardButton({ label }: { label: string }) {
  const handleClick = () => {
    document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button onClick={handleClick} variant="default" className="flex items-center gap-2">
      <CalendarMonth /> {label}
    </Button>
  );
}
