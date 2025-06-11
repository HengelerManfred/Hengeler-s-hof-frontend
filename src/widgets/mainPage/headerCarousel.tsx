"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Pause, PlayArrow } from "@mui/icons-material";
import { ProgressCircle } from "@/features/mainPage/progressCircle";
import { useTranslations } from "next-intl";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";

const slides = [
  {
    id: 1,
    titleKey: "slide1.title",
    textKey: "slide1.text",
    image: "/images/main.png",
  },
  {
    id: 2,
    titleKey: "slide2.title",
    textKey: "slide2.text",
    image: "/images/eventsMain.png",
  },
  {
    id: 3,
    titleKey: "slide3.title",
    textKey: "slide3.text",
    image: "/images/bicycles.png",
  },
];

export function HeaderCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const duration = 10000;
  const tick = 100;
  const t = useTranslations("MainCarousel");

  emblaApi?.on("select", () => setProgress(0));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + (tick / duration) * 100, 100);
        if (next >= 100) {
          emblaApi?.scrollNext();
          return 0;
        }
        return next;
      });
    }, tick);
    return () => clearInterval(interval);
  }, [isPlaying, emblaApi]);

  return (
    <div className="embla relative" ref={emblaRef}>
      <div className="embla__container h-[100%] w-[100dvw]">
        {slides.map((slide) => (
          <div
            className="embla__slide relative h-[100dvh] w-[100dvw]"
            key={slide.id}
          >
            <Image
              src={slide.image}
              alt={t(slide.titleKey)}
              fill
              sizes="100vw"
              className="object-cover relative select-none pointer-events-none gradient-overlay md:layer-blur"
              priority
            />
            <span className="flex absolute flex-col gap-20 w-full px-[12.5%] top-1/7 md:top-1/4">
              <h1 className="text-white font-medium text-[24px] md:text-[64px] inter text-center text-4xl">
                {t(slide.titleKey)}
              </h1>
              {t(slide.textKey) && (
                <p className="text-white font-medium text-[16px] md:text-[28px] inter text-justify text-4xl">
                  {t(slide.textKey)}
                </p>
              )}
            </span>
          </div>
        ))}
      </div>
      <button
        className="size-[50px] absolute bottom-10 right-10 rounded-full bg-[var(--accent)]"
        onClick={() => setIsPlaying((p) => !p)}
      >
        {isPlaying ? (
          <Pause className="text-white" />
        ) : (
          <PlayArrow className="text-white" />
        )}
        <ProgressCircle
          progress={progress}
          className="absolute top-0 left-0 z-0"
        />
      </button>
      <Button
        className="!absolute min-w-[50px] !p-0 top-1/2 -translate-y-1/2 left-0"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <KeyboardArrowLeftIcon className="text-white !text-[50px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>
      <Button
        className="!absolute top-1/2 min-w-[50px] right-0 md:right-3 -translate-y-1/2 !p-0"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
      >
        <KeyboardArrowRightIcon className="text-white  !text-[50px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>
    </div>
  );
}
