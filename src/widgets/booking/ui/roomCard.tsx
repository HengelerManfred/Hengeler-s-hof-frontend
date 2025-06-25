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
  const t = useTranslations("Booking");
  return (
    <div className="w-full inter backface-hidden flex flex-col bg-[var(--section-bg)] border border-[var(--section-border)] rounded-[8px] gap-[15px] p-[20px]">
      <h3 className="text-[var(--primary-text)] text-[36px]">{t(room.name)}</h3>
      <p className="text-[var(--secondary-text)] text-[14px]">
        {t(room.description)}
      </p>
      <div className="flex flex-col text-[var(--primary-text)] text-[16px] gap-2">
        <div className="flex justify-between">
          <span>
            <span className="font-extralight">{t("checkIn")}: </span>
            {room.checkIn}
          </span>
          <span>
            <span className="font-extralight">{t("checkOut")}: </span>
            {room.checkOut}
          </span>
        </div>
        <div className={clsx("flex justify-between gap-2",
          t(room.maxGuests).length>10 && "flex-col lg:flex-row "
        )}>
          <span>
            <span className="font-extralight">{t("maxGuests")}: </span>
            {t(room.maxGuests)}
          </span>
          <span className="text-nowrap">
            <span className="font-extralight">{t("size")}: </span>
            {room.size}
            {t("m2")}
          </span>
        </div>
      </div>
      <p className="text-[var(--primary-text)] text-[16px]">
        <span className="font-extralight">{t("price")}: </span>
        {room.price}€ {t("perNight")}
      </p>
      <Button onClick={()=> wrapperRef?.current?.scrollIntoView({ behavior: "smooth" })}  variant="default" className="flex items-center gap-2">
        <CalendarMonth /> {t("bookNow")}
      </Button>
    </div>
  );
}
