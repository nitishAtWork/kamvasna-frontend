"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/app/components/common/Input";
import AuthLayout from "@/app/components/auth/AuthLayout";
import { authApi } from "@/app/lib/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      /*
       * Keep email available for OTP page.
       *
       * This is not authentication data,
       * so sessionStorage is sufficient.
       */
      sessionStorage.setItem(
        "verificationEmail",
        form.email
      );

      router.push(
        `/verify-email?email=${encodeURIComponent(
          form.email
        )}`
      );
    } catch (err) {
      setError(
        err.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create account"
      description="Create your account to continue shopping."
      footer={
        <>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-black hover:underline"
          >
            Login
          </a>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Creating account..."
            : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}