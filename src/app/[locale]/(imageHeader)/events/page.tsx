import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";

const slides = [
  {
    id: "2",
    titleKey: "slide2.title",
    image: "/images/eventsMain.png",
    scrollArrows: true
  }
];

export default function Events() {
  return (
    <main>
      <HeaderCarousel slides={slides} />
    </main>
  );
}
