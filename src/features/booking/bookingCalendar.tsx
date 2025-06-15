"use client";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { uk, enUS, de } from "react-day-picker/locale";
import { useLocale } from "next-intl";
import { groupConsecutiveDates } from "./utils/dateUtils";
import { CustomDayButton } from "./customDayButton";
import type { ReasonMap } from "./types";
import { useBookingStore } from "@/shared/store/bookingStore";

export function BookingCalendar({
  blockedDatesWithReason = {},
}: {
  blockedDatesWithReason?: ReasonMap;
}) {
  const { range, setRange } = useBookingStore();
  const blockedDates = Object.keys(blockedDatesWithReason).map(
    (d) => new Date(d)
  );
  const locale = useLocale();
  const localeMap = {
    uk: uk,
    en: enUS,
    de: de,
  };

  const grouped = groupConsecutiveDates(blockedDates);

  const blockedStartDates = grouped.map((g) => g[0]);
  const blockedEndDates = [
    ...grouped.map((g) => g[g.length - 1]),
    new Date(new Date().setDate(new Date().getDate() - 1)),
  ];

  const [popoverData, setPopoverData] = useState<{
    top: number;
    left: number;
    content: string;
  } | null>(null);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const handleBlockedDateClick = ({
    event,
    content,
  }: {
    event: React.MouseEvent<HTMLButtonElement>;
    content: string;
  }) => {
    setPopoverData({
      top: event.clientY,
      left: event.clientX,
      content,
    });
    setPopoverOpen(true);
  };

  return (
    <div className="relative p-5 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg">
      <DayPicker
        locale={localeMap[locale as keyof typeof localeMap]}
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        disabled={[...blockedDates, { before: new Date() }]}
        excludeDisabled
        modifiers={{
          blocked: blockedDates,
          blockedStart: blockedStartDates,
          blockedEnd: blockedEndDates,
        }}
        modifiersClassNames={{
          blocked: "!bg-red-200",
          disabled: "bg-gray-200 opacity-80",
          blockedStart: "rounded-l-full",
          blockedEnd: "rounded-r-full",
        }}
        components={{
          DayButton: (props) => (
            <CustomDayButton
              {...props}
              blockedDatesWithReason={blockedDatesWithReason}
              onBlockedDateClick={handleBlockedDateClick}
            />
          ),
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
            className: "shadow-lg h-[100px] flex items-center rounded-lg",
          },
        }}
      >
        <div className="relative p-4 h-full text-center content-center">
          <IconButton
            aria-label="close"
            onClick={handlePopoverClose}
            className="!absolute !top-1 !right-1"
          >
            <CloseIcon />
          </IconButton>
          {popoverData?.content}
        </div>
      </Popover>
    </div>
  );
}
