import { getTranslations } from "next-intl/server";
import {
  House,
  Wifi,
  Pets,
  OutdoorGrill,
  LocalParking,
} from "@mui/icons-material";
import CribIcon from "@mui/icons-material/Crib";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import WindowIcon from "@mui/icons-material/Window";

export async function Benefits() {
  const t = await getTranslations("Benefits");
  const benefits = [
    { icon: <WindowIcon sx={{ color: "var(--accent)" }} />, label: t("view") },
    { icon: <CribIcon sx={{ color: "var(--accent)" }} />, label: t("crib") },
    { icon: <Wifi sx={{ color: "var(--accent)" }} />, label: t("wifi") },
    {
      icon: <OutdoorGrill sx={{ color: "var(--accent)" }} />,
      label: t("grill"),
    },
    {
      icon: <LocalParking sx={{ color: "var(--accent)" }} />,
      label: t("parking"),
    },
    {
      icon: <SmokeFreeIcon sx={{ color: "var(--accent)" }} />,
      label: t("noSmoking"),
    },
    { icon: <Pets sx={{ color: "var(--accent)" }} />, label: t("pets") },
    { icon: <House sx={{ color: "var(--accent)" }} />, label: t("house") },
  ];

  const topRowBenefits = benefits.slice(0, 5);
  const bottomRowBenefits = benefits.slice(5);

  return (
    <section className="w-9/10 md:w-3/4">
      <div className="hidden md:flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          {topRowBenefits.map((b, i) => (
            <div
              key={`desktop-top-${i}`}
              className="inter text-[var(--primary-text)] text-[18px] flex items-center gap-2 rounded-lg px-4 py-3 bg-[var(--section-bg)] border border-[var(--section-border)] flex-1"
            >
              {b.icon} <span className="text-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {bottomRowBenefits.map((b, i) => (
            <div
              key={`desktop-bottom-${i}`}
              className="inter text-[var(--primary-text)] text-[18px] flex items-center gap-2 rounded-lg px-4 py-3 bg-[var(--section-bg)] border border-[var(--section-border)] flex-1"
            >
              {b.icon} <span className="text-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-3 p-5 bg-[var(--section-bg)] rounded-lg border border-[var(--section-border)]">
        <h3 className="text-2xl font-semibold mb-2">{t("title")}</h3>
        <div className="grid grid-cols-1 [@media(width>562)]:grid-cols-2 gap-x-6 gap-y-3">
          {benefits.map((b, i) => (
            <div
              key={`mobile-${i}`}
              className="flex items-center gap-2 text-[var(--primary-text)] text-base"
            >
              {b.icon}
              <span className="text-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
