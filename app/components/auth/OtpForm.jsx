"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AuthLayout from "@/app/components/auth/AuthLayout";
import Input from "@/app/components/common/Input";
import { authApi } from "@/app/lib/auth";

export default function OtpForm() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const queryEmail =
      searchParams.get("email");

    const storedEmail =
      sessionStorage.getItem(
        "verificationEmail"
      );

    setEmail(
      queryEmail ||
        storedEmail ||
        ""
    );
  }, [searchParams]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email) {
      setError(
        "Email address is missing."
      );

      return;
    }

    try {
      setLoading(true);

      await authApi.verifyEmail({
        email,
        otp,
      });

      sessionStorage.removeItem(
        "verificationEmail"
      );

      router.push("/login");
    } catch (err) {
      setError(
        err.message ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Verify your email"
      description={`Enter the OTP sent to ${email || "your email address"}.`}
      footer={
        <>
          Already verified?{" "}
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
          label="Email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="you@example.com"
          required
        />

        <Input
          label="OTP"
          value={otp}
          onChange={(event) =>
            setOtp(
              event.target.value
                .replace(/\D/g, "")
                .slice(0, 6)
            )
          }
          placeholder="Enter 6 digit OTP"
          inputMode="numeric"
          maxLength={6}
          required
        />

        <button
          type="submit"
          disabled={
            loading ||
            otp.length < 6
          }
          className="h-12 w-full rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Verifying..."
            : "Verify Email"}
        </button>
      </form>
    </AuthLayout>
  );
}