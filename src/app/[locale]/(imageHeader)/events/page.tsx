import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";
import { Events } from "@/widgets/events/events";
import { loadActiveEvents } from "@/entities/api/events.service";
import { EventExample } from "@/widgets/events/event";
import { Slide } from "@/widgets/mainPage/slide";
import { createTranslator } from "next-intl";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const locale = (await params).locale;
  const messages = (await import(`@/../messages/${locale}.json`)).default;
  const t = createTranslator({ locale, messages });

  return {
    title: t("EventsMeta.title"),
    description: t("EventsMeta.description"),
    keywords: t("EventsMeta.keywords"),
    alternates: {
      canonical: `/${locale}/events`,
      languages: {
        en: `/en/events`,
        de: `/de/events`,
        uk: `/uk/events`,
      }
    },
    robots: { index: true, follow: true },
  };
};



const slides: Slide[] = [
  {
    id: "2",
    titleKey: "eventTitle",
    imageUrl: "/images/eventsMain.webp",
    localLink: true,
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
  const events: EventExample[] = await loadActiveEvents();

  return (
    <main className="flex flex-col gap-6 items-center">
      <HeaderCarousel slides={slides} />
      <div className="w-9/10 xl:w-3/4 2xl:w-2/3 flex flex-col pb-5 gap-4">
        <Events events={events}></Events>
      </div>
    </main>
  );
}
