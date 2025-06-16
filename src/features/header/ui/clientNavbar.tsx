import { NavLink } from "../../../shared/ui/Links/navLink";
export function ClientNavbar({ t }: { t: Record<string, string> }) {
  return (
    <nav className="flex justify-between items-center gap-[15px] inter text-[#fff] text-[20px]">
      <NavLink href="/booking/room1">{t.booking}</NavLink>
      <NavLink href="/events">{t.events}</NavLink>
      {/* <NavLink href="/about">{t.about}</NavLink> */}
    </nav>
  );
}
