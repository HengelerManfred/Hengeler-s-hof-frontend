
import { Attractions } from "@/widgets/mainPage/attractions";
import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";
import { Rooms } from "@/widgets/mainPage/rooms";

export default async function Home() {

  return (
    <main className="w-[100dvw] flex flex-col items-center gap-[24px]">
      <HeaderCarousel />
      <Rooms />
      <Attractions />
    </main>
  );
}
