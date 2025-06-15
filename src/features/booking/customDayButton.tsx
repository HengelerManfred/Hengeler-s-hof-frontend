"use client";
import { DayButton } from "react-day-picker";
import { useTranslations } from "next-intl";
import type { ReasonMap } from "./types";

export function CustomDayButton(
  props: React.ComponentProps<typeof DayButton> & {
    blockedDatesWithReason: ReasonMap;
    onBlockedDateClick: (data: {
      event: React.MouseEvent<HTMLButtonElement>;
      content: string;
    }) => void;
  }
) {
  const {
    day,
    modifiers,
    blockedDatesWithReason,
    onBlockedDateClick,
    ...rest
  } = props;
  const t = useTranslations("BookingCalendar");
  let contentKey: string | undefined;

  if (modifiers.blocked) {
    contentKey = blockedDatesWithReason[day.date.toDateString()];
  } else if (modifiers.disabled) {
    contentKey = "pastDateMessage";
  }

  const dayButtonProps = { day, modifiers, ...rest };

  if (!contentKey) {
    return <DayButton {...dayButtonProps} />;
  }

  const content = t(contentKey);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onBlockedDateClick({
      event: e,
      content: content,
    });
  };

  return (
    <DayButton {...dayButtonProps} disabled={false} onClick={handleClick} />
  );
}
