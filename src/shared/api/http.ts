export async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const url = `${base}${path}`;
  
  if (!base)
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
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
