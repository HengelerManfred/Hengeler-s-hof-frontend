"use client";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import {
  validateEmail as validateEmailUtil,
  validatePassword as validatePasswordUtil,
} from "@/shared/lib/validation";

export default function LoginForm() {
  const t = useTranslations("LoginForm");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    error?: string;
  }>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleEmailChange = (email: string) => {
    setForm((prev) => ({ ...prev, email }));
    const error = validateEmailUtil(email, t);
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const handlePasswordChange = (password: string) => {
    setForm((prev) => ({ ...prev, password }));
    const error = validatePasswordUtil(password, t);
    setErrors((prev) => ({ ...prev, password: error }));
  };

  useEffect(() => {
    const error = searchParams.get("code");
    if (error === "credentials") {
      toast.error(t("errors.invalidCredentials"));
      setErrors((prev) => ({ ...prev, error: t("errors.invalidCredentials") }));
    } else if (error) {
      toast.error(t("errors.unknownError"));
      setErrors((prev) => ({ ...prev, error: t("errors.unknownError") }));
    }
  }, [searchParams, router, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmailUtil(form.email, t);
    const passwordError = validatePasswordUtil(form.password, t);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setErrors({});

    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="absolute top-1/2 inter text-[var(--primary-text)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/10 md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg p-5 max-w-md">
      <h2 className="text-2xl font-bold text-center">{t("title")}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            id="email"
            name="email"
            className={clsx(
              "bg-[var(--section-bg)] outline-none border rounded-lg p-2 ",
              errors.email ? "border-red-500" : "border-[var(--section-border)]"
            )}
            value={form.email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">{t("passwordLabel")}</label>
          <input
            type="password"
            id="password"
            name="password"
            className={clsx(
              "bg-[var(--section-bg)] outline-none border rounded-lg p-2 ",
              errors.password
                ? "border-red-500"
                : "border-[var(--section-border)]"
            )}
            value={form.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
          {errors.error && (
            <span className="text-sm text-red-500">{errors.error}</span>
          )}
        </div>

        <Button type="submit" variant="default">
          {t("loginButton")}
        </Button>

        <Button
          onClick={() =>
            signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_CURRENT_HOST })
          }
          className="flex items-center cursor-pointer text-[var(--primary-text)] gap-2 justify-center !bg-[var(--section-bg)] !normal-case !border !border-[var(--section-border)] rounded-lg p-2"
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
          {t("googleButton")}
        </Button>

        <p className="text-center">
          {t("registerPrompt")}{" "}
          <Link href="/auth/register" className="text-blue-500 underline">
            {t("registerLink")}
          </Link>
        </p>
      </form>
    </div>
  );
}
