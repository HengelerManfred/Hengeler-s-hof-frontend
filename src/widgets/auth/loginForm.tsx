"use client";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.ok) {
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="absolute top-1/2 inter text-[var(--primary-text)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/10 md:w-3/4 lg:w-1/2  xl:w-1/3  2xl:w-1/4 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg p-5 max-w-md">
      <h2 className="text-2xl font-bold text-center">Login form</h2>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-[var(--section-bg)] outline-none border border-[var(--section-border)] rounded-lg p-2"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-[var(--section-bg)] outline-none border border-[var(--section-border)] rounded-lg p-2"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <Button variant="default" onClick={handleSubmit}>
          Login
        </Button>
        <Button
          onClick={() =>
            signIn("google", { callbackUrl: "http://localhost:3000/" })
          }
          className="flex items-center cursor-pointer text-[var(--primary-text)] gap-2 justify-center !bg-[var(--section-bg)] !normal-case !border !border-[var(--section-border)] rounded-lg p-2"
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
          Continue with Google
        </Button>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
