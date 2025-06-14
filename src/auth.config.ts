import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  providers: [
    Google
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPath = nextUrl.pathname.startsWith("/admin");

      if (isAdminPath) {
        return isLoggedIn;
      }

      return true;
    },
    async signIn({ account, }) {
      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
  },
};
