"use client";

import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
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
  const t = useTranslations("");
  const handleSelect = (slide: Slide) => {
    if (selectedSlides.find((s) => s.id === slide.id)) return;
    if (selectedSlides.length >= maxSlides) return;
    onChange([...selectedSlides, slide]);
    setIsOpen(false);
  };

  const handleRemove = (id: string) => {
    onChange(selectedSlides.filter((s) => s.id !== id));
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
      {selectedSlides.map((slide) => (
        <div
          key={slide.id}
          style={{ ...boxStyle, border: "1px solid var(--section-border)" }}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
              slide.imageUrl
            }
            alt={`slide-${slide.id}`}
            width={1400}
            height={1000}
            style={{ width: width, height: height, objectFit: "cover" }}
          />
          <CloseIcon
            fontSize="small"
            onClick={() => handleRemove(slide.id)}
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
      ))}

      {selectedSlides.length < maxSlides && (
        <>
          <div style={boxStyle} onClick={() => setIsOpen(true)}>
            <span
              style={{
                fontSize: 24,
                color: "var(--section-border)",
                userSelect: "none",
              }}
            >
              +
            </span>
          </div>

          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            fullWidth
            maxWidth="lg"
            scroll="body"
          >
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
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
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
                  onClick={() => {
                    handleSelect(slide);
                    setIsOpen(false);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "16/9",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(
                          0,
                          -1
                        ) + slide.imageUrl
                      }
                      alt={`slide-${slide.id}`}
                      fill
                      sizes={"40vw"}
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                  </Box>
                  <p>{t(slide.titleKey)}</p>
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
