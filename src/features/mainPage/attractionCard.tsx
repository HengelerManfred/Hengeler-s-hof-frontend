import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface AttractionCardProps {
  id: string;
  image: string;
}

export async function AttractionCard({ id, image }: AttractionCardProps) {
  const t = await getTranslations("Attractions");

  return (
    <div className="flex flex-col gap-4 bg-[var(--section-bg)] p-6 rounded-lg border border-[var(--section-border)]">
      <div className="relative aspect-video w-full">
        <Image
          src={image}
          alt={t(`items.${id}.title`)}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="text-xl font-medium text-[var(--primary-text)]">
        {t(`items.${id}.title`)}
      </h3>
      <p className="text-[var(--primary-text)] text-base">
        {t(`items.${id}.description`)}
      </p>
    </div>
  );
}
