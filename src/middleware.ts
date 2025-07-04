import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware({ ...routing });

const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") ?? [];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isProd = process.env.NODE_ENV === "production";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: isProd,
    cookieName: isProd ? "__Secure-authjs.session-token" : "authjs.session-token",
  });

  if (pathname.includes("/admin")) {
    const email = token?.email;

    const isAdmin = email && adminEmails.includes(email);

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
