import { DateRange } from "react-day-picker";
import { roomsData } from "./roomsData";

export type BookedDate = {
  roomId: string;
  from: Date;
  to: Date;
  reason: string;
  withPet: boolean;
};

const BOOKINGS_STORAGE_KEY = "bookings";

export const loadBookings = (): BookedDate[] => {
    const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);

    if (!storedBookings) return [];
    const parsed = JSON.parse(storedBookings);
    parsed.forEach((booking: BookedDate) => {
      booking.from = new Date(booking.from);
      booking.to = new Date(booking.to);
    });
    return parsed;
};

export const saveBookings = (bookings: BookedDate[]): void => {
    localStorage.setItem(
      BOOKINGS_STORAGE_KEY,
      JSON.stringify(bookings)
    );
};

export const generateBlockedDatesMap = (
  allBookings: BookedDate[],
  currentRoomId: string
): Record<string, string> => {
  const blockedDatesMap: Record<string, string> = {};
  const roomIds = Array.from(roomsData.keys()).filter((id) => id !== "house");

  const conflictingBookings = allBookings.filter((booking) => {
    if (currentRoomId === "house") {
      return roomIds.includes(booking.roomId) || booking.roomId === "house";
    }
    return booking.roomId === "house" || booking.roomId === currentRoomId;
  });

  conflictingBookings.forEach((booking) => {
    const currentDate = new Date(booking.from);
    while (currentDate <= booking.to) {
      blockedDatesMap[currentDate.toDateString()] = booking.reason;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return blockedDatesMap;
};

export const isRangeAvailable = (
  range: DateRange,
  allBookings: BookedDate[],
  currentRoomId: string
): boolean => {
  const roomIds = Array.from(roomsData.keys()).filter((id) => id !== "house");

  const conflictingRoomIds =
    currentRoomId === "house"
      ? [...roomIds, "house"]
      : [currentRoomId, "house"];

  for (const booking of allBookings) {
    if (conflictingRoomIds.includes(booking.roomId) && range.from && range.to) {
      const existingFrom = booking.from.getTime();
      const existingTo = booking.to.getTime();

      const newFrom = range.from.getTime();
      const newTo = range.to.getTime();

      if (Math.max(existingFrom, newFrom) < Math.min(existingTo, newTo)) {
        return false;
      }
    }
  }

  return true;
};
