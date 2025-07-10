"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export type PriceItem = {
  id?: string,
  numOfPersons: number,
  price: number
};

export type Feature = {
  id: string,
  featureName: string,
  isActive: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const getAuthCookie = async () => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  return `${cookie.name}=${cookie.value}`;
};

export const loadPriceList = async (): Promise<PriceItem[]> => {
  const res = await fetch(`${API_URL}PriceList`, {
    method: "GET",
    next: {
      tags: ["price-list"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Не удалось загрузить PriceList");
  }

  return await res.json();
};

export const updatePriceList = async (items: PriceItem[]) => {
  const cookie = await getAuthCookie();

  const res = await fetch(`${API_URL}PriceList`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(items),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Ошибка при обновлении PriceList");
  }

  revalidateTag("price-list");
};

export const loadFeatures = async (): Promise<Feature[]> => {
  const res = await fetch(`${API_URL}Features`, {
    method: "GET",
    next: {
      tags: ["features"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Не удалось загрузить Features");
  }

  return await res.json();
};

export const toggleBookingFeature = async (id: string, isActive: boolean) => {
  const cookie = await getAuthCookie();

  const res = await fetch(`${API_URL}Features`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify({
      id,
      featureName: "booking-enabled",
      isActive,
    }),
  });

  if (!res.ok) {
    console.error(await res.text());
  }

  revalidateTag("features");
};
