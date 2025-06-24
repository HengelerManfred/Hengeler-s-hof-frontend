"use client";
import { DayButton } from "react-day-picker";
import { useTranslations } from "next-intl";
import { BookedHint } from "@/widgets/booking/model/bookingApi";

type CustomDayButtonProps = React.ComponentProps<typeof DayButton> & {
  booking?: BookedHint;
  stripeId?: string;
  onBlockedDateClick: (data: {
    event: React.MouseEvent<HTMLButtonElement>;
    content: string;
    stripeId?: string;
    booking?: BookedHint;
  }) => void;
};

export function CustomDayButton({
  booking,
  onBlockedDateClick,
  stripeId,
  ...props
}: CustomDayButtonProps) {
  const t = useTranslations("BookingCalendar");

  if (!booking?.status && !props.modifiers.disabled) {
    return <DayButton {...props} />;
  }

  const contentKey = booking?.status || "pastDateMessage";
  const content = t(contentKey);

  return (
    <DayButton
      {...props}
      disabled={false}
      onClick={(e) =>
        onBlockedDateClick({
          event: e,
          content,
          stripeId,
          booking
        })
      }
    />
  );
}

