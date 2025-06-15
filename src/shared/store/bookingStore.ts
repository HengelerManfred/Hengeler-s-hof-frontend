import { create } from "zustand";
import { DateRange } from "react-day-picker";

interface BookingState {
  range: DateRange | undefined;
  isSubmitting: boolean;
  setRange: (range: DateRange | undefined) => void;
  setIsSubmitting: (submitting: boolean) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  range: undefined,
  isSubmitting: false,
  setRange: (newRange) => set({ range: newRange }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
}));
