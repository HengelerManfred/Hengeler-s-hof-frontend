"use client";
import { DayButton } from "react-day-picker";
import { useTranslations } from "next-intl";
import { BookingStatus } from "@/widgets/booking/model/bookingApi";

type CustomDayButtonProps = React.ComponentProps<typeof DayButton> & {
  status?: BookingStatus;
  stripeId?: string;
  onBlockedDateClick: (data: {
    event: React.MouseEvent<HTMLButtonElement>;
    content: string;
    stripeId?: string;
    status?: BookingStatus;
  }) => void;
};

export function CustomDayButton({
  status,
  onBlockedDateClick,
  stripeId,
  ...props
}: CustomDayButtonProps) {
  const t = useTranslations("BookingCalendar");

  if (!status && !props.modifiers.disabled) {
    return <DayButton {...props} />;
  }

  const contentKey = status || "pastDateMessage";
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
          status
        })
      }
    />
  );
}

