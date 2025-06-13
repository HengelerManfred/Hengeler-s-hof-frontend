import { getRoomData } from "@/widgets/booking/model/roomsData";
import { Benefits } from "@/widgets/booking/ui/benefits";
import RoomsSlider from "@/widgets/booking/ui/bookingCarousel";
import { RoomCard } from "@/widgets/booking/ui/roomCard";
import { WhereWeAre } from "@/widgets/booking/ui/whereWeAre";
import { notFound } from "next/navigation";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  const roomData = getRoomData(room);
  if (!roomData) {
    notFound();
  }
  return (
    <main className="w-[100dvw] flex flex-col items-center gap-[24px]">
      <section className="flex gap-[12px] w-9/10 md:w-3/4 lg:flex-row flex-col">
        <div className="lg:w-6/10 w-full lg:h-[inherit] h-[400px]">
          <RoomsSlider images={roomData.images} />
        </div>
        <div className="lg:w-4/10 w-full flex flex-col gap-[12px]">
          <RoomCard room={roomData} />
          <div className="w-full hidden 2xl:block">
            <WhereWeAre />
          </div>
        </div>
      </section>
      <div className="2xl:hidden w-9/10 md:w-3/4">
        <WhereWeAre />
      </div>
      <Benefits />
    </main>
  );
}
