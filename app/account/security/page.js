"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FiLock,
    FiArrowLeft,
    FiShield,
    FiEye,
    FiEyeOff,
    FiCheckCircle,
    FiLoader,
} from "react-icons/fi";
import { toast } from "sonner";

import { useAuth } from "@/app/context/AuthContext";
import { authApi } from "@/app/lib/auth";

export default function SecurityPage() {
    const router = useRouter();

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="mx-auto max-w-3xl animate-pulse">
                    <div className="h-8 w-40 rounded bg-gray-200" />

                    <div className="mt-8 h-32 rounded-2xl bg-gray-200" />

                    <div className="mt-6 h-96 rounded-2xl bg-gray-200" />
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        router.replace("/login");
        return null;
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (saving) return;

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = formData;

        if (!currentPassword) {
            toast.error("Please enter your current password.");
            return;
        }

        if (!newPassword) {
            toast.error("Please enter a new password.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error(
                "New password must be at least 8 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            toast.error(
                "New password must be different from your current password."
            );
            return;
        }

        try {
            setSaving(true);

            const response = await authApi.changePassword({
                currentPassword,
                newPassword,
            });

            console.log(
                "CHANGE PASSWORD RESPONSE:",
                response
            );

            if (response?.success === false) {
                throw new Error(
                    response?.message ||
                    "Failed to change password."
                );
            }

            toast.success(
                response?.message ||
                "Password changed successfully."
            );

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error(
                "Change password failed:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to change password.";

            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back */}
                <button
                    type="button"
                    onClick={() => router.push("/account")}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-red-600"
                >
                    <FiArrowLeft />
                    Back to Account
                </button>

                {/* Heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-600">
                        <FiShield />
                        Security
                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-black">
                        Account Security
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Keep your account secure by regularly updating
                        your password.
                    </p>
                </div>

                {/* Security Banner */}
                <div className="mb-6 overflow-hidden rounded-2xl bg-black p-6 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                            <FiShield size={22} />
                        </div>

                        <div>
                            <h2 className="font-bold text-white">
                                Protect your account
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                Use a strong password that you don't use
                                anywhere else.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Password Form */}
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-black">
                            Change Password
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Enter your current password and choose a new
                            password.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Current Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Current Password
                            </label>

                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />

                                <input
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="currentPassword"
                                    value={
                                        formData.currentPassword
                                    }
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    disabled={saving}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm text-black outline-none transition focus:border-red-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black"
                                >
                                    {showCurrentPassword ? (
                                        <FiEyeOff />
                                    ) : (
                                        <FiEye />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                New Password
                            </label>

                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />

                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    disabled={saving}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm text-black outline-none transition focus:border-red-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black"
                                >
                                    {showNewPassword ? (
                                        <FiEyeOff />
                                    ) : (
                                        <FiEye />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Confirm New Password
                            </label>

                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    disabled={saving}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm text-black outline-none transition focus:border-red-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (prev) => !prev
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black"
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff />
                                    ) : (
                                        <FiEye />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password Info */}
                        <div className="rounded-xl bg-gray-50 p-4">
                            <div className="flex items-start gap-3">
                                <FiCheckCircle className="mt-0.5 shrink-0 text-green-600" />

                                <div className="text-xs leading-5 text-gray-500">
                                    <p className="font-semibold text-gray-700">
                                        Password requirements
                                    </p>

                                    <p className="mt-1">
                                        Use at least 8 characters. Avoid
                                        using passwords you've used on
                                        other websites.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end border-t border-gray-100 pt-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? (
                                    <>
                                        <FiLoader className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FiLock />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}