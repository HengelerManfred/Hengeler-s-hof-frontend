"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import clsx from "clsx";
import { BookButton } from "@/shared/ui/buttons/bookButton";

const slides = [
  {
    id: "smallRoom1",
    price: "25",
    image: "/images/rooms/small_room1.jpg",
  },
  {
    id: "smallRoom2",
    price: "25",
    image: "/images/rooms/small_room2.jpg",
  },
  {
    id: "smallRoom3",
    price: "25",
    image: "/images/rooms/small_room3.jpg",
  },
  {
    id: "bigRoom1",
    price: "50",
    image: "/images/rooms/big_room1.jpg",
  },
  {
    id: "bigRoom2",
    price: "50",
    image: "/images/rooms/big_room2.jpg",
  },
  {
    id: "bigRoom3",
    price: "50",
    image: "/images/rooms/big_room3.jpg",
  },
  {
    id: "bigRoom4",
    price: "50",
    image: "/images/rooms/big_room4.jpg",
  },
];

export function RoomCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const t = useTranslations("RoomCarousel");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="embla !overflow-visible" ref={emblaRef}>
      <div className="embla__container w-[100dvw]">
        {slides.map((slide, index) => (
          <div
            className={clsx(
              "embla__slide mx-[8px] lg:mx-[12px] relative gap-3 flex flex-col items-center !basis-[80vw] lg:!basis-[50vw] transition-opacity duration-300",
              selectedIndex !== index && "opacity-60"
            )}
            key={slide.id}
          >
            <div className="flex w-full aspect-video justify-center items-center">
              <div
                className={clsx(
                  "relative w-[100%] aspect-video transition-width duration-300",
                  selectedIndex !== index && "!w-[100%] lg:!w-[85%]"
                )}
              >
                <Image
                  src={slide.image}
                  alt={t(`rooms.${slide.id}.title`)}
                  fill
                  sizes="(max-width: 768px) 80vw, 50vw"
                  className="object-cover rounded-[16px] select-none pointer-events-none gradient-overlay md:layer-blur"
                  priority
                />
              </div>
            </div>
            <span
              className={clsx(
                "flex flex-col h-fit lg:flex-row gap-2 lg:gap-20 w-full",
                "transition-opacity duration-300",
                selectedIndex !== index && "opacity-0"
              )}
            >
              <div className="w-full lg:w-7/8">
                <h2 className="text-[var(--primary-text)] select-none mb-2 font-light text-[24px] md:text-[40px] inter text-4xl">
                  {t(`rooms.${slide.id}.title`)}
                </h2>
                <p className="text-[var(--primary-text)] select-none font-light text-[16px] md:text-[16px] inter text-justify text-4xl">
                  {t(`rooms.${slide.id}.text`)}
                </p>
              </div>
              <div className="flex lg:flex-col gap-3 justify-end items-center lg:items-start">
                <div className="text-[var(--primary-text)] select-none leading-none self-end bg-[var(--section-bg)] border w-fit border-[var(--section-border)] p-[10px] rounded-[8px] font-medium text-[16px] md:text-[16px] inter">
                  {t("priceFrom")} <br />
                  <span className="text-[34px] lg:text-[36px]">
                    {slide.price}
                  </span>{" "}
                  {t("perNight")}
                </div>
                <BookButton disabled={selectedIndex !== index}/>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
