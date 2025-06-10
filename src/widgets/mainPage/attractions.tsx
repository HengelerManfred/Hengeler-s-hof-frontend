"use client";
import { useTranslations } from "next-intl";

import Image from "next/image";

const attractions = [
  {
    id: "forests",
    image: "/images/attractions/forest.jpeg",
  },
  {
    id: "hohenschwangau",
    image: "/images/attractions/castle2.webp",
  },
  {
    id: "gorge",
    image: "/images/attractions/cave.jpeg",
  },
  {
    id: "hopfenSee",
    image: "/images/attractions/sea.jpg",
  },
  {
    id: "mountains",
    image: "/images/attractions/mountains.jpg",
  },
  {
    id: "neuschwanstein",
    image: "/images/attractions/castle1.jpg",
  },
];

export function Attractions() {
  const t = useTranslations("Attractions");

  return (
    <section className="w-9/10 lg:w-3/4 flex flex-col gap-[24px]">
      <h2 className="text-[24px] md:text-[64px] inter text-nowrap font-light content-center text-[var(--primary-text)]">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-lg">
        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            className="relative group overflow-hidden"
            tabIndex={0}
          >
            <div className="relative aspect-video w-full will-change-transform transform transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105">
              <Image
                src={attraction.image}
                alt={attraction.id}
                fill
                style={{ objectFit: "fill" }}
              />
              <div
                className="absolute inset-0 
              bg-gradient-to-b from-transparent to-black/40 
              group-hover:bg-black/40 
              group-focus-within:bg-black/40 
              transition-colors duration-300"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 text-white flex flex-col items-center gap-2 transition-all duration-500">
              <h2
                className="text-[20px] md:text-[24px] font-semibold text-center
                transition-transform duration-500
                group-hover:translate-y-[-10px] group-focus-within:translate-y-[-10px]"
              >
                {t(`items.${attraction.id}.title`)}
              </h2>

              <p
                className="max-h-0 overflow-hidden opacity-0 transition-all duration-500
                group-hover:max-h-[200px] group-hover:opacity-100
                group-focus-within:max-h-[200px] group-focus-within:opacity-100
                text-[16px] text-center font-light"
              >
                {t(`items.${attraction.id}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
