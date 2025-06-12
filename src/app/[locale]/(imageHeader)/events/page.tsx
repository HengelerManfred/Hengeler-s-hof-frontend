import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";
import { Events } from "@/widgets/events/events";
import { EventExample } from "@/widgets/events/event";

const slides = [
  {
    id: "2",
    titleKey: "slide2.title",
    image: "/images/eventsMain.png",
    scrollArrows: true
  }
];
const events: EventExample[] = [
  {
    id: "4",
    titleKey: "title",
    descriptionKey: "text",
    date: "14.05.2025-19.05.2025",
    image: "/images/events/event1.png",
  },
  {
    id: "0",
    titleKey: "title",
    descriptionKey: "text",
    date: "14.05.2025-19.05.2025",
    image: "/images/events/event1.png",
  },
  {
    id: "1",
    titleKey: "title",
    descriptionKey: "text",
    date: "14.05.2025-19.05.2025",
    image: "/images/events/event1.png",
  },
  {
    id: "2",
    titleKey: "title",
    descriptionKey: "text",
    date: "14.05.2025-19.05.2025",
    image: "/images/events/event1.png",
  }
];
export default function EventPage() {
  return (
    <main className="flex flex-col gap-6 items-center">
      <HeaderCarousel slides={slides} />
      <div className="w-9/10 xl:w-3/4 2xl:w-2/3 flex flex-col gap-4">
        <Events events={events}></Events>
      </div>
    </main>
  );
}
