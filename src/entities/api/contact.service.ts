"use server";
import { http } from "@/shared/api/http";
import { Contacts } from "../model/contacts";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function loadContacts(): Promise<Contacts> {
  try {
    return http<Contacts>("Contact", {
      next: {
        tags: ["contacts"],
      },
      cache: "force-cache",
      method: "GET",
    });
  } catch (error) {
    console.error(error);
    return {
      id: "1",
      name: "Max Mustermann",
      email: "hengeler.shofrohnhofen3@gmail.com",
      phoneNumber: "+49 123 45678",
      city: "Altusried",
      street: "Frohnhofen 3",
      postalCode: "87452",
      country: "Deutschland",
      facebook:
        "https://www.facebook.com/profile.php?id=61574880403131&rdid=2Shf0hUhGskhz29d&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16aatisrdk%2F",
      instagram:
        "https://www.instagram.com/hengeler.shof/?igsh=ZXlmN3FrcWZma2xu",
      telegram: "",
      whatsapp: "",
    };
  }
}

export async function updateSocialMedia(data: Contacts) {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(
    `${process.env.URL_TO_PROXY_REQUESTS}api/SocialMedia`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie.name}=${cookie.value}`,
      },
      body: JSON.stringify(data),
    }
  );

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
