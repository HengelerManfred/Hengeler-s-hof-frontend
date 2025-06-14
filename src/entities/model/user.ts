export enum Roles {
  Admin = "Admin",
  User = "User",
}

export interface User {
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
