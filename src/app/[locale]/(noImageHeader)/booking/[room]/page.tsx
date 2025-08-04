import { Room } from "@/widgets/booking/model/roomsData";
import { Benefits } from "@/widgets/booking/ui/benefits";
import RoomsSlider from "@/widgets/booking/ui/bookingCarousel";
import { Booking } from "@/widgets/booking/ui/booking";
import { RoomCard } from "@/widgets/booking/ui/roomCard";
import { WhereWeAre } from "@/widgets/booking/ui/whereWeAre";
import { notFound } from "next/navigation";
import { loadContacts } from "@/entities/api/contact.service";
import { loadRoomById } from "@/entities/api/rooms.service";
import { createTranslator } from "next-intl";
import { Metadata } from "next";
import { loadFeatures } from "@/entities/api/adminSettings.service";
import { clsx } from "clsx";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string; room: string }>;
}): Promise<Metadata> => {
  const locale = (await params).locale;
  const room = (await params).room;
  const messages = (await import(`@/../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });
  const roomData: Room = await loadRoomById(room);
  if (!roomData) {
    return notFound();
  }

  return {
    title: t("BookingMeta.title"),
    description: t("BookingMeta.description"),
    keywords: t("BookingMeta.keywords"),
    robots: { index: true, follow: true },
    metadataBase: new URL(process.env.NEXT_PUBLIC_CURRENT_HOST!),
    alternates: {
      canonical: `/${locale}/booking/${room}`,
      languages: {
        en: `/en/booking/${room}`,
        de: `/de/booking/${room}`,
        uk: `/uk/booking/${room}`,
        "x-default": `/booking/${room}`,
      },
    },
    openGraph: {
      title: t("BookingMeta.title"),
      description: t("BookingMeta.description"),
      images: [{
        url:
          process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) + roomData.slides[0]?.imageUrl,
        alt: "Room preview",
      }],
    },
  };
};

export default async function RoomPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  const features = await loadFeatures();
  const isBookingMode = features.find(
    (f) => f.featureName == "booking-enabled"
  )?.isActive;
  const roomData: Room = await loadRoomById(room);
  const contacts = await loadContacts();
  if (!roomData) {
    return notFound();
  }
  return (
    <main
      className={clsx(
        "w-[100dvw] flex flex-col pb-20 items-center gap-[24px]",
        !isBookingMode
          ? "[@media(width>1424px)]:h-[1550px] 2xl:h-[1700px] xl:h-[1800px] [@media(width>2000px)]:h-[1400px]"
          : "h-auto"
      )}
    >
      <section className="flex gap-[12px] w-9/10 md:w-3/4 lg:flex-row flex-col">
        <div className="lg:w-6/10 w-full lg:h-[inherit] h-[400px]">
          <RoomsSlider slides={roomData.slides} />
        </div>
        <div className="lg:w-4/10 w-full flex flex-col gap-[12px]">
          <RoomCard room={roomData} />
          <div className="w-full hidden 2xl:block">
            <WhereWeAre contacts={contacts} />
          </div>
        </div>
      </section>
      <div className="2xl:hidden w-9/10 md:w-3/4">
        <WhereWeAre contacts={contacts} />
      </div>
      <Benefits />
      {!isBookingMode && <Booking room={roomData} />}
    </main>
  );
}
