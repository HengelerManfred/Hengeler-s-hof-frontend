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
    titleKey: "slide5.title",
    textKey: "slide5.text",
    image: "/images/deer.jpg"
  },
  {
    id: "3",
    titleKey: "slide4.title",
    textKey: "slide4.text",
    image: "/images/house2.jpg"
  },
  {
    id: "4",
    titleKey: "slide6.title",
    textKey: "slide6.text",
    image: "/images/house3.jpg"
  },
  {
    id: "5",
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
