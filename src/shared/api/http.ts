export async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const isServer = typeof window === "undefined";

  const url = isServer
    ? `${process.env.URL_TO_PROXY_REQUESTS}api/${path}`
    : `/dotnetapi/${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!res.ok) throw new HttpError(res.status, await res.text());
  return res.json();
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}
