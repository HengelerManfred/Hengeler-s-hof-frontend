"use client";
import { DayButton } from "react-day-picker";
import { useTranslations } from "next-intl";

type CustomDayButtonProps = React.ComponentProps<typeof DayButton> & {
  status?: string;
  onBlockedDateClick: (data: {
    event: React.MouseEvent<HTMLButtonElement>;
    content: string;
  }) => void;
};

export function CustomDayButton({
  status,
  onBlockedDateClick,
  ...props
}: CustomDayButtonProps) {
  const t = useTranslations("BookingCalendar");

  if (!status && !props.modifiers.disabled) {
    return <DayButton {...props} />;
  }

  const contentKey = status?.toLowerCase() || "pastDateMessage";
  const content = t(contentKey);

  return (
    <DayButton
      {...props}
      disabled={false}
      onClick={(e) =>
        onBlockedDateClick({
          event: e,
          content,
        })
      }
    />
  );
}

