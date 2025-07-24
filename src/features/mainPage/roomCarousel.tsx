"use client";

import React, { useRef, useState, startTransition, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { BookButton } from "@/shared/ui/buttons/bookButton";
import { Slide } from "@/widgets/mainPage/slide";
import { Feature, PriceItem } from "@/entities/api/adminSettings.service";
import { PriceInfoPopover } from "@/widgets/booking/ui/priceInfoPopover";

interface RoomCarouselProps {
  slides: Slide[];
  features: Feature[];
  priceList: PriceItem[];
}

export function RoomCarousel({ slides, features, priceList }: RoomCarouselProps) {
  const t = useTranslations("");
  const tRoomCarousel = useTranslations("RoomCarousel");

  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const update = () => swiperRef.current?.update();
    window.addEventListener("load", update);
    return () => window.removeEventListener("load", update);
  }, []);

  const onSlideChange = (swiper: SwiperType) => {
    startTransition(() => setSelectedIndex(swiper.realIndex));
  };

  const bookingDisabled = !features.find((f) => f.featureName === "booking-enabled")?.isActive;
  const looping = slides.length > 1;

  return (
    <div className="relative w-full overflow-visible">
      <Swiper
        modules={[Navigation]}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={onSlideChange}
        centeredSlides
        effect="slide"
        speed={500}
        centeredSlidesBounds
        slidesPerView="auto"
        spaceBetween={16}
        loop={looping}
        observer
        observeParents
        navigation={{ nextEl: ".room-next", prevEl: ".room-prev" }}
        className="w-[100dvw]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className={clsx(
              "!flex !justify-center mx-[8px] lg:mx-[12px] transition-opacity! duration-400",
              "!w-[80vw] lg:!w-[50vw]",
              selectedIndex === index ? "opacity-100" : "opacity-60"
            )}
          >
            <button
              aria-label={t(slide.titleKey)}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              className="flex flex-col gap-3 items-center w-full"
            >

              <div className="flex w-full aspect-video justify-center items-center">
                <div
                  className={clsx(
                    "relative w-full aspect-video transition-all duration-400",
                    selectedIndex !== index && "xl:w-[85%]"
                  )}
                >
                  <img
                    loading="lazy"
                    src={
                      process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
                      slide.imageUrl
                    }
                    alt={slide?.titleKey ? t(slide.titleKey) : "room image"}
                    className="object-cover h-full w-full rounded-[16px] select-none pointer-events-none"
                    onLoad={() => swiperRef.current?.update()}
                  />
                </div>
              </div>

              <span
                className={clsx(
                  "flex flex-col xl:flex-row gap-2 xl:gap-20 w-full transition-opacity duration-300",
                  selectedIndex !== index && "opacity-0"
                )}
              >
                <div className="w-full xl:w-7/8">
                  {slide.titleKey && (
                    <h2 className="text-[var(--primary-text)] mb-2 font-light text-start text-[24px] md:text-[40px] inter select-none">
                      {t(slide.titleKey)}
                    </h2>
                  )}
                  {slide.descriptionKey && (
                    <p className="text-[var(--primary-text)] font-light text-[16px] md:text-[16px] inter text-justify select-none">
                      {t(slide.descriptionKey)}
                    </p>
                  )}
                </div>

                <div className="flex xl:flex-col gap-3 justify-center items-center xl:items-start">
                  {bookingDisabled ? (
                    slide.price && (
                      <div className="text-[var(--primary-text)] select-none leading-none bg-[var(--section-bg)] border border-[var(--section-border)] p-[10px] rounded-[8px] font-medium text-[16px] inter">
                        {tRoomCarousel("priceFrom")} <br />
                        <span className="text-[34px] xl:text-[36px]">{slide.price}</span>
                        {tRoomCarousel("perNight")}
                      </div>
                    )
                  ) : (
                    <div className="text-[var(--primary-text)] flex flex-col items-start select-none leading-none bg-[var(--section-bg)] border border-[var(--section-border)] p-[10px] rounded-[8px] font-medium text-[16px] inter">
                      {tRoomCarousel("priceFrom") + ":"} <br />
                      <span className="flex items-end">
                        <span className="text-[34px] xl:text-[36px]">{priceList[0]?.price}</span>
                        <span className="flex items-center">
                          {tRoomCarousel("perNight")}
                          <div className="relative w-5 h-5">
                            <PriceInfoPopover items={priceList} />
                          </div>
                        </span>
                      </span>
                    </div>
                  )}
                  <BookButton disabled={selectedIndex !== index} />
                </div>
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {looping && (
        <>
          <Button
            className="room-prev !absolute min-w-[50px] !p-0 top-1/3 [@media(min-width:1500px)]:top-2/5 left-7 !hidden lg:!block z-10"
            aria-label="Previous slide"
          >
            <KeyboardArrowLeftIcon className="text-white !text-[50px] md:!text-[70px]" />
          </Button>
          <Button
            className="room-next !absolute min-w-[50px] !p-0 top-1/3 [@media(min-width:1500px)]:top-2/5 right-10 !hidden lg:!block z-10"
            aria-label="Next slide"
          >
            <KeyboardArrowRightIcon className="text-white !text-[50px] md:!text-[70px]" />
          </Button>
        </>
      )}
    </div>
  );
}

export default RoomCarousel;