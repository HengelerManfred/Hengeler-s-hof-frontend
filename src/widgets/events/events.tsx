"use client";
import { CalendarMonth, ReadMore } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { EventExample } from "../events/event";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useScrollRefStore } from "@/shared/store/scrollRefStore";
export function Events({ events }: { events: EventExample[] }) {
    const t = useTranslations("Event");
    const scrollRef = useRef<HTMLDivElement>(null);
    const { setWrapperRef } = useScrollRefStore();
    useEffect(() => {
        if (scrollRef.current) {
            setWrapperRef(scrollRef);
        }
    }, []);
    return (<>
        {events.map((event, index) => (
            <div
                ref={index ? null : scrollRef}
                key={event.id}
                className={clsx(
                    "flex flex-col xl:flex-row bg-[var(--section-bg)] h-full border rounded-xl border-[var(--section-border)] overflow-hidden",
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

                <div className="w-full xl:w-1/3 flex flex-col gap-5 p-5">
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
                    <Button variant="default">
                        <ReadMore className="text-[var(--main-bg)]" />
                        <span className="text-nowrap">{t("view")}</span>
                    </Button>
                </div>
            </div>
        ))}
    </>
    )
}