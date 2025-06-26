"use client";

import { Slider, updateRoomSlider } from "@/entities/api/slider.service";
import { SlidePicker } from "./slidePicker";
import { Slide } from "@/widgets/mainPage/slide";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export function RoomSlidePicker({
  slider,
  slides,
}: {
  slider: Slider;
  slides: Slide[];
}) {

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
    } catch {
      console.error("error");
    }
  };
  return (
    <div>
      <h2>RoomSlider</h2>
      <SlidePicker
        selectedSlides={currentSlides}
        onChange={setCurrentSlides}
        maxSlides={10}
        allSlides={slides}
      ></SlidePicker>
      <Button variant="default" onClick={handleSubmit}>
        SaveChanges
      </Button>
    </div>
  );
}
