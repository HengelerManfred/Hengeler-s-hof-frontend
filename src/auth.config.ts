import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}Auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          if (!res.ok) {
            return null;
          }

          const user = await res.json();

          return user;
        } catch (e) {
          console.error("Authorize error:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user?.email) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/socialCreate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              username: user.name,
              profilePictureUrl: user.image,
            }),
          }
        );

        if (!res.ok) {
          console.error("Failed to create or fetch social user");
          throw new Error("Social user fetch failed");
        }

        const savedUser = await res.json();
        token.id = savedUser.id;
        token.email = savedUser.email;
        token.role = savedUser.role;
      }

      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.image = user.profilePictureUrl;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.image = token.image;
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPath = nextUrl.pathname.startsWith("/admin");
      if (isAdminPath) {
        return isLoggedIn;
      }
      return true;
    },

    async signIn({ account }) {
      if (account?.provider === "google") {
        return true;
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
};
