"use server";
import { http } from "@/shared/api/http";
import { Contacts } from "../model/contacts";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function loadContacts(): Promise<Contacts> {
  return http<Contacts>("Contact", {
    next: {
      tags: ["contacts"],
    },
    cache: "force-cache",
    method: "GET",
  });
}

export async function updateSocialMedia(data: Contacts) {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/SocialMedia`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update social media: ${res.status}`);
  }

  revalidateTag("contacts");
  return await res.json();
}



export async function updateContacts(data: Contacts) {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Contacts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${cookie.name}=${cookie.value}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update contact: ${res.status}`);
  }

  revalidateTag("contacts");
  return await res.json();
}