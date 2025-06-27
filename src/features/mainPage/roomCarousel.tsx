"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import clsx from "clsx";
import { BookButton } from "@/shared/ui/buttons/bookButton";
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Slide } from "@/widgets/mainPage/slide";

// const slides = [
//   {
//     id: "smallRoom1",
//     price: "25",
//     image: "/images/rooms/small_room1.jpg",
//   },
//   {
//     id: "smallRoom2",
//     price: "25",
//     image: "/images/rooms/small_room2.jpg",
//   },
//   {
//     id: "smallRoom3",
//     price: "25",
//     image: "/images/rooms/small_room3.jpg",
//   },
//   {
//     id: "bigRoom1",
//     price: "50",
//     image: "/images/rooms/big_room1.jpg",
//   },
//   {
//     id: "bigRoom2",
//     price: "50",
//     image: "/images/rooms/big_room2.jpg",
//   },
//   {
//     id: "bigRoom3",
//     price: "50",
//     image: "/images/rooms/big_room3.jpg",
//   },
//   {
//     id: "bigRoom4",
//     price: "50",
//     image: "/images/rooms/big_room4.jpg",
//   },
// ];

export function RoomCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const tRoomCarousel = useTranslations("RoomCarousel");
  const t = useTranslations("");
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
          <button
            aria-label={t(slide.titleKey)}
            className={clsx(
              "embla__slide mx-[8px] lg:mx-[12px] relative gap-3 flex flex-col items-center !basis-[80vw] lg:!basis-[50vw] transition-opacity duration-300",
              selectedIndex !== index && "opacity-60"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
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
                  src={
                    process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
                    slide.imageUrl
                  }
                  alt={t(slide.titleKey)}
                  fill
                  sizes="(max-width: 768px) 80vw, 50vw"
                  className="object-cover rounded-[16px] select-none pointer-events-none"
                  priority={index === 0}
                />
              </div>
            </div>
            <span
              className={clsx(
                "flex flex-col h-fit xl:flex-row gap-2 xl:gap-20 w-full",
                "transition-opacity duration-300",
                selectedIndex !== index && "opacity-0"
              )}
            >
              <div className="w-full xl:w-7/8">
                {slide.titleKey && (
                  <h2 className="text-[var(--primary-text)] select-none mb-2 font-light text-start text-[24px] md:text-[40px] inter text-4xl">
                    {t(slide.titleKey)}
                  </h2>
                )}
                {slide.descriptionKey && (
                  <p className="text-[var(--primary-text)] select-none font-light text-[16px] md:text-[16px] inter text-justify text-4xl">
                    {t(slide.descriptionKey)}
                  </p>
                )}
              </div>
              <div className="flex xl:flex-col gap-3 justify-center items-center xl:items-start">
                {slide.price && (
                  <div className="text-[var(--primary-text)] select-none leading-none self-end bg-[var(--section-bg)] border w-fit border-[var(--section-border)] p-[10px] rounded-[8px] font-medium text-[16px] md:text-[16px] inter">
                    {tRoomCarousel("priceFrom")} <br />
                    <span className="text-[34px] xl:text-[36px]">
                      {slide.price}
                    </span>
                    {tRoomCarousel("perNight")}
                  </div>
                )}
                <BookButton disabled={selectedIndex !== index} />
              </div>
            </span>
          </button>
        ))}
      </div>
      <Button
        className="!absolute min-w-[50px] !p-0 top-1/3 [@media(min-width:1500px)]:top-2/5 left-7 !hidden lg:!block"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <KeyboardArrowLeftIcon className="text-white !text-[50px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>
      <Button
        aria-label="Next slide"
        className="!absolute top-1/3 [@media(min-width:1500px)]:top-2/5 min-w-[50px] right-10 !p-0 !hidden lg:!block "
        onClick={() => emblaApi?.scrollNext()}
      >
        <KeyboardArrowRightIcon className="text-white  !text-[50px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>
    </div>
  );
}
