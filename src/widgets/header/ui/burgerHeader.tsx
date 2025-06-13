"use client";
import clsx from "clsx";
import { BurgerButton } from "./burgerButton";
import NavDropdown from "./navDropdown";
import { useBurgerStore } from "@/shared/store/burgerStore";

export default function BurgerHeader({ hasImage }: { hasImage?: boolean }) {
  const isOpen = useBurgerStore((state) => state.isOpen);
  return (
    <>
      <header
        id="header"
        className={clsx(
          "w-[100dvw] flex [@media(min-width:1248px)]:hidden justify-center z-1000",
          "transition-bg duration-300 ease-in-out",
          !hasImage && "relative bg-[var(--accent)]",
          hasImage && "absolute bg-transparent",
          isOpen && "!bg-[var(--accent)]"
        )}
      >
        <BurgerButton />
      </header>
      <NavDropdown />
    </>
  );
}
