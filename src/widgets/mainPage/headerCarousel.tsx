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
import { Slide } from "./slide";
import clsx from "clsx";
import { ScrollArrows } from "@/shared/ui/scrollArrows/scrollArrows";

export function HeaderCarousel({ slides }: { slides: Slide[] }) {
  const singleSlide = slides.length === 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    active: !singleSlide,
  });
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const duration = 10000;
  const tick = 100;
  const t = useTranslations("MainCarousel");

  useEffect(() => {
    if (!emblaApi) return;

    const handler = () => setProgress(0);
    emblaApi.on("select", handler);

    return () => {
      emblaApi.off("select", handler);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!isPlaying || singleSlide) return;
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
  }, [isPlaying, emblaApi, singleSlide]);

  return (
    <div className="embla relative animate-fadeIn-75" ref={emblaRef}>
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
            <span
              className={clsx(
                "flex absolute flex-col gap-20 w-full px-[12.5%]",
                !slide?.textKey && "top-1/3 md:top-1/3",
                slide?.textKey && "top-1/3 md:top-1/4"
              )}
            >
              <h1
                className={clsx(
                  "text-white font-medium text-[24px] md:text-[48px] lg:text-[64px] inter text-center text-4xl",
                  singleSlide && ""
                )}
              >
                {t(slide.titleKey)}
              </h1>
              {slide.textKey && (
                <p className="text-white font-medium text-[16px] md:text-[20px] lg:text-[28px] inter text-justify text-4xl">
                  {t(slide.textKey)}
                </p>
              )}
            </span>
            {slide.scrollArrows && (
              <span className="absolute w-full top-2/3 left-0 items-center justify-center flex">
                <ScrollArrows />
              </span>
            )}
          </div>
        ))}
      </div>
      {!singleSlide && (
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
      )}
      {!singleSlide && (
        <Button
          className="!absolute !min-w-[50px] !p-0 top-1/2 -translate-y-1/2 left-0 !rounded-full !bg-[rgba(0,0,0,0.3)]"
          aria-label="Previous slide"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <KeyboardArrowLeftIcon className="text-white !text-[50px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
        </Button>
      )}
      {!singleSlide && (
        <Button
          className="!absolute top-1/2 !min-w-[50px] right-0 md:right-3 -translate-y-1/2 !p-0 !rounded-full !bg-[rgba(0,0,0,0.3)]"
          aria-label="Next slide"
          onClick={() => emblaApi?.scrollNext()}
        >
          <KeyboardArrowRightIcon className="text-white  !text-[50px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
        </Button>
      )}
    </div>
  );
}
