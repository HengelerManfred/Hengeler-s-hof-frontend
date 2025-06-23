"use client";
import { createEvent, updateEvent } from "@/entities/api/events.service";
import { CalendarToday, Close } from "@mui/icons-material";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  ClickAwayListener,
  Button,
  Popper,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DayPicker, OnSelectHandler } from "react-day-picker";
import toast from "react-hot-toast";
import { ImagePicker } from "../ImagePicker";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import clsx from "clsx";
import { EventExample } from "./event";
import { loadTranslations } from "@/entities/api/translation.service";
import { uk, enUS, de } from "react-day-picker/locale";

type EventType = "multiday" | "oneday";

export default function CreateEventForm({
  event,
  closeDialog,
}: {
  event?: EventExample;
  closeDialog?: () => void;
}) {
  const t = useTranslations("AdminEvents");
  const [selectedEventType, setSelectedEventType] =
    useState<EventType>("multiday");

  const [images, setImages] = useState<File[]>([]);
  const [onedayBeginDate, setOnedayBeginDate] = useState<Date>();
  const [onedayEndDate, setOnedayEndDate] = useState<Date>();
  const [onedayTime, setOnedayTime] = useState<string>("");
  const [multidayBeginDate, setMultidayBeginDate] = useState<Date>();
  const [multidayEndDate, setMultidayEndDate] = useState<Date>();
  const [multidayTime, setMultidayTime] = useState<string>("");
  const [eventLink, setEventLink] = useState<string>("");
  const [pickerAnchorEl, setPickerAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [pickerOpen, setPickerOpen] = useState<{
    mode: EventType;
    field: "begin" | "end" | "time";
  } | null>(null);
  const locale = useLocale();
  const localeMap = {
    uk: uk,
    en: enUS,
    de: de,
  };

  const handleOpenPicker = (
    mode: EventType,
    field: "begin" | "end" | "time",
    e: React.MouseEvent<Element>
  ) => {
    setPickerAnchorEl(e.currentTarget as HTMLElement);
    setPickerOpen({ mode, field });
  };

  const inputBaseClass =
    "bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg h-[30px]";
  const disabledStyle = "opacity-50 pointer-events-none select-none";
  const formatDate = (d?: Date) => (d ? d.toLocaleDateString(locale) : "");
  const handleDaySelect: OnSelectHandler<Date | undefined> = (date) => {
    if (!pickerOpen) return;
    const { mode, field } = pickerOpen;
    if (mode === "oneday") {
      if (field === "begin") setOnedayBeginDate(date || undefined);
      if (field === "end") setOnedayEndDate(date || undefined);
    } else {
      if (field === "begin") setMultidayBeginDate(date || undefined);
      if (field === "end") setMultidayEndDate(date || undefined);
    }
    setPickerOpen(null);
  };
  const [currentTextLang, setCurrentTextLang] = useState<"uk" | "en" | "de">(
    "uk"
  );

  const [currentTitleLang, setCurrentTitleLang] = useState<"uk" | "en" | "de">(
    "uk"
  );

  const [titleText, setTitleText] = useState({
    uk: "",
    en: "",
    de: "",
  });

  const [eventText, setEventText] = useState({
    uk: "",
    en: "",
    de: "",
  });

  useEffect(() => {
    if (!event) return;

    setSelectedEventType(event.oneDayEvent ? "oneday" : "multiday");
    if (event.oneDayEvent) {
      setOnedayBeginDate(new Date(event.startDate));
      setOnedayTime(event.startTime);
    } else {
      setMultidayBeginDate(new Date(event.startDate));
      setMultidayEndDate(new Date(event.endDate));
      setMultidayTime(event.startTime);
    }

    if (event.link) {
      setEventLink(event.link);
    }

    const runAsync = async () => {
      if (event.imageUrl?.length) {
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS + event.imageUrl
          );
          const blob = await res.blob();
          const filename =
            (process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS + event.imageUrl)
              .split("/")
              .pop() || "image";
          setImages([new File([blob], filename, { type: blob.type })]);
        } catch (error) {
          console.error("Помилка зображення:", error);
        }
      }

      try {
        const transition = await loadTranslations();
        setTitleText({
          uk: transition.uk[event.titleKey],
          en: transition.en[event.titleKey],
          de: transition.de[event.titleKey],
        });

        setEventText({
          uk: transition.uk[event.descriptionKey],
          en: transition.en[event.descriptionKey],
          de: transition.de[event.descriptionKey],
        });
      } catch (error) {
        console.error("Помилка перекладів:", error);
      }
    };

    runAsync();
  }, []);

  const handleTitleLangChange = (lang: "uk" | "en" | "de") => {
    setCurrentTitleLang(lang);
  };

  const handleTitleChange = (text: string) => {
    setTitleText((prev) => ({
      ...prev,
      [currentTitleLang]: text,
    }));
  };

  const handleTextLangChange = (lang: "uk" | "en" | "de") => {
    setCurrentTextLang(lang);
  };

  const handleTextChange = (text: string) => {
    setEventText((prev) => ({
      ...prev,
      [currentTextLang]: text,
    }));
  };

  async function handleSubmit() {
    const formatDateISO = (d?: Date) => (d ? d.toISOString().slice(0, 10) : "");

    const isOneDay = selectedEventType === "oneday";

    const formData = new FormData();
    formData.append("UkTitle", titleText.uk);
    formData.append("EnTitle", titleText.en);
    formData.append("DeTitle", titleText.de);

    formData.append("UkDescription", eventText.uk);
    formData.append("EnDescription", eventText.en);
    formData.append("DeDescription", eventText.de);

    formData.append("Link", eventLink);
    formData.append("OneDayEvent", isOneDay.toString());
    formData.append("IsActive", "true");

    formData.append(
      "StartDate",
      isOneDay
        ? formatDateISO(onedayBeginDate)
        : formatDateISO(multidayBeginDate)
    );
    formData.append(
      "EndDate",
      isOneDay
        ? formatDateISO(onedayEndDate ?? onedayBeginDate)
        : formatDateISO(multidayEndDate)
    );
    formData.append("StartTime", isOneDay ? onedayTime : multidayTime);

    formData.append("Image", images[0]);

    if (event) {
      formData.append("Id", event.id);
      formData.append("TitleKey", event.titleKey);
      formData.append("DescriptionKey", event.descriptionKey);
    }

    try {
      let response;

      if (!event) {
        response = await createEvent(formData);
      } else {
        response = await updateEvent(formData, event.id);
      }

      if (response) {
        toast.success(t("eventSaved"));
        if (closeDialog) {
          closeDialog();
        }
        resetForm();
      }
    } catch {
      toast.error("errorCheckAllLanguages");
    }
  }

  function resetForm() {
    setTitleText({ uk: "", en: "", de: "" });
    setEventText({ uk: "", en: "", de: "" });
    setEventLink("");
    setImages([]);
    setMultidayBeginDate(undefined);
    setMultidayEndDate(undefined);
    setMultidayTime("");
    setOnedayBeginDate(undefined);
    setOnedayEndDate(undefined);
    setOnedayTime("");
    setSelectedEventType("multiday");
  }

  return (
    <div
      className={clsx(
        "relative rounded bg-[var(--section-bg)] py-[10px] px-5 flex flex-col gap-4",
        event ? "w-full" : "w-1/2 border border-[var(--section-border)]"
      )}
    >
      <span className="text-[20px] font-medium">{t("createEvent")}</span>
      {closeDialog && (
        <button
          onClick={() => {
            closeDialog();
          }}
          className="absolute top-0 right-0"
        >
          <Close className="size-[35px] text-[var(--primary-text)]" />
        </button>
      )}
      <div className="flex flex-col w-full">
        <div className="flex w-full flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[16px] font-medium">{t("name")}</label>
            <div className="flex gap-2">
              {(["uk", "en", "de"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleTitleLangChange(lang)}
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
            className="bg-[var(--section-bg)] border px-2 border-[var(--section-border)] rounded-lg h-[28px] outline-none resize-none"
            value={titleText[currentTitleLang]}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>
      </div>

      <FormControl>
        <RadioGroup
          name="eventType"
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value as EventType)}
        >
          <FormControlLabel
            value="multiday"
            control={
              <Radio sx={{ "&.Mui-checked": { color: "var(--accent)" } }} />
            }
            className="!w-fit"
            label={t("multiDay")}
          />
          <div
            className={
              selectedEventType !== "multiday" ? disabledStyle : undefined
            }
          >
            <div className="flex justify-between gap-4 mb-2">
              <div className="flex flex-col w-[48%]">
                <label htmlFor="multiday-begin" className="text-[16px]">
                  {t("begin")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="multiday-begin"
                    name="multidayBegin"
                    readOnly
                    className="bg-transparent outline-none h-full flex-grow"
                    onClick={(e) => handleOpenPicker("multiday", "begin", e)}
                    value={formatDate(multidayBeginDate)}
                  />
                  <CalendarToday
                    onClick={(e) => handleOpenPicker("multiday", "begin", e)}
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[48%]">
                <label htmlFor="multiday-end" className="text-[16px]">
                  {t("end")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="multiday-end"
                    name="multidayEnd"
                    readOnly
                    className="bg-transparent outline-none h-full flex-grow"
                    value={formatDate(multidayEndDate)}
                    onClick={(e) => handleOpenPicker("multiday", "end", e)}
                  />
                  <CalendarToday
                    onClick={(e) => handleOpenPicker("multiday", "end", e)}
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="multiday-time" className="text-[16px] mb-1">
                {t("time")}
              </label>
              <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                <input
                  id="multiday-time"
                  name="multidayTime"
                  className="bg-transparent outline-none h-full flex-grow"
                  onChange={(e) => setMultidayTime(e.target.value)}
                  value={multidayTime}
                />
                <AccessTimeIcon
                  onClick={(e) => handleOpenPicker("multiday", "time", e)}
                  sx={{ cursor: "pointer", ml: 1 }}
                  fontSize="small"
                />
              </div>
            </div>
          </div>

          <FormControlLabel
            value="oneday"
            control={
              <Radio sx={{ "&.Mui-checked": { color: "var(--accent)" } }} />
            }
            className="!w-fit"
            label={t("oneDay")}
          />
          <div
            className={
              selectedEventType !== "oneday" ? disabledStyle : undefined
            }
          >
            <div className="flex justify-between gap-4 mb-2">
              <div className="flex flex-col w-[48%]">
                <label htmlFor="oneday-begin" className="text-[16px]">
                  {t("begin")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="oneday-begin"
                    name="onedayBegin"
                    readOnly
                    className="bg-transparent outline-none h-full flex-grow"
                    value={formatDate(onedayBeginDate)}
                    onClick={(e) => handleOpenPicker("oneday", "begin", e)}
                  />
                  <CalendarToday
                    onClick={(e) => handleOpenPicker("oneday", "begin", e)}
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[48%]">
                <label htmlFor="oneday-time" className="text-[16px]">
                  {t("time")}
                </label>
                <div className={clsx(inputBaseClass, "flex items-center px-2")}>
                  <input
                    id="oneday-time"
                    name="onedayTime"
                    onChange={(e) => setOnedayTime(e.target.value)}
                    className="bg-transparent outline-none h-full flex-grow"
                    value={onedayTime}
                  />
                  <AccessTimeIcon
                    onClick={(e) => handleOpenPicker("oneday", "time", e)}
                    sx={{ cursor: "pointer", ml: 1 }}
                    fontSize="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </RadioGroup>
      </FormControl>

      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium">{t("eventLink")}</label>
        <input
          className="w-1/2 border border-[var(--section-border)] rounded-lg px-2 h-7"
          placeholder={t("eventLink")}
          value={eventLink}
          onChange={(e) => {
            setEventLink(() => e.target.value);
          }}
        ></input>
      </div>

      <label className="text-[16px] font-medium">{t("chooseImage")}</label>
      <ImagePicker
        maxFiles={1}
        width={32.5}
        height={8}
        initialPreviews={images}
        onPreviewsChange={(newPreviews) => setImages(newPreviews)}
      />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-[16px] font-medium">{t("eventText")}</label>
          <div className="flex gap-2">
            {(["uk", "en", "de"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleTextLangChange(lang)}
                className={`px-3 py-1 border rounded text-sm transition-colors duration-200 ${
                  currentTextLang === lang
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
          className="bg-[var(--section-bg)] border border-[var(--section-border)] rounded p-2 outline-none resize-none"
          placeholder={`${t(
            "eventTextPlaceholder"
          )} (${currentTextLang.toUpperCase()})`}
          value={eventText[currentTextLang]}
          onChange={(e) => handleTextChange(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "var(--accent)",
          "&:hover": { backgroundColor: "var(--accent)" },
          alignSelf: "start",
        }}
        onClick={handleSubmit}
      >
        {t("save")}
      </Button>

      <Popper
        open={!!pickerOpen}
        anchorEl={pickerAnchorEl}
        placement="bottom-start"
      >
        {pickerOpen && (
          <ClickAwayListener onClickAway={() => setPickerOpen(null)}>
            <div className="p-5 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg shadow-lg z-50">
              {pickerOpen.field === "time" ? (
                <input
                  type="time"
                  autoFocus
                  value={
                    pickerOpen.mode === "oneday" ? onedayTime : multidayTime
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (pickerOpen.mode === "oneday") setOnedayTime(val);
                    else setMultidayTime(val);
                  }}
                  onBlur={() => setPickerOpen(null)}
                />
              ) : (
                <DayPicker
                  mode="single"
                  locale={localeMap[locale as keyof typeof localeMap]}
                  selected={
                    pickerOpen.mode === "oneday"
                      ? pickerOpen.field === "begin"
                        ? onedayBeginDate
                        : onedayEndDate
                      : pickerOpen.field === "begin"
                      ? multidayBeginDate
                      : multidayEndDate
                  }
                  onSelect={handleDaySelect}
                />
              )}
            </div>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
}
