"use client";
import { useBookingStore } from "@/shared/store/bookingStore";
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { CalendarMonth } from "@mui/icons-material";
import { Room } from "@/widgets/booking/model/roomsData";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

const differenceInCalendarDays = (dateLeft: Date, dateRight: Date) => {
  const utc1 = Date.UTC(
    dateLeft.getFullYear(),
    dateLeft.getMonth(),
    dateLeft.getDate()
  );
  const utc2 = Date.UTC(
    dateRight.getFullYear(),
    dateRight.getMonth(),
    dateRight.getDate()
  );
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

const formatDateRange = (range: DateRange | undefined) => {
  if (!range?.from || !range?.to) return "";
  return `${format(range.from, "dd/MM/yyyy")} - ${format(
    range.to,
    "dd/MM/yyyy"
  )}`;
};

export function BookingForm({
  room,
  onBook,
}: {
  room: Room;
  onBook: (details: { withPet: boolean }) => void;
}) {
  const { range, isSubmitting } = useBookingStore();
  const t = useTranslations("BookingForm");
  const [withPet, setWithPet] = useState(false);

  const numberOfDays = useMemo(() => {
    if (range?.from && range?.to) {
      return differenceInCalendarDays(range.from, range.to);
    }
    return 0;
  }, [range]);

  const totalPrice =
    numberOfDays > 7
      ? numberOfDays * room.price
      : numberOfDays * (room.price + room.additionalPrice);

  const minStay = 3;

  const handleBookClick = () => {
    if (numberOfDays < minStay) {
      return;
    }
    onBook({ withPet });
  };

  return (
    <div className="p-5 w-full [@media(width>1424px)]:w-1/3 h-fit flex flex-col gap-3 bg-[var(--section-bg)]  border border-[var(--section-border)] inter rounded-lg shadow-md">
      <h2 className="text-[36px] text-[var(--primary-text)]">{t("title")}</h2>
      <div>
        <label
          htmlFor="date-range"
          className="block text-sm font-medium text-[var(--primary-text)]"
        >
          {t("dateRange")}
        </label>
        <input
          id="date-range"
          value={formatDateRange(range)}
          readOnly
          placeholder="DD/MM/YYYY - DD/MM/YYYY"
          className="mt-1 block w-full px-3 py-2 bg-[var(--section-bg)] outline-none  border border-[var(--section-border)] rounded-lg shadow-sm sm:text-sm"
        />
      </div>

      {numberOfDays > 0 && (
        <>
          <div>
            <p>{t("numberOfDays", { count: numberOfDays })}</p>
            {numberOfDays < minStay && (
              <p className="text-red-600 font-semibold">
                {t("minStay", { count: minStay })}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-2/3">
            <p className="text-lg font-semibold">
              {t("priceForPeriod", { price: totalPrice })}
            </p>
            <div>
              {numberOfDays < 7 && numberOfDays > minStay && (
                <div className="break-words overflow-hidden whitespace-normal">
                  {t("additionalPrice", { price: room.additionalPrice })}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex items-center pt-2">
        <input
          id="withPet"
          name="withPet"
          type="checkbox"
          checked={withPet}
          onChange={(e) => setWithPet(e.target.checked)}
          className="h-4 w-4 text-[var(--primary-text)] border bg-[var(--section-bg)] border-[var(--section-border)] rounded-lg"
        />
        <label
          htmlFor="withPet"
          className="ml-3 block text-sm font-medium text-[var(--primary-text)]"
        >
          {t("withPet")}
        </label>
      </div>

      <button
        type="button"
        onClick={handleBookClick}
        className="w-full flex justify-center py-3 px-4 gap-2 items-center border border-transparent
          rounded-md shadow-sm text-sm font-medium text-[var(--main-bg)] bg-[var(--accent)] disabled:opacity-50"
      >
        <CalendarMonth />
        {isSubmitting ? "Submitting..." : t("bookNow")}
      </button>
    </div>
  );
}
