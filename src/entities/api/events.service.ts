"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createEvent = async (formData: FormData) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Events`, {
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

  revalidateTag("events");
  return await res.json();
};

export const updateEvent = async (formData: FormData, id: string) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const res = await fetch(
    `${process.env.URL_TO_PROXY_REQUESTS}api/Events/${id}`,
    {
      method: "PUT",
      headers: {
        Cookie: `${cookie.name}=${cookie.value}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("events");
  return true;
};

export const loadEvents = async () => {
  const res = await fetch(`${process.env.URL_TO_PROXY_REQUESTS}api/Events`, {
    method: "GET",
    next: {
      tags: ["events"],
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }
  return await res.json();
};

export const loadActiveEvents = async () => {
  const res = await fetch(
    `${process.env.URL_TO_PROXY_REQUESTS}api/Events/Active`,
    {
      method: "GET",
      next: {
        tags: ["events"],
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }
  return await res.json();
};

export const changeEventVisibility = async (id: string, isActive: boolean) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const url = new URL(
    `${process.env.URL_TO_PROXY_REQUESTS}api/Events/setIsActive`
  );
  url.searchParams.set("id", id);
  url.searchParams.set("isActive", isActive.toString());

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("events");
};

export const deleteEvent = async (id: string) => {
  const cookie =
    (await cookies()).get("__Secure-authjs.session-token") ??
    (await cookies()).get("authjs.session-token");

  if (!cookie) throw new Error("Auth session token not found in cookies");

  const url = new URL(
    `${process.env.URL_TO_PROXY_REQUESTS}api/Events`
  );
  url.searchParams.set("id", id);

  const res = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Cookie: `${cookie.name}=${cookie.value}`,
    },
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error(res.status.toString());
  }

  revalidateTag("events");
};
