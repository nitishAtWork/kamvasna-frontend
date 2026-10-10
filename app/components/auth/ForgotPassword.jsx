"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthLayout from "@/app/components/auth/AuthLayout";
import Input from "@/app/components/common/Input";
import { authApi } from "@/app/lib/auth";

export default function ForgotPassword() {
    const router = useRouter();

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    async function handleSubmit(
        event
    ) {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            const response =
                await authApi.forgotPassword(
                    {
                        email,
                    }
                );

            /*
             * Keep email so the next
             * page knows which account
             * is being verified.
             */
            sessionStorage.setItem(
                "resetEmail",
                email
            );

            router.push(
                "/verify-reset-otp"
            );
        } catch (error) {
            console.error(
                "Forgot password failed:",
                error
            );

            setError(
                error.message ||
                    "Unable to send reset OTP."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Forgot your password?"
            description="Enter your email address and we'll send you an OTP to reset your password."
            footer={
                <>
                    Remember your password?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-black hover:underline"
                    >
                        Login
                    </Link>
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
                    name="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target
                                .value
                        )
                    }
                    placeholder="you@example.com"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Sending OTP..."
                        : "Send Reset OTP"}
                </button>
            </form>
        </AuthLayout>
    );
}