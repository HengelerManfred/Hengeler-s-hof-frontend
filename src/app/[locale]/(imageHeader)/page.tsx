
import { Attractions } from "@/widgets/mainPage/attractions";
import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";
import { MainMap } from "@/widgets/mainPage/mainMap";
import { Rooms } from "@/widgets/mainPage/rooms";

export default async function Home() {

  return (
    <main className="w-[100dvw] flex pb-[24px] flex-col items-center gap-[24px]">
      <HeaderCarousel />
      <Rooms />
      <Attractions />
      <MainMap />
    </main>
  );
}
