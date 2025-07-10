"use client";

import { Button } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { Feature } from "@/entities/api/adminSettings.service";

export function RoomCardButton({ label, features }: { label: string, features: Feature[] }) {
  const handleClick = () => {
    if(!features.find(f=>f.featureName == "booking-enabled")?.isActive) {
    const url = process.env.NEXT_PUBLIC_BOOKING_URL;
    if (url) {
      window.location.href = url;
    }
    } else {
      document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button onClick={handleClick} variant="default" className="flex items-center gap-2">
      <CalendarMonth /> {label}
    </Button>
  );
}
