"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { registerUser } from "@/entities/api/auth.service";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username: form.firstName + " " + form.lastName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
    };
    try {
      await registerUser(data);
      router.push("/auth/login");
      toast.success("User registered successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="absolute top-1/2 inter text-[var(--primary-text)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-9/10 md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 bg-[var(--section-bg)] border border-[var(--section-border)] rounded-lg p-5 max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="bg-[var(--section-bg)] outline-none border border-[var(--section-border)] rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="bg-[var(--section-bg)] outline-none border border-[var(--section-border)] rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="bg-[var(--section-bg)] outline-none border border-[var(--section-border)] rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="bg-[var(--section-bg)] outline-none border border-[var(--section-border)] rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="bg-[var(--section-bg)] outline-none border border-[var(--section-border)] rounded-lg p-2"
            required
          />
        </div>
        <Button type="submit" variant="default">
          Register
        </Button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
