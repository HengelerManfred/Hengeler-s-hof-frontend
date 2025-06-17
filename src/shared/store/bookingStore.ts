import { create } from "zustand";
import { DateRange } from "react-day-picker";

interface BookingState {
  range: DateRange | undefined;
  isSubmitting: boolean;
  price: number;
  numberOfDays: number;
  setRange: (range: DateRange | undefined) => void;
  setIsSubmitting: (submitting: boolean) => void;
  setPrice: (price: number) => void;
  setNumberOfDays: (numberOfDays: number) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  range: undefined,
  isSubmitting: false,
  price: 0,
  numberOfDays: 0,
  setRange: (newRange) => set({ range: newRange }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  setPrice: (price) => set({ price }),
  setNumberOfDays: (numberOfDays) => set({ numberOfDays }),
}));

export const selectPrice = (state: BookingState) => state.price;
export const selectNumberOfDays = (state: BookingState) => state.numberOfDays;