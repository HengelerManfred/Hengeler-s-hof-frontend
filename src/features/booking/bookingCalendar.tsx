"use client";
import { DayPicker } from "react-day-picker";
import { useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { loadStripe } from "@stripe/stripe-js";

import { uk, enUS, de } from "react-day-picker/locale";
import { useLocale, useTranslations } from "next-intl";
import { CustomDayButton } from "./customDayButton";
import type { ReasonMap } from "./types";
import { useBookingStore } from "@/shared/store/bookingStore";
import { useScrollRefStore } from "@/shared/store/scrollRefStore";
import {
  BookedHint,
  BookingStatus,
  deleteBooking,
} from "@/widgets/booking/model/bookingApi";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import { useRouter } from "next/navigation";

export function BookingCalendar({
  blockedDatesWithReason = {},
  adminMode,
}: {
  blockedDatesWithReason?: ReasonMap;
  adminMode?: boolean;
}) {
  const clonedDatesWithReason = structuredClone(blockedDatesWithReason);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setWrapperRef } = useScrollRefStore();
  useEffect(() => {
    if (scrollRef.current) {
      setWrapperRef(scrollRef);
    }
  }, []);
  const { range, setRange } = useBookingStore();
  const blockedDatesKeys = Object.keys(blockedDatesWithReason);
  const session = useSession();
  const router = useRouter();
  const t = useTranslations("BookingCalendar");
  const myPendingDates = blockedDatesKeys
    .filter((d) => {
      const myPending =
        clonedDatesWithReason[d].status === BookingStatus.PENDING &&
        clonedDatesWithReason[d].userId === session.data?.user.id;
      if (myPending) {
        clonedDatesWithReason[d].status = BookingStatus.MY_PENDING;
      }
      return myPending;
    })
    .map((d) => new Date(d));

  const myBookedDates = blockedDatesKeys
    .filter((d) => {
      const myBooked =
        clonedDatesWithReason[d].status === BookingStatus.BOOKED &&
        clonedDatesWithReason[d].userId === session.data?.user.id;
      if (myBooked) {
        clonedDatesWithReason[d].status = BookingStatus.MY_BOOKED;
      }
      return myBooked;
    })
    .map((d) => new Date(d));

  const blockedDates = blockedDatesKeys
    .filter((d) => clonedDatesWithReason[d].status === BookingStatus.BOOKED)
    .map((d) => new Date(d));

  const otherPendingDates = blockedDatesKeys
    .filter(
      (d) =>
        clonedDatesWithReason[d].status === BookingStatus.PENDING &&
        clonedDatesWithReason[d].userId !== session.data?.user.id
    )
    .map((d) => new Date(d));

  const blockedByAdmin = blockedDatesKeys
    .filter((d) => clonedDatesWithReason[d].status === BookingStatus.CLOSED)
    .map((d) => new Date(d));

  const locale = useLocale();
  const localeMap = {
    uk: uk,
    en: enUS,
    de: de,
  };

  const blockedStartDates = blockedDatesKeys
    .filter((d) => clonedDatesWithReason[d].isFirst)
    .map((d) => new Date(d));
  const blockedEndDates = blockedDatesKeys
    .filter((d) => clonedDatesWithReason[d].isLast)
    .map((d) => new Date(d));

  const [popoverData, setPopoverData] = useState<{
    top: number;
    left: number;
    content: string;
    booking?: BookedHint;
    stripeId?: string;
  } | null>(null);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handleBlockedDateClick = ({
    event,
    content,
    booking,
    stripeId,
  }: {
    event: React.MouseEvent<HTMLButtonElement>;
    content: string;
    booking?: BookedHint;
    stripeId?: string;
  }) => {
    setPopoverData({
      top: event.clientY,
      left: event.clientX,
      content,
      booking,
      stripeId,
    });
    setPopoverOpen(true);
  };

  const handleDeleteBooking = async (bookingId: string | undefined) => {
    if (bookingId) {
      try {
        await deleteBooking(bookingId);
        const url = new URL(window.location.href);
        url.searchParams.set("_", Date.now().toString());
        router.push(url.toString());
        setPopoverOpen(false);
      } catch {}
    }
  };

  const redirectToStripe = async (stripeId?: string) => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: stripeId ?? "" });
    }
  };

  return (
    <div ref={scrollRef} className="relative p-5 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg">
      <DayPicker
        locale={localeMap[locale as keyof typeof localeMap]}
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        disabled={[
          ...blockedDates,
          ...myBookedDates,
          ...myPendingDates,
          ...otherPendingDates,
          ...blockedByAdmin,
          { before: new Date() },
        ]}
        excludeDisabled
        modifiers={{
          blocked: blockedDates,
          otherPending: otherPendingDates,
          myPending: myPendingDates,
          blockedStart: blockedStartDates,
          blockedEnd: blockedEndDates,
          myBooked: myBookedDates,
          blockedByAdmin: blockedByAdmin,
        }}
        modifiersClassNames={{
          blocked: "!bg-red-200",
          disabled: "bg-gray-200 opacity-80",
          otherPending: "!bg-yellow-200",
          myPending: "!bg-blue-200",
          blockedStart: "rounded-l-full",
          blockedEnd: "rounded-r-full",
          myBooked: "!bg-green-200",
          blockedByAdmin: "!bg-purple-200",
        }}
        components={{
          DayButton: (props) => {
            const day = props.day.date;
            const dateKey = new Date(
              Date.UTC(day.getFullYear(), day.getMonth(), day.getDate())
            )
              .toISOString()
              .split("T")[0];

            const reason = clonedDatesWithReason[dateKey];
            const stripeId = reason?.stripeId;

            return (
              <CustomDayButton
                {...props}
                booking={reason}
                onBlockedDateClick={handleBlockedDateClick}
                stripeId={stripeId}
              />
            );
          },
        }}
      />
      <Popover
        id={isPopoverOpen ? "day-popover" : undefined}
        open={isPopoverOpen}
        onClose={handlePopoverClose}
        anchorReference="anchorPosition"
        anchorPosition={
          popoverData
            ? { top: popoverData.top, left: popoverData.left }
            : undefined
        }
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            className: "shadow-lg min-h-[130px] flex items-center rounded-lg",
          },
        }}
      >
        <div className="relative p-8 h-full flex flex-col gap-2 text-center content-center">
          <IconButton
            aria-label="close"
            onClick={handlePopoverClose}
            className="!absolute !top-1 !right-1"
          >
            <CloseIcon />
          </IconButton>
          {popoverData?.content}
          {popoverData?.booking?.status === BookingStatus.MY_PENDING && (
            <Button
              variant="default"
              onClick={() => redirectToStripe(popoverData.stripeId)}
              className="flex items-center gap-2"
            >
              <EuroSymbolIcon /> {t("returnToPay")}
            </Button>
          )}
          {adminMode && popoverData?.booking?.bookingId && (
            <>
              <div className="flex flex-col items-start inter text-[14px] text-[var(--primary-text)]">
                <p>{popoverData.booking.roomId}</p>
                <p>{popoverData.booking.userName}</p>
                <p>{popoverData.booking.userEmail}</p>
                <p>{popoverData.booking?.userPhone}</p>
                {popoverData.booking.moreThanTwoPets && (
                  <p> Більше двох тварин</p>
                )}
              </div>
              <Button
                onClick={() => {
                  handleDeleteBooking(popoverData?.booking?.bookingId);
                }}
                variant="default"
              >
                {t("cancelBooking")}
              </Button>
            </>
          )}
        </div>
      </Popover>
    </div>
  );
}
