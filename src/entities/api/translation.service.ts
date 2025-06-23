"use server";
export type Translation = {
  key: string;
  uk: string;
  de: string;
  en: string;
};
export async function loadTranslations() {
  const response = await fetch(`http://localhost:5154/api/translations`, {
    cache: "force-cache",
    next: {
      tags: ["translation"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load translations");
  }

  const messages : Translation[] = await response.json();

  const uk: Record<string, string> = {};
  const de: Record<string, string> = {};
  const en: Record<string, string> = {};

  messages.forEach((m) => {
    uk[m.key] = m.uk;
    de[m.key] = m.de;
    en[m.key] = m.en;
  });

  return { uk, de, en };
}
