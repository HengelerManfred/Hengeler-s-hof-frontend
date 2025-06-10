import Link from "next/link";
import clsx from "clsx";

export function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: (path: string) => boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "relative inline-block whitespace-nowrap",
        "after:content-[''] after:absolute after:left-1/2 after:bottom-0",
        "after:h-[2px] after:w-full after:bg-current",
        "after:transform after:-translate-x-1/2 after:origin-center",
        "after:transition-transform after:duration-300 after:ease-in-out",
        isActive(href)
          ? "after:scale-x-100"
          : "after:scale-x-0"
      )}
    >
      {children}
    </Link>
  );
}
