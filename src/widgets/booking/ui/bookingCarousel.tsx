"use client";
import { Button } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { Slide } from "@/widgets/mainPage/slide";

export default function BookingCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const t = useTranslations("");
  return (
    <div className="embla w-full relative h-full rounded-lg transition-opacity animate-fadeIn" ref={emblaRef}>
      <div className="embla__container h-full flex">
        {slides.map((image) => (
          <div
            key={image.id}
            className="embla__slide h-full shrink-0 grow-0 basis-full"
          >
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) + image.imageUrl}
                alt="Foto vom Zimmer"
                fill
                sizes="(max-width: 768px) 90vw, 60vw"
                className="object-cover"
              />
            </div>
            {image.titleKey && <h3 className="text-white text-[36px] absolute bottom-10 w-full text-center">{t(image.titleKey)}</h3>}
          </div>
        ))}
      </div>
      <Button
        className="!absolute !min-w-[50px] !p-0  top-1/2 -translate-y-1/2 md:left-3 !rounded-full !bg-[rgba(0,0,0,0.5)]"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <KeyboardArrowLeft className="text-white !text-[40px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>

      <Button
        className="!absolute top-1/2 !min-w-[50px] right-0 md:right-3 -translate-y-1/2 !p-0 !rounded-full !bg-[rgba(0,0,0,0.5)]"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
      >
        <KeyboardArrowRight className="text-white  !text-[40px] md:!text-[70px] !h-[50px] md:!h-[70px]" />
      </Button>
    </div>
  );
}

