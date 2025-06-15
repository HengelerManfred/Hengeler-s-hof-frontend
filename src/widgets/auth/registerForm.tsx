"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { registerUser } from "@/entities/api/auth.service";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhoneNumber,
} from "@/shared/lib/validation";
import clsx from "clsx";
import { HttpError } from "@/shared/api/http";

export default function RegisterForm() {
  const t = useTranslations("RegisterForm");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const router = useRouter();

  const validateField = (name: string, value: string) => {
    let error: string | undefined;
    switch (name) {
      case "firstName":
      case "lastName":
        error = validateName(value, t);
        break;
      case "email":
        error = validateEmail(value, t);
        break;
      case "phoneNumber":
        error = validatePhoneNumber(value, t);
        break;
      case "password":
        error = validatePassword(value, t);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string | undefined } = {};
    newErrors.firstName = validateName(form.firstName, t);
    newErrors.lastName = validateName(form.lastName, t);
    newErrors.email = validateEmail(form.email, t);
    newErrors.phoneNumber = validatePhoneNumber(form.phoneNumber, t);
    newErrors.password = validatePassword(form.password, t);

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => !!error)) {
      return;
    }

    const data = {
      username: form.firstName + " " + form.lastName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
    };
    try {
      await registerUser(data);
      router.push("/auth/login");
      toast.success(t("successMessage"));
    } catch (err: unknown) {
      let message = t("errors.unknownError");
      if (err instanceof HttpError) {
        if(err.status === 409)  {
          message = t("errors.emailHaveTaken");
          setErrors((prev) => ({ ...prev, email: message }));
        }
      }
      toast.error(message);
    }
  };

  return (
    <div className="absolute top-1/2 inter text-[var(--primary-text)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/10 md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg p-5 max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">{t("title")}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName">{t("firstNameLabel")}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={clsx(
              "bg-[var(--section-bg)] outline-none border rounded-lg p-2",
              errors.firstName
                ? "border-red-500"
                : "border-[var(--section-border)]"
            )}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName">{t("lastNameLabel")}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={clsx(
              "bg-[var(--section-bg)] outline-none border rounded-lg p-2",
              errors.lastName
                ? "border-red-500"
                : "border-[var(--section-border)]"
            )}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={clsx(
              "bg-[var(--section-bg)] outline-none border rounded-lg p-2",
              errors.email ? "border-red-500" : "border-[var(--section-border)]"
            )}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber">{t("phoneLabel")}</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className={clsx(
              "bg-[var(--section-bg)] outline-none border rounded-lg p-2",
              errors.phoneNumber
                ? "border-red-500"
                : "border-[var(--section-border)]"
            )}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">{t("passwordLabel")}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={clsx(
              "bg-[var(--section-bg)] outline-none border rounded-lg p-2",
              errors.password
                ? "border-red-500"
                : "border-[var(--section-border)]"
            )}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>
        <Button type="submit" variant="default">
          {t("registerButton")}
        </Button>
        <p className="text-center text-sm mt-2">
          {t("loginPrompt")}{" "}
          <Link href="/auth/login" className="text-blue-500 underline">
            {t("loginLink")}
          </Link>
        </p>
      </form>
    </div>
  );
}
