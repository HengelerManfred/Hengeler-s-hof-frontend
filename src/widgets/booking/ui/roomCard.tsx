"use client";
import { Room } from "../model/roomsData";
import { Button } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import clsx from "clsx";
import { useScrollRefStore } from "@/shared/store/scrollRefStore";
import React from "react";
import { useTranslations } from "next-intl";

export function RoomCard({ room }: { room: Room }) {
  const {wrapperRef} = useScrollRefStore();
  const tBooking = useTranslations("Booking");
  const t = useTranslations("");
  return (
    <div className="w-full inter backface-hidden flex flex-col bg-[var(--section-bg)] border border-[var(--section-border)] rounded-[8px] gap-[15px] p-[20px]">
      <h3 className="text-[var(--primary-text)] text-[36px]">{t(room.nameKey)}</h3>
      <p className="text-[var(--secondary-text)] text-[14px]">
        {t(room.descriptionKey)}
      </p>
      <div className="flex flex-col text-[var(--primary-text)] text-[16px] gap-2">
        <div className="flex justify-between">
          <span>
            <span className="text-[var(--secondary-text)]">{tBooking("checkIn") }: </span>
            {room.checkIn.slice(0, 5)}
          </span>
          <span>
            <span className="text-[var(--secondary-text)]">{tBooking("checkOut")}: </span>
            {room.checkOut.slice(0, 5)}
          </span>
        </div>
        <div className={clsx("flex justify-between gap-2",
          t(room.maxGuestsKey).length>10 && "flex-col lg:flex-row "
        )}>
          <span>
            <span className="text-[var(--secondary-text)]">{tBooking("maxGuests")}: </span>
            {t(room.maxGuestsKey)}
          </span>
          <span className="text-nowrap">
            <span className="text-[var(--secondary-text)]">{tBooking("size")}: </span>
            {room.size}
            {tBooking("m2")}
          </span>
        </div>
      </div>
      <p className="text-[var(--primary-text)] text-[16px]">
        <span className="text-[var(--secondary-text)]">{tBooking("price")}: </span>
        {room.price}€ {tBooking("perNight")}
      </p>
      <Button onClick={()=> wrapperRef?.current?.scrollIntoView({ behavior: "smooth" })} variant="default" className="flex items-center gap-2">
        <CalendarMonth /> {tBooking("bookNow")}
      </Button>
    </div>
  );
}
