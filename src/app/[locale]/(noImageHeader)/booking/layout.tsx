"use client";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import HotelIcon from "@mui/icons-material/Hotel";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import KingBedIcon from "@mui/icons-material/KingBed";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useBookingStore } from "@/shared/store/bookingStore";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Booking");
  const pathname = usePathname();
  const [value, setValue] = useState<number | null>(null);
  const setRange = useBookingStore((state) => state.setRange);
  const navLinks = [
    { href: "/booking/room1", label: t("room1") },
    { href: "/booking/room2", label: t("room2") },
    { href: "/booking/room3", label: t("room3") },
    { href: "/booking/house", label: t("house") },
  ];

  const mobileNavItems = [
    {
      href: "/booking/room1",
      label: t("room1"),
      icon: <HotelIcon />,
    },
    {
      href: "/booking/room2",
      label: t("room2"),
      icon: <SingleBedIcon />,
    },
    {
      href: "/booking/room3",
      label: t("room3"),
      icon: <KingBedIcon />,
    },
    { href: "/booking/house", label: t("house"), icon: <HomeIcon /> },
  ];

  useEffect(() => {
    const activeIndex = mobileNavItems.findIndex((item) =>
      pathname.includes(item.href)
    );
    if (activeIndex !== -1) {
      setValue(activeIndex);
    }
  }, [pathname]);

  return (
    <>
      <nav className="flex flex-col inter items-center gap-8 mb-4 md:mb-12 mt-4">
        <h2 className="text-[28px] px-[5%] lg:px-[12.5%] text-center sm:text-[48px] w-full break-words lg:text-[64px] md:text-[56px] font-light m-0">
          {t("availabilityTitle")}
        </h2>
        <ul className="hidden md:flex flex-wrap justify-center gap-4 list-none p-0 m-0">
          {navLinks.map((link) => {
            const isActive = pathname.includes(link.href);
            const activeClasses = isActive
              ? "bg-[var(--accent)] text-[var(--main-bg)] border border-transparent"
              : "bg-[var(--section-bg)] text-[var(--primary-text)] border border-[var(--section-border)]";

            return (
              <li key={link.href} className="transition-all duration-300">
                <Link
                  href={link.href}
                  className={`rounded-lg p-5 text-2xl transition-all duration-300 ease-in-out ${activeClasses}`}
                  onClick={() => setRange(undefined)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Box sx={{ width: "100%" }} className="fixed md:hidden bottom-0 z-4">
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className="bg-[var(--section-bg)] border-t text-nowrap border-[var(--section-border)]"
            sx={{
              height: "80px",
              "& .MuiBottomNavigationAction-root": {
                color: "var(--primary-text)",
                "&.Mui-selected": {
                  color: "var(--accent)",
                },
              },
            }}
          >
            {mobileNavItems.map((item) => (
              <BottomNavigationAction
                key={item.href}
                label={item.label}
                icon={item.icon}
                component={Link}
                href={item.href}
                onClick={() => setRange(undefined)}
              />
            ))}
          </BottomNavigation>
        </Box>
      </nav>
      {children}
    </>
  );
}
