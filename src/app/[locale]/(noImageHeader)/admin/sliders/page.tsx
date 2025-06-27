import { loadSlides } from "@/entities/api/slide.service";
import { loadHeaderSlider, loadRoomSlider } from "@/entities/api/slider.service";
import { HeaderSlidePicker } from "@/features/slidePicker/headerSlidePicker";
import { RoomSlidePicker } from "@/features/slidePicker/roomSlidePicker";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  robots: {
    index: false,
    follow: false,
  },
});

export default async function Sliders () {
  let headerSlider, roomSlider, slides
  try {
    headerSlider = await loadHeaderSlider();
    roomSlider = await loadRoomSlider();
    slides = await loadSlides();
  } catch {
    notFound();
  }

  return <div className="w-3/4">
    <HeaderSlidePicker slider={headerSlider} slides={slides}></HeaderSlidePicker>
    <RoomSlidePicker slider={roomSlider} slides={slides}></RoomSlidePicker>
  </div>
}