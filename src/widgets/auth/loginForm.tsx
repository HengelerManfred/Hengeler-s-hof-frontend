"use client";
import { signIn, useSession } from "next-auth/react";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "@/i18n/navigation";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import {
  validateEmail as validateEmailUtil,
  validatePassword as validatePasswordUtil,
} from "@/shared/lib/validation";
import { useRedirectStore } from "@/shared/store/redirectStore";
import { http } from "@/shared/api/http";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function LoginForm() {
  const searchParams = useSearchParams();
  const session = useSession();
  const roomId = searchParams.get("roomId");
  const price = searchParams.get("price");
  const numberOfDays = searchParams.get("numberOfDays");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const moreThanTwoPats = searchParams.get("moreThanTwoPats");
  const wholeHouse = searchParams.get("wholeHouse");

  const params = new URLSearchParams({
    roomId: roomId ?? "",
    price: price ?? "",
    numberOfDays: numberOfDays ?? "",
    startDate: startDate ?? "",
    endDate: endDate ?? "",
    moreThanTwoPats: moreThanTwoPats ?? "",
    wholeHouse: wholeHouse ?? "",
  });

  const router = useRouter();
  const [stripeLoading, setStripeLoading] = useState(false);
  const t = useTranslations("LoginForm");

  useEffect(() => {
    if (
      session.status === "authenticated" &&
      roomId &&
      price &&
      numberOfDays &&
      startDate &&
      endDate
    ) {
      const run = async () => {
        try {
          setStripeLoading(true);
          const { sessionId } = await http<{ sessionId: string }>(
            "Booking/create-stripe-session",
            {
              method: "POST",
              body: JSON.stringify({
                roomId,
                userId: session.data?.user.id,
                price: parseInt(price),
                numberOfDays: parseInt(numberOfDays),
                startDate,
                endDate,
                moreThanTwoPats: moreThanTwoPats === "true",
                wholeHouse: wholeHouse === "true",
              }),
            }
          );

          const stripe = await stripePromise;
          await stripe?.redirectToCheckout({ sessionId });
        } catch {
          router.push(`/booking/${roomId}`);
        } finally {
          setStripeLoading(false);
        }
      };

      run();
    }
  }, [
    session.status,
    roomId,
    price,
    numberOfDays,
    startDate,
    endDate,
    moreThanTwoPats,
    wholeHouse,
    session.data?.user.id,
    t,
    router,
  ]);

  const redirectUrl = useRedirectStore((state) => state.redirectUrl);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    error?: string;
  }>({});

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

    if (roomId && price && numberOfDays && startDate && endDate) {
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: true,
        callbackUrl: `/auth/login/?${params.toString()}`,
      });
      return;
    }

    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: true,
      callbackUrl: redirectUrl,
    });
  };

  const handleGoogleLogin = async () => {
    if (roomId && price && numberOfDays && startDate && endDate) {
      await signIn("google", {
        redirect: true,
        callbackUrl: `/auth/login/?${params.toString()}`,
      });
      return;
    }
    await signIn("google", { callbackUrl: redirectUrl });
  };

  if (stripeLoading) {
    return (
      <div className="absolute top-1/2 inter text-[var(--primary-text)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/10 md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg p-5 max-w-md">
        <div className="flex justify-center flex-col items-center h-full">
          <CircularProgress className="!text-[var(--accent)] !size-20" />
          <p className="text-2xl text-[var(--primary-text)] font-bold text-center">
            {t("loadingStripe")}
          </p>
        </div>
      </div>
    );
  }

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
          onClick={handleGoogleLogin}
          className="flex items-center cursor-pointer text-[var(--primary-text)] gap-2 justify-center !bg-[var(--section-bg)] !normal-case !border !border-[var(--section-border)] rounded-lg p-2"
        >
          <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
          {t("googleButton")}
        </Button>

        <p className="text-center">
          {t("registerPrompt")}{" "}
          <Link
            href={`/auth/register?${params.toString()}`}
            className="text-blue-500 underline"
          >
            {t("registerLink")}
          </Link>
        </p>
      </form>
    </div>
  );
}
