// types/next-auth.d.ts
import { Roles } from "@/types/roles";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    role: Roles;
    email?: string | null;
    phoneNumber?: string | null;
    socialLogin: boolean;
    profilePictureUrl?: string | null;
    passwordHash?: string | null;
    createdAt: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    username: string;
    role: Roles;
    email?: string | null;
    phoneNumber?: string | null;
    socialLogin: boolean;
    profilePictureUrl?: string | null;
    createdAt: string;
  }
}
