import { ScrollArrows } from "@/shared/ui/scrollArrows/scrollArrows";
import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";

const slides = [
  {
    id: "2",
    titleKey: "slide2.title",
    textKey: "slide2.text",
    image: "/images/eventsMain.png",
    interactive: <ScrollArrows />
  }
];

export default function Events() {
  return (
    <main>
      <HeaderCarousel slides={slides} />
    </main>
  );
}
