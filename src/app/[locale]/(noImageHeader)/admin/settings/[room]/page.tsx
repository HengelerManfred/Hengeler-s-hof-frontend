import AdminBookingForm from "@/features/booking/adminBookingForm";
import { BookingCalendar } from "@/features/booking/bookingCalendar";
import RoomSettingsForm from "@/features/booking/roomSettingsForm";
import {
  generateBlockedDatesMap,
  loadBookings,
} from "@/widgets/booking/model/bookingApi";
import { getRoomData } from "@/widgets/booking/model/roomsData";
import { notFound } from "next/navigation";

export default async function AdminSettings({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  const bookings = await loadBookings();
  const roomData = getRoomData(room);
  if (!roomData) {
    return notFound();
  }
  const blockedDates = generateBlockedDatesMap(bookings, roomData.id);
  return (
    <div className="flex w-3/4 flex-col gap-3">
      <div className="flex w-full md:flex-row flex-col gap-3">
        <BookingCalendar
          adminMode={true}
          blockedDatesWithReason={blockedDates}
        ></BookingCalendar>
        <AdminBookingForm roomId={roomData.id}></AdminBookingForm>
      </div>
      <RoomSettingsForm room={roomData}></RoomSettingsForm>
    </div>
  );
}
