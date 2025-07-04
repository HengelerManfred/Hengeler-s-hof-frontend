"use client";
import { useBookingStore } from "@/shared/store/bookingStore";
import { useTranslations } from "next-intl";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import { bookByAdmin } from "@/widgets/booking/model/bookingApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminBookingForm({ roomId }: { roomId: string }) {
  const { range } = useBookingStore();
  const { setRange } = useBookingStore();
  const session = useSession();
  const router = useRouter();
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return "";
    return `${format(range.from, "dd/MM/yyyy")} - ${format(
      range.to,
      "dd/MM/yyyy"
    )}`;
  };

  const handleBook = async () => {
    if (range?.from && range?.to && session.data?.user.id) {
      try {
        await bookByAdmin({
          roomId: roomId,
          startDate: range?.from.toLocaleDateString("sv-SE"),
          endDate: range?.to.toLocaleDateString("sv-SE"),
          userId: session.data?.user.id,
          wholeHouse: roomId.includes("house"),
        });
        
        const url = new URL(window.location.href);
        url.searchParams.set('_', Date.now().toString()); 
        router.push(url.toString());
        setRange(undefined);
        toast.success("Дати вимкнено для бронювання");
      } catch (e: unknown) {
        console.error(e);
        toast.error("Щось пішло не так");
      }
    }
  };

  const t = useTranslations("AdminSettings");
  return (
    <div className="p-5 flex flex-col gap-3 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg inter text-[var(--primary-text)]">
      <h2 className="font-bold">{t("DisableBookingTitle")}</h2>
      <p>{t("DisableBookingText")}</p>
      <div className="flex flex-col">
        <label htmlFor="booking" className="font-bold">
          {t("DisableDates")}
        </label>
        <input
          id="booking"
          className="bg-[var(--section-bg)] w-full border border-[var(--section-border)] rounded-lg"
          value={formatDateRange(range)}
          disabled={true}
        />
      </div>
      <Button onClick={handleBook} variant="default" className="w-full">
        {t("DisableDatesButton")}
      </Button>
    </div>
  );
}
