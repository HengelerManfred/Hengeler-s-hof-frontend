"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export function MainMap() {
  const t = useTranslations("MainMap");

  const LeafletMap = useMemo(
    () =>
      dynamic(() => import("@/shared/ui/leafletMap"), {
        loading: () => <p>{t("loading")}</p>,
        ssr: false,
      }),
    [t]
  );

  return (
    <section className="w-9/10 lg:w-3/4 flex flex-col gap-[24px] min-h-[300px]">
      <h2 className="text-[24px] md:text-[64px] inter text-nowrap font-light content-center text-[var(--primary-text)]">
        {t("title")}
      </h2>
      <LeafletMap />
    </section>
  );
}
