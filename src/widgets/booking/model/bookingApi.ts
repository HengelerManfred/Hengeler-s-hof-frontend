import { DateRange } from "react-day-picker";
import { roomsData } from "./roomsData";
import { http } from "@/shared/api/http";

export enum BookingStatus {
  PENDING = "pending",
  BOOKED = "booked",
  CLOSED = "closed",
}

export type BookedDate = {
  roomId: string;
  userId: string;
  userEmail: string;
  price: number;
  numberOfDays: number;
  startDate: Date;
  endDate: Date;
  moreThanTwoPats: boolean;
  wholeHouse: boolean;
  status: BookingStatus;
};

export type BookedHint = {
  status: BookingStatus;
  email: string;
  roomId: string;
  moreThanTwoPats: boolean;
  numberOfDays: number;
}

export const loadBookings = async (): Promise<BookedDate[]> => {
    const bookings = await http<BookedDate[]>("Booking/get-bookings");
    return bookings;
};

export const generateBlockedDatesMap = (
  allBookings: BookedDate[],
  currentRoomId: string
): Record<string, BookedHint> => {
  const blockedDatesMap: Record<string, BookedHint> = {};
  const roomIds = Array.from(roomsData.keys()).filter((id) => id !== "house");

  const conflictingBookings = allBookings.filter((booking) => {
    if (currentRoomId === "house") {
      return roomIds.includes(booking.roomId) || booking.roomId === "house";
    }
    return booking.roomId === "house" || booking.roomId === currentRoomId;
  });

  conflictingBookings.forEach((booking) => {
    const currentDate = new Date(booking.startDate);
    while (currentDate <= new Date(booking.endDate)) {
      blockedDatesMap[currentDate.toISOString().split("T")[0]] = {
        status: booking.status,
        email: booking.userEmail,
        roomId: booking.roomId,
        moreThanTwoPats: booking.moreThanTwoPats,
        numberOfDays: booking.numberOfDays,
      };
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
      const existingFrom = booking.startDate.getTime();
      const existingTo = booking.endDate.getTime();

      const newFrom = range.from.getTime();
      const newTo = range.to.getTime();

      if (Math.max(existingFrom, newFrom) < Math.min(existingTo, newTo)) {
        return false;
      }
    }
  }

  return true;
};
