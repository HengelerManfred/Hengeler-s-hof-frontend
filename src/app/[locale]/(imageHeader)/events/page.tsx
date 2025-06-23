import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";
import { Events } from "@/widgets/events/events";
import { loadActiveEvents } from "@/entities/api/events.service";

const slides = [
  {
    id: "2",
    titleKey: "slide2.title",
    image: "/images/eventsMain.png",
    scrollArrows: true
  }
];
// const events: EventExample[] = [
//   {
//     id: "1",
//     titleKey: "event1.title",
//     descriptionKey: "event2.text",
//     date: "14.06.2025-17.08.2025",
//     image: "/images/events/event5.webp",
//     link: "https://oberallgaeu.info/veranstaltungen-im-oberallg%C3%A4u/1525-bauernkrieg-inszenierung-auf-der-freilichtbuhne-altusried",
//   },
//   {
//     id: "2",
//     titleKey: "event2.title",
//     descriptionKey: "event2.text",
//     date: "19.06.2025-22.06.2025",
//     image: "/images/events/event3.webp",
//     link: "https://oberallgaeu.info/veranstaltungen-im-oberallg%C3%A4u/burgfest-in-immenstadt-2025-mit-mittelaltermarkt"
//   },
//   {
//     id: "3",
//     titleKey: "event3.title",
//     descriptionKey: "event3.text",
//     date: "19.06.2025-20.06.2025",
//     image: "/images/events/event4.webp",
//     link: "https://oberallgaeu.info/veranstaltungen-im-oberallg%C3%A4u/kunst-und-handwerkermarkt-in-immenstadt-2025"
//   },
// ];



export default async function EventPage() {
  const events = await loadActiveEvents();

  return (
    <main className="flex flex-col gap-6 items-center">
      <HeaderCarousel slides={slides} />
      <div className="w-9/10 xl:w-3/4 2xl:w-2/3 flex flex-col pb-5 gap-4">
        <Events events={events}></Events>
      </div>
    </main>
  );
}
