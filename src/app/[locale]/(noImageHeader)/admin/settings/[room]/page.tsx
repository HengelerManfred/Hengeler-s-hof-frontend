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
import AdminSettingsForm from "@/features/booking/adminSettingsForm";
import { loadFeatures, loadPriceList } from "@/entities/api/adminSettings.service";

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
  let slides, roomData, bookings, features, priceList;
  const { room } = await params;

  try {
    slides = (await loadSlides()) ?? [];
    bookings = await loadBookings();
    roomData = await loadRoomById(room);
    features = await loadFeatures();
    priceList = await loadPriceList();
    if (!roomData) {
      notFound();
    }
  } catch {
    notFound();
  }

  const blockedDates = generateBlockedDatesMap(bookings, roomData?.roomId);
  return (
    <div className="flex w-9/10 lg:w-3/4 flex-col gap-3">
      <div className="flex w-full md:flex-row flex-col gap-3">
        <BookingCalendar
          adminMode={true}
          blockedDatesWithReason={blockedDates}
        ></BookingCalendar>
        <div className="gap-3 flex flex-col">
          <AdminBookingForm roomId={roomData?.roomId}></AdminBookingForm>
          <AdminSettingsForm features={features} priceList={priceList}></AdminSettingsForm>
        </div>
      </div>
      <RoomSettingsForm
        slides={slides}
        room={roomData}
        roomId={room}
      ></RoomSettingsForm>
    </div>
  );
}
