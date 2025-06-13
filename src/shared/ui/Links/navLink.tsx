"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (href.includes("booking")) {
      setShouldAnimate(pathname.includes("booking"));
    } else {
      setShouldAnimate(pathname === href || pathname.endsWith(href));
    }
  }, [href, pathname]);

  return (
    <Link
      href={href}
      className={clsx(
        "relative inline-block whitespace-nowrap",
        "after:content-[''] after:absolute after:left-1/2 after:bottom-0",
        "after:h-[2px] after:w-full after:bg-current",
        "after:transform after:-translate-x-1/2 after:origin-center",
        "after:transition-transform after:duration-300 after:ease-in-out",
        shouldAnimate ? "after:scale-x-100" : "after:scale-x-0"
      )}
    >
      {children}
    </Link>
  );
}
