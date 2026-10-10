"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthLayout from "@/app/components/auth/AuthLayout";
import Input from "@/app/components/common/Input";
import { authApi } from "@/app/lib/auth";

export default function VerifyResetOTP() {
    const router = useRouter();

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const storedEmail =
            sessionStorage.getItem(
                "resetEmail"
            );

        if (!storedEmail) {
            router.replace(
                "/forgot-password"
            );

            return;
        }

        setEmail(storedEmail);
    }, [router]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (otp.length !== 6) {
            setError("Please enter the 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);

            const response = await authApi.verifyResetOTP({
                email,
                otp,
            });

            console.log("VERIFY RESET OTP RESPONSE:", response);

            const data = response?.data?.data || response?.data;

            const resetToken = data?.resetToken;

            if (!resetToken) {
                throw new Error(
                    "OTP verified, but reset token was not returned."
                );
            }

            sessionStorage.setItem("resetToken", resetToken);

            router.push("/reset-password");
        } catch (error) {
            console.error(
                "Verify reset OTP failed:",
                error
            );

            setError(
                error.message ||
                "Invalid or expired OTP."
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <AuthLayout
            title="Verify OTP"
            description={`Enter the OTP sent to ${email || "your email address"}.`}
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
                    label="OTP"
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(event) =>
                        setOtp(
                            event.target
                                .value
                        )
                    }
                    placeholder="Enter OTP"
                    inputMode="numeric"
                    maxLength={6}
                    required
                />

                <button
                    type="submit"
                    disabled={
                        loading ||
                        otp.length < 4
                    }
                    className="h-12 w-full rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Verifying..."
                        : "Verify OTP"}
                </button>
            </form>
        </AuthLayout>
    );
}