"use client";

import { useRef } from "react";
import { Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { Slide } from "@/widgets/mainPage/slide";

export default function BookingCarousel({ slides }: { slides: Slide[] }) {
  const t = useTranslations("");
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative w-full h-full rounded-lg transition-opacity animate-fadeIn">
      <Swiper
        modules={[Navigation]}
        loop
        onSwiper={(s) => (swiperRef.current = s)}
        navigation={{
          prevEl: ".booking-prev",
          nextEl: ".booking-next",
        }}
        className="w-full h-full"
      >
        {slides.map((image) => (
          <SwiperSlide key={image.id} className="h-full">
            <div className="relative w-full h-full rounded overflow-hidden">
              <img
                loading={"lazy"}
                src={
                  process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
                  image.imageUrl
                }
                alt="Foto vom Zimmer"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            {image.titleKey && (
              <p className="text-white text-[36px] absolute bottom-10 w-full text-center">
                {t(image.titleKey)}
              </p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        className="booking-prev !absolute !min-w-[50px] !p-0 top-1/2 -translate-y-1/2 md:left-3 !rounded-full !bg-[rgba(0,0,0,0.5)] z-10"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <KeyboardArrowLeft className="text-white !text-[40px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>

      <Button
        className="booking-next !absolute top-1/2 !min-w-[50px] right-0 md:right-3 -translate-y-1/2 !p-0 !rounded-full !bg-[rgba(0,0,0,0.5)] z-10"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <KeyboardArrowRight className="text-white !text-[40px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>
    </div>
  );
}
