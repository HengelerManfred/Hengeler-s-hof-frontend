"use client";
import { useTranslations } from "next-intl";
import { Slide } from "./../mainPage/slide";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { CreateSlide } from "./createSlide";
import CloseIcon from "@mui/icons-material/Close";
export function SlideList({ slides }: { slides: Slide[] }) {
  const tAdminSlides = useTranslations("AdminSlides");
  const t = useTranslations("");
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const closeDialog = () => {
    setSelectedSlide(null);
  };
  return (
    <div className="relative w-[54%] rounded bg-[var(--section-bg)] py-[10px] px-5 border border-[var(--section-border)] flex flex-col gap-4">
      <span className="text-[20px] font-medium">{tAdminSlides("slides")}</span>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="flex justify-start relative border border-[var(--section-border)] rounded gap-3"
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
              slide.imageUrl
            }
            alt="Slide preview"
            sizes="15vw"
            width={184}
            height={114}
            className="static h-auto aspect-video rounded object-cover"
          />
          <div className="flex flex-col w-full gap-2">
            <label className="text-[16px] font-medium">
              {t(slide.titleKey)}
            </label>
            {slide.descriptionKey && <div> {t(slide.descriptionKey)}</div>}
          </div>
          <div className="flex flex-col justify-around border-l border-[var(--section-border)] items-center gap-2 w-[5.5%]">
            <EditIcon
              onClick={() => {
                setSelectedSlide(slide);
              }}
              className="text-[var(--accent-2)] cursor-pointer !size-auto"
            />
            <DeleteIcon className="text-[var(--accent-2)] cursor-pointer !size-auto" />
          </div>
        </div>
      ))}
      <Dialog
        open={Boolean(selectedSlide)}
        onClose={() => {
          setSelectedSlide(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogContent className="flex flex-col items-end">
          <CloseIcon
            onClick={closeDialog}
            className="cursor-pointer text-[var(--accent-2)]"
          />
          <CreateSlide
            closeDialog={() => {
              setSelectedSlide(null);
            }}
            selectedSlide={selectedSlide}
          ></CreateSlide>
        </DialogContent>
      </Dialog>
    </div>
  );
}
