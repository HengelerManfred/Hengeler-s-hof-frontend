"use client";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Contacts } from "@/entities/model/contacts";

export function WhereWeAre({contacts}: {contacts: Contacts}) {
  const t = useTranslations("MainMap");
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState<number | null>(null);

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/shared/ui/leafletMap"), {
        loading: () => {
          return (
            <Skeleton
              variant="rectangular"
              width="100%"
              className="[@media(width>2200px)]:!h-[124px] 2xl:!h-[306px] lg:!h-[204px] md:!h-[254px] sm:!h-[300px] [@media(width<640px)]:!h-[300px]"
            />
          );
        },
        ssr: false,
      }),
    [mapHeight]
  );

  useEffect(() => {
    const measure = () => {
      if (textContainerRef.current) {
        if (window.innerWidth > 640) {
          setMapHeight(textContainerRef.current.offsetHeight);
        } else {
          setMapHeight(300);
        }
      }
    };

    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="flex gap-3 inter h-full backface-hidden [@media(width>2200px)]:flex-col text-[var(--primary-text)] w-full flex-col sm:flex-row">
      <div
        ref={textContainerRef}
        className=" sm:w-1/3 w-full flex flex-col [@media(width>2200px)]:w-full gap-3 p-5 bg-[var(--section-bg)] rounded-lg border border-[var(--section-border)]"
      >
        <h4 className="text-[20px]">{t("whereWeAreTitle")}</h4>
        <p className="text-sm text-[var(--secondary-text)]">
          {t("whereWeAreDescription")}
        </p>
      </div>
      <div className="sm:w-2/3 w-full px-[5%] sm:px-0 [@media(width>2200px)]:w-full">
        <LeafletMap contacts={contacts} height={`${mapHeight}px`} scrollWheelZoom={true} />
      </div>
    </div>
  );
}
