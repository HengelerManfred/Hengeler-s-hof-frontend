"use server";
import { Slide } from "@/widgets/mainPage/slide";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface Slider {
  id: string;
  sliderId: string;
  slides: Slide[];
}

export const updateHeaderSlider = async (imageIds: string[], id?: string) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slider`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: JSON.stringify({slideIds: imageIds, id, sliderId: "HeaderSlider"}),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("HeaderSlider");
  return await res.json();
};

export const updateRoomSlider = async (imageIds: string[], id?: string) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slider`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: JSON.stringify({ slideIds: imageIds, id, sliderId: "RoomSlider"}),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("RoomSlider");
  return await res.json();
};

export const loadHeaderSlider = async () => {
  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slider/HeaderSlider`, {
    method: "GET",
    next: {
      tags: ["HeaderSlider"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(await res.text());
    return {};
  }

  return await res.json();
};

export const loadRoomSlider = async () => {
  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slider/RoomSlider`, {
    method: "GET",
    next: {
      tags: ["RoomSlider"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(await res.text());
    return {};
  }

  return await res.json();
};