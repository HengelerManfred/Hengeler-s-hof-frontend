"use client";
import { useTranslations } from "next-intl";
import { Slide } from "./../mainPage/slide";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { CreateSlide } from "./createSlide";
import CloseIcon from "@mui/icons-material/Close";
import { deleteSlide } from "@/entities/api/slide.service";
import toast from "react-hot-toast";
export function SlideList({ slides }: { slides: Slide[] }) {
  const tAdminSlides = useTranslations("AdminSlides");
  const t = useTranslations("");
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const closeDialog = () => {
    setSelectedSlide(null);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteSlide(id);
      toast.success("Слайд видалено");
    } catch (error) {
      console.error(error);
      toast.error("Щось пішло не так");
    }
  };
  return (
    <div className="relative w-full 2xl:w-[54%] rounded bg-[var(--section-bg)] h-full py-[10px] px-5 border border-[var(--section-border)] overflow-y-scroll flex flex-col gap-4">
      <span className="text-[20px] font-medium">{tAdminSlides("slides")}</span>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="flex flex-col lg:flex-row justify-start relative h-9/10 border border-[var(--section-border)] rounded gap-3"
        >
          <img
            src={
              process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
              slide.imageUrl
            }
            alt="Slide preview"
            className="static h-auto aspect-video w-full  lg:w-1/2 rounded object-cover"
          />
          <div className="flex flex-col w-full gap-2">
            <label className="text-[16px] font-medium">
              {slide.titleKey && <div>{t(slide.titleKey)}</div>}
            </label>
            {slide.descriptionKey && <div> {t(slide.descriptionKey)}</div>}
          </div>
          <div className="flex lg:flex-col justify-around border-l border-[var(--section-border)] items-center gap-2 min-w-[35px]">
            <EditIcon
              onClick={() => {
                setSelectedSlide(slide);
              }}
              className="text-[var(--accent-2)] cursor-pointer lg:!size-auto"
            />
            <DeleteIcon
              onClick={() => handleDelete(slide.id)}
              className="text-[var(--accent-2)] cursor-pointer lg:!size-auto"
            />
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
