"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthLayout from "@/app/components/auth/AuthLayout";
import Input from "@/app/components/common/Input";
import { authApi } from "@/app/lib/auth";

export default function ResetPassword() {
    const router = useRouter();

    const [resetToken, setResetToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("resetToken");

        if (!token) {
            router.replace("/forgot-password");
            return;
        }

        setResetToken(token);
    }, [router]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!password) {
            setError("Please enter your new password.");
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!resetToken) {
            setError(
                "Reset session expired. Please request a new OTP."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await authApi.resetPassword({
                resetToken,
                newPassword: password,
            });

            console.log(
                "RESET PASSWORD RESPONSE:",
                response
            );

            sessionStorage.removeItem("resetToken");
            sessionStorage.removeItem("resetEmail");

            setSuccess(
                "Your password has been reset successfully."
            );

            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (error) {
            console.error(
                "Reset password failed:",
                error
            );

            setError(
                error.message ||
                    "Unable to reset password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Reset your password"
            description="Create a new password for your account."
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

                {success && (
                    <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                        {success}
                    </div>
                )}

                <Input
                    label="New Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    placeholder="Enter new password"
                    required
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) =>
                        setConfirmPassword(
                            event.target.value
                        )
                    }
                    placeholder="Confirm new password"
                    required
                />

                <button
                    type="submit"
                    disabled={loading || !resetToken}
                    className="h-12 w-full rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Resetting Password..."
                        : "Reset Password"}
                </button>
            </form>
        </AuthLayout>
    );
}