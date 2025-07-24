"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Pause,
  PlayArrow,
} from "@mui/icons-material";

import { useTranslations } from "next-intl";
import clsx from "clsx";

import { ProgressCircle } from "@/features/mainPage/progressCircle";
import { ScrollArrows } from "@/shared/ui/scrollArrows/scrollArrows";
import type { Slide } from "./slide";

interface HeaderCarouselProps {
  slides: Slide[];
}

const DURATION = 10_000;

export function HeaderCarousel({ slides }: HeaderCarouselProps) {
  const t = useTranslations("");

  const swiperRef = useRef<SwiperType | null>(null);
  const rafId = useRef<number>(null);
  const startTs = useRef<number>(0);
  const pausedAccum = useRef<number>(0);
  const playingRef = useRef<boolean>(true);
  const mounted = useRef(false);

  const singleSlide = slides.length === 1;

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const loop = useCallback(() => {
    if (!playingRef.current) return;
    const now = performance.now();
    const elapsed = now - startTs.current + pausedAccum.current;
    let pct = (elapsed / DURATION) * 100;

    if (pct >= 100) {
      pct = 0;
      pausedAccum.current = 0;
      startTs.current = performance.now();
      swiperRef.current?.slideNext();
    }
    setProgress(pct);
    rafId.current = requestAnimationFrame(loop);
  }, []);

  const startLoop = useCallback(() => {
    pausedAccum.current = 0;
    startTs.current = performance.now();
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(loop);
  }, [loop]);

  const stopLoop = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    pausedAccum.current += performance.now() - startTs.current;
  }, []);

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    playingRef.current = next;

    if (next) {
      startTs.current = performance.now();
      rafId.current = requestAnimationFrame(loop);
    } else {
      stopLoop();
    }
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const reset = () => {
      if (!playingRef.current) return;
      pausedAccum.current = 0;
      startTs.current = performance.now();
      setProgress(0);
    };

    swiper.on("slideChange", reset);
    return () => swiper.off("slideChange", reset);
  }, []);

  const handleSwiper = (s: SwiperType) => {
    swiperRef.current = s;
    if (!singleSlide) {
      startLoop();
    }
  };

  return (
    <div className="relative animate-fadeIn-75">
      <Swiper
        modules={[Navigation]}
        loop={!singleSlide}
        speed={800}
        onSwiper={handleSwiper}
        navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
        className="h-[100dvh] w-[100dvw]"
      >
        {slides.map((slide, index) => {
          const Tag = index ? ("h2" as const) : ("h1" as const);
          return (
            <SwiperSlide key={slide.id}>
              <div className="relative h-[100dvh] w-[100dvw]">
                <img
                  src={
                    !slide.localLink
                      ? process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
                        slide.imageUrl
                      : slide.imageUrl
                  }
                  loading="lazy"
                  alt={t(slide.titleKey)}
                  className="object-cover select-none pointer-events-none md:layer-blur h-full w-full"
                />

                <div
                  className={clsx(
                    "absolute inset-0",
                    slide.descriptionKey && "gradient-signature",
                    !slide.descriptionKey && "gradient-no-signature"
                  )}
                />

                <span
                  className={clsx(
                    "flex absolute flex-col gap-20 w-full px-[12.5%] 2xl:px-[20%]",
                    "top-1/3 md:top-1/3"
                  )}
                >
                  {slide.titleKey && (
                    <Tag className="text-white font-medium text-[24px] md:text-[48px] lg:text-[64px] inter text-center">
                      {t(slide.titleKey)}
                    </Tag>
                  )}
                  {slide.descriptionKey && (
                    <p className="text-white font-medium text-[16px] md:text-[20px] lg:text-[28px] inter text-justify">
                      {t(slide.descriptionKey)}
                    </p>
                  )}
                </span>

                {slide.scrollArrows && (
                  <span
                    onClick={() =>
                      document.getElementById("slide0")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="absolute w-full top-2/3 left-0 flex justify-center"
                  >
                    <ScrollArrows />
                  </span>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {!singleSlide && (
        <>
          <button
            className="size-[50px] absolute bottom-10 right-10 rounded-full bg-[var(--accent)] z-10"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="text-white" /> : <PlayArrow className="text-white" />}
            <ProgressCircle progress={progress} className="absolute top-0 left-0 z-0" />
          </button>

          <Button
            className="swiper-prev !absolute !min-w-[50px] !p-0 top-1/2 -translate-y-1/2 z-10 left-0 !rounded-full !bg-[rgba(0,0,0,0.3)]"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <KeyboardArrowLeft className="text-white !text-[50px] md:!text-[70px]" />
          </Button>

          <Button
            className="swiper-next !absolute top-1/2 !min-w-[50px] right-0 md:right-3 z-10 -translate-y-1/2 !p-0 !rounded-full !bg-[rgba(0,0,0,0.3)]"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <KeyboardArrowRight className="text-white !text-[50px] md:!text-[70px]" />
          </Button>
        </>
      )}
    </div>
  );
}
