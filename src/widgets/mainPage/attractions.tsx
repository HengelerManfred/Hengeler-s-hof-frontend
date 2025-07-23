import { HoverAttractionCard } from "@/features/mainPage/hoverAttractionCard";
import { getTranslations } from "next-intl/server";

const attractions = [
  {
    id: "forests",
    image: "/images/attractions/forest.webp",
  },
  {
    id: "hohenschwangau",
    image: "/images/attractions/castle2.webp",
  },
  {
    id: "gorge",
    image: "/images/attractions/cave.webp",
  },
  {
    id: "hopfenSee",
    image: "/images/attractions/sea.webp",
  },
  {
    id: "mountains",
    image: "/images/attractions/mountains.webp",
  },
  {
    id: "neuschwanstein",
    image: "/images/attractions/castle1.webp",
  },
];

export async function Attractions() {
  const t = await getTranslations("Attractions");

  return (
    <section className="w-9/10 lg:w-3/4 flex flex-col gap-[24px]">
      <h2 className="text-[24px] md:text-[64px] inter text-nowrap font-light content-center text-[var(--primary-text)]">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 [@media(width>=1370px)]:grid-cols-3 rounded-lg">
        {attractions.map((attraction) => (
          <HoverAttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </section>
  );
}
