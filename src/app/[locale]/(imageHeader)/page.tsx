import { Attractions } from "@/widgets/mainPage/attractions";
import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";
import { MainMap } from "@/widgets/mainPage/mainMap";
import { Rooms } from "@/widgets/mainPage/rooms";

const slides = [
  {
    id: "1",
    titleKey: "slide1.title",
    textKey: "",
    image: "/images/main.png",
  },
  {
    id: "2",
    titleKey: "slide2.title",
    textKey: "",
    image: "/images/eventsMain.png",
    scrollArrows: true
  },
  {
    id: "3",
    titleKey: "slide3.title",
    textKey: "slide3.text",
    image: "/images/bicycles.png",
  },
];

export default async function Home() {

  return (
    <main className="w-[100dvw] flex pb-[24px] flex-col items-center gap-[24px]">
      <HeaderCarousel slides={slides} />
      <Rooms />
      <Attractions />
      <MainMap />
    </main>
  );
}
