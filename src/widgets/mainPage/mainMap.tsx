"use client";
import { Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Contacts } from "@/entities/model/contacts";

export function MainMap({contacts}:{contacts: Contacts}) {
  const t = useTranslations("MainMap");

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/shared/ui/leafletMap"), {
        loading: () => <Skeleton variant="rectangular" width="100%" height={400} />,
        ssr: false,
      }),
    [t]
  );

  return (
    <section className="w-9/10 lg:w-3/4 flex flex-col gap-[24px] min-h-[300px]">
      <h2 className="text-[24px] md:text-[64px] inter text-nowrap font-light content-center text-[var(--primary-text)]">
        {t("title")}
      </h2>
      <div className="px-[2.5%] lg:p-0">
        <LeafletMap contacts={contacts}/>
      </div>
    </section>
  );
}
