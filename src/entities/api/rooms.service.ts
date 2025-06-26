"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export interface CreateRoomDto {
  id?: string;
  roomId: string;
  nameKey?: string;
  descriptionKey?: string;
  maxGuestsKey?: string;
  nameUk: string;
  nameEn: string;
  nameDe: string;
  descriptionUk: string;
  descriptionEn: string;
  descriptionDe: string;
  maxGuestsUk: string;
  maxGuestsDe: string;
  maxGuestsEn: string;
  price: number;
  additionalPrice: number;
  checkIn: string;
  checkOut: string;
  size: number;
  slideIds: string[];
};

export const createRoom = async (roomDto: CreateRoomDto) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: JSON.stringify(roomDto),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("translation");
  revalidateTag("rooms");
  return await res.json();
};

export const loadRoomById = async (id: string) => {
  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Rooms/${id}`, {
    method: "GET",
    next: {
      tags: ["rooms"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(await res.text());
    return {};
  }

  return await res.json();
};
