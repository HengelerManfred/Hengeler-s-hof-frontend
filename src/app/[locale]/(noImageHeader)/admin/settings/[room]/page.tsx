import { loadRoomById } from "@/entities/api/rooms.service";
import { loadSlides } from "@/entities/api/slide.service";
import AdminBookingForm from "@/features/booking/adminBookingForm";
import { BookingCalendar } from "@/features/booking/bookingCalendar";
import RoomSettingsForm from "@/features/booking/roomSettingsForm";
import {
  generateBlockedDatesMap,
  loadBookings,
} from "@/widgets/booking/model/bookingApi";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  robots: {
    index: false,
    follow: false,
  },
});

export default async function AdminSettings({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  let slides, roomData, bookings;
  const { room } = await params;

  try {
    slides = (await loadSlides()) ?? [];
    bookings = await loadBookings();
    roomData = await loadRoomById(room);

    if (!roomData) {
      notFound();
    }
  } catch {
    notFound();
  }

  const blockedDates = generateBlockedDatesMap(bookings, roomData?.roomId);
  return (
    <div className="flex w-3/4 flex-col gap-3">
      <div className="flex w-full md:flex-row flex-col gap-3">
        <BookingCalendar
          adminMode={true}
          blockedDatesWithReason={blockedDates}
        ></BookingCalendar>
        <AdminBookingForm roomId={roomData?.id}></AdminBookingForm>
      </div>
      <RoomSettingsForm
        slides={slides}
        room={roomData}
        roomId={room}
      ></RoomSettingsForm>
    </div>
  );
}
