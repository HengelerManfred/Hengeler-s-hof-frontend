"use client";
import { useState, useEffect } from "react";
import { BookingCalendar } from "@/features/booking/bookingCalendar";
import { BookingForm } from "@/features/booking/bookingForm";
import { Room } from "../model/roomsData";
import {
  loadBookings,
  saveBookings,
  generateBlockedDatesMap,
  isRangeAvailable,
  type BookedDate,
} from "../model/bookingApi";
import { useBookingStore } from "@/shared/store/bookingStore";
import toast from "react-hot-toast";
import { DateRange } from "react-day-picker";

export function Booking({ room }: { room: Room }) {
  const [bookings, setBookings] = useState<BookedDate[]>([]);
  const { range, setRange, setIsSubmitting } = useBookingStore();

  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  const handleBook = (details: { withPet: boolean }) => {
    if (!range?.from || !range?.to) {
      toast.error("Please select a date range.");
      return;
    }

    setIsSubmitting(true);
    const allBookings = loadBookings();

    if (
      !isRangeAvailable(range as DateRange, allBookings, room.id)
    ) {
      setBookings(allBookings);
      setIsSubmitting(false);
      toast.error("Sorry, this date range is no longer available.");
      return;
    }

    const newBooking: BookedDate = {
      roomId: room.id,
      from: range.from,
      to: range.to,
      withPet: details.withPet,
      reason: "BookedByUser",
    };

    const updatedBookings = [...allBookings, newBooking];
    saveBookings(updatedBookings);
    setBookings(updatedBookings);
    setRange(undefined);
    setIsSubmitting(false);
    toast.success("Booking successful!");
  };

  const blockedDates = generateBlockedDatesMap(bookings, room.id);

  return (
    <div className="flex flex-col [@media(width>1424px)]:flex-row gap-3 w-9/10 lg:w-3/4 justify-center ">
      <div>
        <BookingCalendar blockedDatesWithReason={blockedDates} />
      </div>
        <BookingForm
          room={room}
          onBook={handleBook}
        />
    </div>
  );
}
