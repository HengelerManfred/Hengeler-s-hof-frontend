"use client";
import { Room } from "@/widgets/booking/model/roomsData";
import { Button, ClickAwayListener, Popper } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import { SlidePicker } from "../slidePicker/slidePicker";
import { Slide } from "@/widgets/mainPage/slide";
import { createRoom, CreateRoomDto } from "@/entities/api/rooms.service";
import { loadTranslations } from "@/entities/api/translation.service";
import toast from "react-hot-toast";

export default function RoomSettingsForm({
  room,
  slides,
  roomId
}: {
  room: Room;
  slides: Slide[];
  roomId: string;
}) {
  const t = useTranslations("RoomSettings");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [size, setSize] = useState(0);
  const [currentPersonLang, setCurrentPersonLang] = useState<
    "uk" | "en" | "de"
  >("uk");
  const [personQuantity, setPersonQuantity] = useState({
    uk: "",
    en: "",
    de: "",
  });

  const [currentNameLang, setCurrentNameLang] = useState<"uk" | "en" | "de">(
    "uk"
  );
  const [name, setName] = useState({
    uk: "",
    en: "",
    de: "",
  });

  const [pickerOpen, setPickerOpen] = useState<"startTime" | "endTime" | null>(
    null
  );

  const [currentDescLang, setCurrentDescLang] = useState<"uk" | "en" | "de">(
    "uk"
  );

  const [descText, setDescText] = useState({
    uk: "",
    en: "",
    de: "",
  });

  const [pickerAnchorEl, setPickerAnchorEl] = useState<SVGSVGElement | null>(
    null
  );

  const [selectedSlides, setSelectedSlides] = useState<Slide[]>([]);

  const [pricePerDay, setPricePerDay] = useState("");
  const [additionalPricePerDay, setAdditionalPricePerDay] = useState("");

  const [errors, setErrors] = useState<{
    pricePerDay?: string;
    additionalPricePerDay?: string;
  }>({});

  useEffect(() => {
    if (!room || !room.id) return;

    setStartTime(room.checkIn);
    setEndTime(room.checkOut);
    setSize(room.size);
    setPricePerDay(room.price.toString());
    setAdditionalPricePerDay(room.additionalPrice.toString());

    const runAsync = async () => {
      try {
        const translations = await loadTranslations();

        setName({
          uk: translations.uk[room.nameKey],
          en: translations.en[room.nameKey],
          de: translations.de[room.nameKey],
        });

        setDescText({
          uk: translations.uk[room.descriptionKey],
          en: translations.en[room.descriptionKey],
          de: translations.de[room.descriptionKey],
        });

        setPersonQuantity({
          uk: translations.uk[room.maxGuestsKey],
          en: translations.en[room.maxGuestsKey],
          de: translations.de[room.maxGuestsKey],
        });

        const selected = room.slides;

        setSelectedSlides(selected);
      } catch (error) {
        console.error(error);
        toast.error("Помилка при завантаженні перекладів або слайдів:");
      }
    };

    runAsync();
  }, [room]);

  const validatePriceFields = () => {
    const newErrors: typeof errors = {};

    const isInteger = (value: string) => /^\d+$/.test(value);

    if (!pricePerDay) {
      newErrors.pricePerDay = t("required");
    } else if (!isInteger(pricePerDay)) {
      newErrors.pricePerDay = t("onlyIntegers");
    }

    if (!additionalPricePerDay) {
      newErrors.additionalPricePerDay = t("required");
    } else if (!isInteger(additionalPricePerDay)) {
      newErrors.additionalPricePerDay = t("onlyIntegers");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async () => {
    if (!validatePriceFields()) return;

    let resultData: CreateRoomDto;
    if (room.id) {
      resultData = {
        id: room.id,
        roomId: roomId,
        descriptionKey: room.descriptionKey,
        maxGuestsKey: room.maxGuestsKey,
        nameKey: room.nameKey,
        nameDe: name["de"],
        nameEn: name["en"],
        nameUk: name["uk"],
        maxGuestsDe: personQuantity["de"],
        maxGuestsEn: personQuantity["en"],
        maxGuestsUk: personQuantity["uk"],
        descriptionDe: descText["de"],
        descriptionUk: descText["uk"],
        descriptionEn: descText["en"],
        price: parseInt(pricePerDay),
        additionalPrice: parseInt(additionalPricePerDay),
        slideIds: selectedSlides.map((s) => s.id),
        checkIn: startTime,
        checkOut: endTime,
        size: size,
      };
    } else {
      resultData = {
        roomId: roomId,
        nameDe: name["de"],
        nameEn: name["en"],
        nameUk: name["uk"],
        maxGuestsDe: personQuantity["de"],
        maxGuestsEn: personQuantity["en"],
        maxGuestsUk: personQuantity["uk"],
        descriptionDe: descText["de"],
        descriptionUk: descText["uk"],
        descriptionEn: descText["en"],
        price: parseInt(pricePerDay),
        additionalPrice: parseInt(additionalPricePerDay),
        slideIds: selectedSlides.map((s) => s.id),
        checkIn: startTime,
        checkOut: endTime,
        size: size,
      };
    }
    try {
      await createRoom(resultData);
      toast.success("Дані оновлено");
    } catch (error) {
      console.error(error);
      toast.error("Щось пішло не так");
    }
  };

  return (
    <div className="w-full h-fit p-5 flex flex-col gap-3 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg inter text-[var(--primary-text)]">
      <h2>{t("Settings") + room.roomId}</h2>
      <div className="flex gap-3">
        <div className="flex flex-col w-1/2">
          <label htmlFor="startTime" className="text-[16px] mb-1">
            {t("startTime")}
          </label>
          <div
            className={clsx(
              "bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg h-[30px]",
              "flex items-center px-2"
            )}
          >
            <input
              id="startTime"
              name="startTime"
              className="bg-transparent outline-none h-full flex-grow"
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
            />
            <AccessTimeIcon
              onClick={(e) => {
                setPickerOpen("startTime");
                setPickerAnchorEl(e.currentTarget);
              }}
              sx={{ cursor: "pointer", ml: 1 }}
              fontSize="small"
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="endTime" className="text-[16px] mb-1">
            {t("time")}
          </label>
          <div
            className={clsx(
              "bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg h-[30px]",
              "flex items-center px-2"
            )}
          >
            <input
              id="endTime"
              name="endTime"
              className="bg-transparent outline-none h-full flex-grow"
              onChange={(e) => setEndTime(e.target.value)}
              value={endTime}
            />
            <AccessTimeIcon
              onClick={(e) => {
                setPickerOpen("endTime");
                setPickerAnchorEl(e.currentTarget);
              }}
              sx={{ cursor: "pointer", ml: 1 }}
              fontSize="small"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium">
              {t("guestQuantity")}
            </label>
            <div className="flex gap-2">
              {(["uk", "en", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setCurrentPersonLang(lang)}
                  className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                    currentPersonLang === lang
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
            className="bg-[var(--section-bg)] border px-2 border-[var(--section-border)] rounded-lg h-[28px] outline-none resize-none"
            value={personQuantity[currentPersonLang]}
            onChange={(e) =>
              setPersonQuantity({
                ...personQuantity,
                [currentPersonLang]: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex w-full flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium">{t("name")}</label>
            <div className="flex gap-2">
              {(["uk", "en", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setCurrentNameLang(lang)}
                  className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                    currentNameLang === lang
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
            className="bg-[var(--section-bg)] border px-2 border-[var(--section-border)] rounded-lg h-[28px] outline-none resize-none"
            value={name[currentNameLang]}
            onChange={(e) =>
              setName({
                ...name,
                [currentNameLang]: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-3">
        <div>
          <label className="block mb-1">{t("pricerPerDay")}</label>
          <input
            type="number"
            value={pricePerDay}
            inputMode="numeric"
            onChange={(e) => {
              const val = e.target.value;
              setPricePerDay(val);
              setErrors((prev) => ({ ...prev, pricePerDay: undefined }));
            }}
            className={clsx(
              "px-2 py-1  w-full bg-transparent outline-none border border-[var(--section-border)] rounded-lg",
              errors.pricePerDay && "border-red-500"
            )}
          />
          {errors.pricePerDay && (
            <p className="text-sm text-red-500 mt-1">{errors.pricePerDay}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">{t("additionalPricePerDay")}</label>
          <input
            type="number"
            value={additionalPricePerDay}
            inputMode="numeric"
            onChange={(e) => {
              const val = e.target.value;
              setAdditionalPricePerDay(val);
              setErrors((prev) => ({
                ...prev,
                additionalPricePerDay: undefined,
              }));
            }}
            className={clsx(
              "px-2 py-1  w-full bg-transparent outline-none border border-[var(--section-border)] rounded-lg",
              errors.additionalPricePerDay && "border-red-500"
            )}
          />
          {errors.additionalPricePerDay && (
            <p className="text-sm text-red-500 mt-1">
              {errors.additionalPricePerDay}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">{t("size")}</label>
          <input
            type="number"
            value={size}
            className="px-2 py-1  w-full bg-transparent outline-none border border-[var(--section-border)] rounded-lg"
            inputMode="numeric"
            onChange={(e) => setSize(parseInt(e.target.value))}
          ></input>
        </div>
      </div>

      <div className="flex flex-col">
        <p>{t("selectSlide")}</p>
        <SlidePicker
          allSlides={slides}
          selectedSlides={selectedSlides}
          maxSlides={15}
          onChange={setSelectedSlides}
        ></SlidePicker>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium">
              {t("description")}
            </label>
            <div className="flex gap-2">
              {(["uk", "en", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setCurrentDescLang(lang)}
                  className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                    currentDescLang === lang
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
            rows={2}
            className="bg-[var(--section-bg)] h-[150px] border px-2 border-[var(--section-border)] rounded-lg outline-none resize-none"
            value={descText[currentDescLang]}
            onChange={(e) =>
              setDescText({
                ...descText,
                [currentDescLang]: e.target.value,
              })
            }
          />
        </div>
      </div>

      <Button variant="default" onClick={handleOnSubmit}>
        {t("SaveChanges")}
      </Button>

      <Popper
        open={!!pickerOpen}
        anchorEl={pickerAnchorEl}
        placement="bottom-start"
      >
        {pickerOpen && (
          <ClickAwayListener onClickAway={() => setPickerOpen(null)}>
            <div className="p-5 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg shadow-lg z-50">
              {pickerOpen && (
                <input
                  type="time"
                  autoFocus
                  onBlur={() => setPickerOpen(null)}
                />
              )}
            </div>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
}
