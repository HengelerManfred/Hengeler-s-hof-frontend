"use client";
import { useBurgerStore } from "@/shared/store/burgerStore";
import { TextLogo } from "@/shared/ui/textLogo";
import { clsx } from "clsx";
import { useEffect } from "react";

export function BurgerButton() {
  const isOpen = useBurgerStore((state) => state.isOpen);
  const toggle = useBurgerStore((state) => state.toggle);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="flex justify-between items-center gap-9 py-[10px] min-w-3/4">
      <h1>
        <TextLogo />
      </h1>
      <button
        onClick={toggle}
        className="flex flex-col justify-between w-9 h-6 cursor-pointer"
        aria-label="Toggle menu"
      >
        <span
          className={clsx(
            "block w-full h-0.75 bg-white transition-transform duration-300 origin-center",
            isOpen && "rotate-45 translate-y-[10.5px]"
          )}
        ></span>
        <span
          className={clsx(
            "block w-full h-0.75 bg-white transition-all duration-300",
            isOpen && "opacity-0 rotate-45"
          )}
        ></span>
        <span
          className={clsx(
            "block w-full h-0.75 bg-white transition-transform duration-300 origin-center",
            isOpen && "-rotate-45 -translate-y-[10.5px]"
          )}
        ></span>
      </button>
    </div>
  );
}
