import { create } from "zustand";
import { DateRange } from "react-day-picker";
import { BookedDate } from "@/widgets/booking/model/bookingApi";

interface BookingState {
  range: DateRange | undefined;
  isSubmitting: boolean;
  price: number;
  numberOfDays: number;
  bookings: BookedDate[];
  setRange: (range: DateRange | undefined) => void;
  setBookings: (bookings: BookedDate[]) => void;
  setIsSubmitting: (submitting: boolean) => void;
  setPrice: (price: number) => void;
  setNumberOfDays: (numberOfDays: number) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  range: undefined,
  isSubmitting: false,
  price: 0,
  numberOfDays: 0,
  bookings: [],
  setRange: (newRange) => set({ range: newRange }),
  setBookings: (newBookings) => set({bookings: newBookings}),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  setPrice: (price) => set({ price }),
  setNumberOfDays: (numberOfDays) => set({ numberOfDays }),
}));

export const selectPrice = (state: BookingState) => state.price;
export const selectNumberOfDays = (state: BookingState) => state.numberOfDays;