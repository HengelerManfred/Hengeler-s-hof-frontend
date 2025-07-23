
import { Attraction } from "@/shared/types/attraction";
import { getTranslations } from "next-intl/server";

export async function HoverAttractionCard({ attraction }: { attraction: Attraction }) {
  const t =  await getTranslations("Attractions");

  return (
    <div
      key={attraction.id}
      className="relative group overflow-hidden"
      tabIndex={0}
    >
      <div className="relative aspect-video w-full will-change-transform transform transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105">
        <img
          loading="lazy"
          src={attraction.image}
          alt={t(`items.${attraction.id}.title`)}
          className="w-full object-cover h-full absolute"
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
  );
}
