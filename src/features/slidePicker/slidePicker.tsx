"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";
import { Slide } from "@/widgets/mainPage/slide";

type SlidePickerProps = {
  allSlides: Slide[];
  selectedSlides: Slide[];
  maxSlides?: number;
  onChange: (slides: Slide[]) => void;
  width?: number | string;
  height?: number | string;
  className?: string;
};

type SortableSlideProps = {
  slide: Slide;
  width: string | number;
  height: string | number;
  onRemove: (id: string) => void;
};

function SortableSlide({ slide, width, height, onRemove }: SortableSlideProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slide.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: typeof width === "number" ? width + "px" : width,
    height: typeof height === "number" ? height + "px" : height,
    border: "1px solid var(--section-border)",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={
          process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
          slide.imageUrl
        }
        alt={`slide-${slide.id}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <CloseIcon
        fontSize="small"
        onClick={() => onRemove(slide.id)}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export function SlidePicker({
  allSlides,
  selectedSlides,
  maxSlides = 3,
  onChange,
  width = "130px",
  height = "80px",
  className = "",
}: SlidePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleSelect = (slide: Slide) => {
    if (selectedSlides.find((s) => s.id === slide.id)) return;
    if (selectedSlides.length >= maxSlides) return;
    onChange([...selectedSlides, slide]);
    setIsOpen(false);
  };

  const handleRemove = (id: string) => {
    onChange(selectedSlides.filter((s) => s.id !== id));
  };

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = selectedSlides.findIndex((s) => s.id === active.id);
      const newIndex = selectedSlides.findIndex((s) => s.id === over.id);
      onChange(arrayMove(selectedSlides, oldIndex, newIndex));
    }
  };

  const boxStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}` : width,
    height: typeof height === "number" ? `${height}` : height,
    border: "2px dashed var(--section-border)",
    background: "var(--section-bg)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
    cursor: "pointer",
    position: "relative",
  };

  return (
    <div className={`flex flex-wrap gap-3 items-center ${className}`}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={selectedSlides.map((s) => s.id)} strategy={rectSortingStrategy}>
          {selectedSlides.map((slide) => (
            <SortableSlide
              key={slide.id}
              slide={slide}
              width={width}
              height={height}
              onRemove={handleRemove}
            />
          ))}
        </SortableContext>
        
      </DndContext>

      {selectedSlides.length < maxSlides && (
        <>
          <div style={boxStyle} onClick={() => setIsOpen(true)}>
            <span style={{ fontSize: 24, color: "var(--section-border)", userSelect: "none" }}>+</span>
          </div>

          <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="lg" scroll="body">
            <DialogTitle sx={{ m: 0, p: 2 }}>
              <p className="w-full text-center text-[36px] inter text-[var(--primary-text)]">
                Виберіть слайд
              </p>
              <IconButton
                aria-label="close"
                onClick={() => setIsOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                rowGap: "30px",
                height: "80vh",
                overflowY: "auto",
              }}
            >
              {allSlides.map((slide) => (
                <Box
                  key={slide.id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    padding: "20px",
                    height: "fit-content",
                    border: "1px solid var(--section-border)",
                  }}
                  className="w-full lg:w-[49%]"
                  onClick={() => handleSelect(slide)}
                >
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "16/9",
                      position: "relative",
                    }}
                  >
                    <img
                      src={
                        process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
                        slide.imageUrl
                      }
                      alt={`slide-${slide.id}`}
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                  </Box>
                  {slide.titleKey && <p className="mt-4 font-bold">{t(slide.titleKey)}</p>}
                  {slide.descriptionKey && <p>{t(slide.descriptionKey)}</p>}
                  {slide.price && <p>{t("slideWithPrice") + ": " + slide.price}</p>}
                </Box>
              ))}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}