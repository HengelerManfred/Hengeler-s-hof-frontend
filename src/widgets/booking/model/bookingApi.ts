import { DateRange } from "react-day-picker";
import { roomsData } from "./roomsData";
import { http } from "@/shared/api/http";

export enum BookingStatus {
  PENDING = "Pending",
  BOOKED = "Booked",
  MY_PENDING = "MyPending",
  MY_BOOKED = "MyBooked",
  CLOSED = "ClosedByAdmin",
}

export type BookedDate = {
  id: string;
  roomId: string;
  userId: string;
  customerEmail: string;
  price: number;
  numberOfDays: number;
  startDate: Date;
  endDate: Date;
  moreThanTwoPets: boolean;
  wholeHouse: boolean;
  status: BookingStatus;
  customerName: string;
  customerPhone?: string;
  bookingId: string;
  stripeId: string;
};

export type BookedHint = {
  status: BookingStatus;
  userEmail: string;
  roomId: string;
  moreThanTwoPets: boolean;
  numberOfDays: number;
  userName: string;
  bookingId: string;
  isFirst?: boolean;
  userPhone?: string;
  isLast?: boolean;
  isEffectiveFirst?: boolean;
  stripeId: string;
  userId: string;
};

export type CreateBookByAdmin = {
  roomId: string;
  userId: string;
  startDate: string;
  endDate: string;
  wholeHouse: boolean;
};

export const loadBookings = async (): Promise<BookedDate[]> => {
  const bookings = await http<BookedDate[]>("Booking/get-bookings");
  return bookings;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await http<void>(`Booking?id=${id}`, { method: "DELETE" });
};

export const bookByAdmin = async (
  createBookByAdmin: CreateBookByAdmin
): Promise<void> => {
  await http<void>("Booking/book-by-admin", {
    method: "POST",
    body: JSON.stringify(createBookByAdmin),
  });
};

export const generateBlockedDatesMap = (
  allBookings: BookedDate[],
  currentRoomId: string
): Record<string, BookedHint> => {
  const blockedDatesMap: Record<string, BookedHint> = {};

  const roomIds = Array.from(roomsData.keys()).filter((id) => id !== "house");

  const normalizeDate = (date: Date | string): string => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toLocaleDateString("sv-SE");
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const conflictingBookings = allBookings.filter((booking) => {
    if (currentRoomId === "house") {
      return roomIds.includes(booking.roomId) || booking.roomId === "house";
    }
    return booking.roomId === "house" || booking.roomId === currentRoomId;
  });

  conflictingBookings.forEach((booking) => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    let effectiveFirstSet = false;

    for (
      let current = new Date(start);
      current <= end;
      current = addDays(current, 1)
    ) {
      const key = normalizeDate(current);
      const isFirst = current.getTime() === start.getTime();
      const isLast = current.getTime() === end.getTime();
      const isEffectiveFirst = !effectiveFirstSet && current >= today;

      if (isEffectiveFirst) effectiveFirstSet = true;

      blockedDatesMap[key] = {
        status: booking.status,
        userEmail: booking.customerEmail,
        roomId: booking.roomId,
        moreThanTwoPets: booking.moreThanTwoPets,
        numberOfDays: booking.numberOfDays,
        userName: booking.customerName,
        bookingId: booking.id,
        stripeId: booking.stripeId,
        userPhone: booking.customerPhone,
        userId: booking.userId,
        isFirst,
        isLast,
        isEffectiveFirst,
      };
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
