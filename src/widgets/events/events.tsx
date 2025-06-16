import { CalendarMonth, ReadMore } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { EventExample } from "../events/event";
import clsx from "clsx";

export async function Events({ events }: { events: EventExample[] }) {
  const t = await getTranslations("Event");

  return (
    <>
      {events.map((event, index) => (
        <div
          key={event.id}
          className={clsx(
            "flex flex-col xl:flex-row bg-[var(--section-bg)] min-h-auto xl:min-h-[400px] h-full border rounded-xl border-[var(--section-border)] overflow-hidden",
            index % 2 && "xl:flex-row-reverse"
          )}
        >
          <div className="w-full xl:w-2/3 h-min-[250px] [@media(width<640px)]:h-[300px] [@media(width<1280px)]:h-[600px] relative">
            <Image
              alt="Event image"
              src={event.image}
              fill
              className="object-cover"
            />
          </div>

          <div className="w-full xl:w-1/3 flex flex-col justify-between gap-5 p-5">
            <span className="text-3xl xl:text-4xl text-[var(--primary-text)]">
              {t(event.titleKey)}
            </span>
            <span className="text-[var(--secondary-text)]">
              {t(event.descriptionKey)}
            </span>
            <div className="flex items-center gap-2">
              <CalendarMonth className="text-[var(--secondary-text)]" />
              <span className="text-[var(--secondary-text)]">{event.date}</span>
            </div>
            <a className="w-full" href={event.link} target="_blank">
              <Button variant="default" className="w-full gap-2">
                <ReadMore className="text-[var(--main-bg)]" />
                <span className="text-nowrap">{t("view")}</span>
              </Button>
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
