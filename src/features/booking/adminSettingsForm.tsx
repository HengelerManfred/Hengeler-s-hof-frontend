"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { IconButton, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Feature,
  loadFeatures,
  PriceItem,
  toggleBookingFeature,
  updatePriceList,
} from "@/entities/api/adminSettings.service";

export default function AdminSettingsForm({
  features,
  priceList,
}: {
  features: Feature[];
  priceList: PriceItem[];
}) {
  const t = useTranslations("AdminSettings");

  const [peoplePrices, setPeoplePrices] = useState<
    { numOfPersons: number; price: number | string }[]
  >(priceList ?? [{ numOfPersons: 1, price: "" }]);

  const [bookingEnabled, setBookingEnabled] = useState(features.find(f=>f.featureName=="booking-enabled")?.isActive || false);

  const onToggleBooking = async (checked: boolean) => {
    setBookingEnabled(checked);
    try {
      const features = await loadFeatures();
      const bookingFeature = features.find(
        (f) => f.featureName === "booking-enabled"
      );
      if (!bookingFeature) throw new Error("Feature not found");

      await toggleBookingFeature(bookingFeature.id, checked);
      toast.success("Налаштування оновлено");
    } catch {
      toast.error("Щось пішло не так");
      setBookingEnabled(!checked);
    }
  };

  const addField = () => {
    setPeoplePrices((prev) => [
      ...prev,
      { numOfPersons: prev.length + 1, price: "" },
    ]);
  };

  const removeField = (index: number) => {
    setPeoplePrices((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated.map((item, idx) => ({
        ...item,
        numOfPersons: idx + 1,
      }));
    });
  };

  const updatePrice = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPrices = [...peoplePrices];
    newPrices[index].price = value === "" ? "" : Number(value);
    setPeoplePrices(newPrices);
  };

  const handleSubmit = async () => {
    const payload = peoplePrices.map(({ numOfPersons, price }) => ({
      numOfPersons,
      price: price === "" ? 0 : Number(price),
    }));

    try {
      await updatePriceList(payload);
      toast.success("Ціни збережено");
    } catch {
      toast.error("Помилка при збереженні цін");
    }
  };

  return (
    <div className="p-5 flex flex-col gap-3 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg inter text-[var(--primary-text)]">
      <div className="flex gap-3 items-center">
        <span className="text-[20px]">Бронювання через букінг</span>
        <Checkbox
          checked={bookingEnabled}
          onChange={(e) => onToggleBooking(e.target.checked)}
          sx={{
            color: "var(--accent)",
            "&.Mui-checked": {
              color: "var(--accent)",
            },
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="font-bold">Ціни за кількісттю людей (як на букінгу)</h3>
        {peoplePrices.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="number"
              value={item.numOfPersons}
              disabled
              className="w-20 px-2 py-1 border border-[var(--section-border)] rounded-lg bg-gray-100"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Ціна"
              value={item.price}
              onChange={(e) => updatePrice(index, e.target.value)}
              className="w-full px-2 py-1 border border-[var(--section-border)] rounded-lg"
            />
            <IconButton
              onClick={() => removeField(index)}
              className="!p-1"
              aria-label="Видалити"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="text-sm text-blue-500 hover:underline self-start mt-1"
        >
          + Добавить ещё
        </button>
      </div>

      <Button
        onClick={handleSubmit}
        variant="default"
        className="w-full mt-4"
        disabled={peoplePrices.some((p) => p.price === "")}
      >
        {t("Save")}
      </Button>
    </div>
  );
}
