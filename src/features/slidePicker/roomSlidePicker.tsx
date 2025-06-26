"use client";

import { Slider, updateRoomSlider } from "@/entities/api/slider.service";
import { SlidePicker } from "./slidePicker";
import { Slide } from "@/widgets/mainPage/slide";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export function RoomSlidePicker({
  slider,
  slides,
}: {
  slider: Slider;
  slides: Slide[];
}) {

  const t = useTranslations("AdminSettings");
  const [currentSlides, setCurrentSlides] = useState<Slide[]>([]);
  useEffect(() => {
    if(!slider.id) return;
    setCurrentSlides(slider.slides);
  }, [slider]);

  const handleSubmit = async () => {
    try {
      await updateRoomSlider(
        currentSlides.map((s) => s.id),
        slider.id
      );
      toast.success(t("Success"));
    } catch {
      console.error("error");
      toast.error(t("Error"));
    }
  };
  return (
    <div className="p-5 border border-[var(--section-border)] flex flex-col gap-2 bg-[var(--section-bg)] inter text-[var(--primary-text)]">
      <h2 className="text-2xl">{t("RoomSlider")}</h2>
      <SlidePicker
        selectedSlides={currentSlides}
        onChange={setCurrentSlides}
        maxSlides={15}
        allSlides={slides}
      ></SlidePicker>
      <Button variant="default" onClick={handleSubmit}>
      {t("Save")}
      </Button>
    </div>
  );
}
