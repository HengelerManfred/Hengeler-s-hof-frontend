"use server"
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const createSlide = async (formData: FormData) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slides`, {
    method: "POST",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: formData,
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("translation");
  revalidateTag("slides");
  return await res.json();
};

export const updateSlide = async (formData: FormData, id: string) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slides/${id}`, {
    method: "PUT",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: formData,
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("HeaderSlider");
  revalidateTag("RoomSlider");
  revalidateTag("translation");
  revalidateTag("rooms");
  revalidateTag("slides");
  return true;
};


export const deleteSlide = async (id: string) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slides/?id=${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    }
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("slides");
  return true;
};


export const loadSlides = async () => {
  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Slides`, {
    method: "GET",
    next: {
      tags: ["slides"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }
  return await res.json();
};
