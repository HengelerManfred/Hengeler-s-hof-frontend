import NextAuth from "next-auth";
import createIntlMiddleware from "next-intl/middleware";
import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware({
  ...routing,
});

const { auth: authMiddleware } = NextAuth(authConfig);

export default authMiddleware((req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
