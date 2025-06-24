"use client";
import { Room } from "@/widgets/booking/model/roomsData";
import { Button, ClickAwayListener, Popper } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import clsx from "clsx";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";

export default function RoomSettingsForm({ room }: { room: Room }) {
  const t = useTranslations("RoomSettings");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [personQuantity, setPersonQuantity] = useState({
    uk: "",
    en: "",
    de: "",
  });
  const [currentPersonLang, setCurrentPersonLang] = useState<
    "uk" | "en" | "de"
  >("uk");

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

  const [pricePerDay, setPricePerDay] = useState("");
  const [additionalPricePerDay, setAdditionalPricePerDay] = useState("");

  const [errors, setErrors] = useState<{
    pricePerDay?: string;
    additionalPricePerDay?: string;
  }>({});

  const validatePriceFields = () => {
    const newErrors: typeof errors = {};

    const isInteger = (value: string) => /^\d+$/.test(value);

    if (!pricePerDay) {
      newErrors.pricePerDay = t("required");
    } else if (!isInteger(pricePerDay)) {
      newErrors.pricePerDay = t("onlyIntegers");
    } else if (Number.parseInt(pricePerDay) <= 0) {
      newErrors.pricePerDay = t("shouldBeMoreThan0");
    }

    if (!additionalPricePerDay) {
      newErrors.additionalPricePerDay = t("required");
    } else if (!isInteger(additionalPricePerDay)) {
      newErrors.additionalPricePerDay = t("onlyIntegers");
    } else if (Number.parseInt(pricePerDay) <= 0) {
      newErrors.additionalPricePerDay = t("shouldBeMoreThan0");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full h-fit p-5 flex flex-col gap-3 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg inter text-[var(--primary-text)]">
      <h2>{t("Settings") + room.id}</h2>
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
            <label className="text-[16px] font-medium">{t("name")}</label>
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
      </div>

      <div className="flex flex-col w-full">
        <div className="flex w-full flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium">{t("description")}</label>
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
            rows={4}
            className="bg-[var(--section-bg)] border px-2 border-[var(--section-border)] rounded-lg h-[28px] outline-none resize-none"
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

      <Button variant="default" onClick={validatePriceFields}>
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
