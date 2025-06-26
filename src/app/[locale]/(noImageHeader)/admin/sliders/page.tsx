import { loadSlides } from "@/entities/api/slide.service";
import { loadHeaderSlider, loadRoomSlider } from "@/entities/api/slider.service";
import { HeaderSlidePicker } from "@/features/slidePicker/headerSlidePicker";
import { RoomSlidePicker } from "@/features/slidePicker/roomSlidePicker";

export default async function Sliders () {
  const headerSlider = await loadHeaderSlider();
  const roomSlider = await loadRoomSlider();
  const slides = await loadSlides();
  return <div className="w-3/4">
    <HeaderSlidePicker slider={headerSlider} slides={slides}></HeaderSlidePicker>
    <RoomSlidePicker slider={roomSlider} slides={slides}></RoomSlidePicker>
  </div>
}