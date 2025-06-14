import { http } from "@/shared/api/http";
import { RegisterDto } from "../model/registerDto";
import { User } from "../model/user";

export function registerUser(data: RegisterDto): Promise<User> {
  return http<User>("Auth/createUser", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
