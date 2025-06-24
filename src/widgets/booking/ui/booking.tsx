
import { BookingCalendar } from "@/features/booking/bookingCalendar";
import { BookingForm } from "@/features/booking/bookingForm";
import { Room } from "../model/roomsData";
import {
  loadBookings,
  generateBlockedDatesMap
} from "../model/bookingApi";

export async function Booking({ room }: { room: Room }) {

  const bookings = await loadBookings();

  const blockedDates = generateBlockedDatesMap(bookings, room.id);

  return (
    <div className="flex flex-col [@media(width>1424px)]:flex-row gap-3 w-9/10 lg:w-3/4 justify-center ">
      <div>
        <BookingCalendar blockedDatesWithReason={blockedDates} />
      </div>
        <BookingForm
          room={room}
        />
    </div>
  );
}
