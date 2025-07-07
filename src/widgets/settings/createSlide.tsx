"use client";
import { Slide } from "./../mainPage/slide";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { ImagePicker } from "@/widgets/ImagePicker";
import toast from "react-hot-toast";
import { createSlide, updateSlide } from "@/entities/api/slide.service";
import { loadTranslations } from "@/entities/api/translation.service";

export function CreateSlide({
  selectedSlide,
  closeDialog,
}: {
  selectedSlide?: Slide | null;
  closeDialog?: () => void;
}) {
  const t = useTranslations("AdminSlides");
  const [images, setImages] = useState<File[]>([]);
  const [currentLang, setCurrentLang] = useState<"uk" | "en" | "de">("uk");
  const [slideText, setSlideText] = useState({
    uk: "",
    en: "",
    de: "",
  });

  const [currentTitleLang, setCurrentTitleLang] = useState<"uk" | "en" | "de">(
    "uk"
  );
  const [titleText, setTitleText] = useState({
    uk: "",
    en: "",
    de: "",
  });

  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState<{
    price?: string;
  }>({});

  const handleTextChange = (text: string) => {
    setSlideText((prev) => ({
      ...prev,
      [currentLang]: text,
    }));
  };

  useEffect(() => {
    if (!selectedSlide) return;

    const loadData = async () => {
      try {
        const translations = await loadTranslations();

        setTitleText({
          uk: translations.uk[selectedSlide.titleKey] ?? "",
          en: translations.en[selectedSlide.titleKey] ?? "",
          de: translations.de[selectedSlide.titleKey] ?? "",
        });

        setSlideText({
          uk: translations.uk[selectedSlide.descriptionKey ?? ""] ?? "",
          en: translations.en[selectedSlide.descriptionKey ?? ""] ?? "",
          de: translations.de[selectedSlide.descriptionKey ?? ""] ?? "",
        });
      } catch (err) {
        console.error("Ошибка загрузки переводов:", err);
      }

      if (selectedSlide.imageUrl) {
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
              selectedSlide.imageUrl
          );
          const blob = await res.blob();
          const filename = selectedSlide.imageUrl.split("/").pop() || "image";
          setImages([new File([blob], filename, { type: blob.type })]);
        } catch (err) {
          console.error("Ошибка загрузки изображения:", err);
        }
      }

      if (selectedSlide.price !== undefined && selectedSlide.price !== null) {
        setPrice(String(selectedSlide.price));
      }
    };

    loadData();
  }, [selectedSlide]);

  const validatePriceField = () => {
    const newErrors: typeof errors = {};

    const isInteger = (value: string) => /^\d+$/.test(value);

    if (!price.length) {
      return true;
    }

    if (!price) {
      newErrors.price = t("required");
    } else if (!isInteger(price)) {
      newErrors.price = t("onlyIntegers");
    } else if (Number.parseInt(price) <= 0) {
      newErrors.price = t("shouldBeMoreThan0");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setTitleText({ uk: "", en: "", de: "" });
    setSlideText({ uk: "", en: "", de: "" });
    setPrice("");
    setImages([]);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validatePriceField()) return;

    const formData = new FormData();
    formData.append("UkTitle", titleText.uk);
    formData.append("EnTitle", titleText.en);
    formData.append("DeTitle", titleText.de);
    formData.append("UkDescription", slideText.uk);
    formData.append("EnDescription", slideText.en);
    formData.append("DeDescription", slideText.de);
    formData.append("Price", price);
    if (images[0]) formData.append("Image", images[0]);

    try {
      if (!selectedSlide) {
        await createSlide(formData);
      } else {
        formData.append("Id", selectedSlide.id);
        formData.append("TitleKey", selectedSlide.titleKey);
        formData.append("DescriptionKey", selectedSlide.descriptionKey ?? "");
        await updateSlide(formData, selectedSlide.id);
      }
      toast.success(t("slideSaved"));
      reset();
      closeDialog?.();
    } catch (err) {
      console.error(err);
      toast.error(t("errorSavingSlide"));
    }
  };

  return (
    <div
      className={clsx(
        "relative h-full rounded bg-[var(--section-bg)] py-[10px] px-5  flex flex-col gap-4",
        selectedSlide
          ? "w-full"
          : "w-full 2xl:w-[45%] border border-[var(--section-border)]"
      )}
    >
      <span className="text-[20px] font-medium">{t("createSlide")}</span>
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium">{t("slideTitle")}</label>
            <div className="flex gap-2">
              {(["uk", "en", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setCurrentTitleLang(lang)}
                  className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                    currentTitleLang === lang
                      ? "bg-[var(--section-bg)] border-[var(--accent)] text-[var(--primary-text)]"
                      : "bg-transparent text-[var(--section-border)]"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={4}
            className="bg-[var(--section-bg)] border border-[var(--section-border)] h-full rounded p-2 outline-none resize-none"
            placeholder={`${t(
              "slideTextPlaceholder"
            )} (${currentTitleLang.toUpperCase()})`}
            value={titleText[currentTitleLang]}
            onChange={(e) =>
              setTitleText({ ...titleText, [currentTitleLang]: e.target.value })
            }
          />
        </div>
        <label className="text-[16px] font-medium">{t("chooseImage")}</label>
        <ImagePicker
          maxFiles={1}
          width={33}
          height={8}
					initialPreviews={images}
          onPreviewsChange={(newPreviews) => setImages(newPreviews)}
        />

        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium">{t("slideText")}</label>
            <div className="flex gap-2">
              {(["uk", "en", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setCurrentLang(lang)}
                  className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                    currentLang === lang
                      ? "bg-[var(--section-bg)] border-[var(--accent)] text-[var(--primary-text)]"
                      : "bg-transparent text-[var(--section-border)]"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={4}
            className="bg-[var(--section-bg)] border border-[var(--section-border)] h-full rounded p-2 outline-none resize-none"
            placeholder={`${t(
              "slideTextPlaceholder"
            )} (${currentLang.toUpperCase()})`}
            value={slideText[currentLang]}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block mb-1">{t("price")}</label>
        <input
          type="number"
          value={price}
          inputMode="numeric"
          onChange={(e) => {
            const val = e.target.value;
            setPrice(val);
            setErrors((prev) => ({
              ...prev,
              price: undefined,
            }));
          }}
          className={clsx(
            "px-2 py-1  w-full bg-transparent outline-none border border-[var(--section-border)] rounded-lg",
            errors.price && "border-red-500"
          )}
        />
        {errors.price && (
          <p className="text-sm text-red-500 mt-1">{errors.price}</p>
        )}
      </div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "var(--accent)",
          "&:hover": { backgroundColor: "var(--accent)" },
          alignSelf: "start",
        }}
      >
        {t("save")}
      </Button>
    </div>
  );
}
