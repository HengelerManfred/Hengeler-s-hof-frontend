import { loadRoomById } from "@/entities/api/rooms.service";
import { loadSlides } from "@/entities/api/slide.service";
import AdminBookingForm from "@/features/booking/adminBookingForm";
import { BookingCalendar } from "@/features/booking/bookingCalendar";
import RoomSettingsForm from "@/features/booking/roomSettingsForm";
import {
  generateBlockedDatesMap,
  loadBookings,
} from "@/widgets/booking/model/bookingApi";

export default async function AdminSettings({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const slides = await loadSlides() ?? [];
  const { room } = await params;
  const bookings = await loadBookings();
  const roomData = await loadRoomById(room);

  const blockedDates = generateBlockedDatesMap(bookings, roomData?.id);
  return (
    <div className="flex w-3/4 flex-col gap-3">
      <div className="flex w-full md:flex-row flex-col gap-3">
        <BookingCalendar
          adminMode={true}
          blockedDatesWithReason={blockedDates}
        ></BookingCalendar>
        <AdminBookingForm roomId={roomData?.id}></AdminBookingForm>
      </div>
      <RoomSettingsForm slides={slides} room={roomData} roomId={room}></RoomSettingsForm>
    </div>
  );
}
