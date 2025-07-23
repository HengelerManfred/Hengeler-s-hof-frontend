import { Room } from "../model/roomsData";
import clsx from "clsx";
import React from "react";
import { getTranslations } from "next-intl/server";
import { RoomCardButton } from "./roomCardButton";
import {
  loadFeatures,
  loadPriceList,
} from "@/entities/api/adminSettings.service";
import { PriceInfoPopover } from "./priceInfoPopover";

export async function RoomCard({ room }: { room: Room }) {
  const features = await loadFeatures();
  const priceList = await loadPriceList();
  const tBooking = await getTranslations("Booking");
  const t = await getTranslations("");
  return (
    <div className="w-full inter backface-hidden flex flex-col bg-[var(--section-bg)] border border-[var(--section-border)] rounded-[8px] gap-[15px] p-[20px]">
      <h3 className="text-[var(--primary-text)] text-[36px]">
        {t(room.nameKey)}
      </h3>
      <p className="text-[var(--secondary-text)] text-[14px]">
        {t(room.descriptionKey)}
      </p>
      <div className="flex flex-col text-[var(--primary-text)] text-[16px] gap-2">
        <div className="flex justify-between">
          <span>
            <span className="text-[var(--secondary-text)]">
              {tBooking("checkIn")}:{" "}
            </span>
            {room.checkIn.slice(0, 5)}
          </span>
          <span>
            <span className="text-[var(--secondary-text)]">
              {tBooking("checkOut")}:{" "}
            </span>
            {room.checkOut.slice(0, 5)}
          </span>
        </div>
        <div
          className={clsx(
            "flex justify-between gap-2",
            t(room.maxGuestsKey).length > 10 && "flex-col lg:flex-row "
          )}
        >
          <span>
            <span className="text-[var(--secondary-text)]">
              {tBooking("maxGuests")}:{" "}
            </span>
            {t(room.maxGuestsKey)}
          </span>
          <span className="text-nowrap">
            <span className="text-[var(--secondary-text)]">
              {tBooking("size")}:{" "}
            </span>
            {room.size}
            {tBooking("m2")}
          </span>
        </div>
      </div>
      <div className="text-[var(--primary-text)] text-[16px]">
        {!features.find((f) => f.featureName == "booking-enabled")?.isActive ? (
          <>
            <span className="text-[var(--secondary-text)]">
              {tBooking("price")}:
            </span>
            {room.price}€ {tBooking("perNight")}
          </>
        ) : (
          <>
            <span className="text-[var(--secondary-text)] pr-1">
              {tBooking("priceFrom")}
            </span>
            <span className="inline-flex w-fit items-center">
              {priceList[0].price ?? room.price}€ {tBooking("perNight")}
              <div className="relative w-5 h-5">
                <PriceInfoPopover items={priceList} />
              </div>
            </span>
          </>
        )}
      </div>
      <RoomCardButton
        features={features}
        label={tBooking("bookNow")}
      ></RoomCardButton>
    </div>
  );
}
