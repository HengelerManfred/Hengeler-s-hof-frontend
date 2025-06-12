"use client";
import { Button } from "@mui/material";
import { RoomImage } from "../model/roomsData";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export default function BookingCarousel({ images }: { images: RoomImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className="embla w-full relative h-full rounded-lg transition-opacity animate-fadeIn" ref={emblaRef}>
      <div className="embla__container h-full flex">
        {images.map((image) => (
          <div
            key={image.src}
            className="embla__slide h-full shrink-0 grow-0 basis-full"
          >
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={image.src}
                alt="Foto vom Zimmer"
                fill
                sizes="(max-width: 768px) 90vw, 60vw"
                className="object-cover"
              />
            </div>
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
