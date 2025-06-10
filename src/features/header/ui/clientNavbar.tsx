"use client";
import { usePathname } from "next/navigation";
import { NavLink } from "../../../shared/ui/Links/navLink";

export function ClientNavbar({ t }: { t: Record<string, string> }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.endsWith(path);
  return (
    <nav className="flex justify-between items-center gap-[15px] inter text-[#fff] text-[20px]">
      <NavLink href="/booking" isActive={isActive}>
        {t.booking}
      </NavLink>
      <NavLink href="/events" isActive={isActive}>
        {t.events}
      </NavLink>
      <NavLink href="/about" isActive={isActive}>
        {t.about}
      </NavLink>
    </nav>
  );
}
