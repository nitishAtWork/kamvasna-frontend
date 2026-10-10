"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiArrowLeft,
    FiSave,
    FiEdit3,
} from "react-icons/fi";
import { toast } from "sonner";

import { useAuth } from "@/app/context/AuthContext";
import { userApi } from "@/app/lib/user";

export default function ProfilePage() {
    const router = useRouter();

    const {
        user,
        setUser,
        loading,
        isAuthenticated,
    } = useAuth();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    /*
     * Populate form when user becomes available.
     */
    useEffect(() => {
        if (!user) return;

        setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
        });
    }, [user]);

    /*
     * Redirect unauthenticated users.
     */
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="mx-auto max-w-4xl animate-pulse">
                    <div className="h-8 w-40 rounded bg-gray-200" />
                    <div className="mt-8 h-96 rounded-2xl bg-gray-200" />
                </div>
            </main>
        );
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEdit = () => {
        setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
        });

        setEditing(true);
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
        });

        setEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = formData.name.trim();
        const phone = formData.phone.trim();

        if (name.length < 2) {
            toast.error("Name must contain at least 2 characters.");
            return;
        }

        if (name.length > 100) {
            toast.error("Name cannot exceed 100 characters.");
            return;
        }

        if (phone.length > 20) {
            toast.error("Phone number cannot exceed 20 characters.");
            return;
        }

        try {
            setSaving(true);

            const response = await userApi.updateProfile({
                name,
                phone: phone || null,
            });

            if (!response?.success) {
                throw new Error(
                    response?.message || "Failed to update profile."
                );
            }

            const updatedUser = response.data;

            /*
             * Update global AuthContext user.
             */
            if (setUser) {
                setUser(updatedUser);
            }

            setFormData({
                name: updatedUser.name || "",
                email: updatedUser.email || "",
                phone: updatedUser.phone || "",
            });

            setEditing(false);

            toast.success("Profile updated successfully.");
        } catch (error) {
            console.error("PROFILE UPDATE ERROR:", error);

            toast.error(
                error?.message ||
                    "Unable to update profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

                <button
                    onClick={() => router.push("/account")}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-red-600"
                >
                    <FiArrowLeft />
                    Back to Account
                </button>

                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-600">
                        <FiUser />
                        Profile
                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-black">
                        Personal Information
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage your personal account information.
                    </p>
                </div>

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Profile Header */}
                    <div className="bg-black p-6 sm:p-8">
                        <div className="flex flex-col items-center gap-5 sm:flex-row">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-3xl font-bold text-white">
                                {user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {user?.name || "User"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    {user?.email || "-"}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-6 sm:p-8"
                    >
                        <div className="grid gap-6 sm:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />

                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!editing || saving}
                                        maxLength={100}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-black outline-none transition focus:border-red-500 focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />

                                    <input
                                        value={user?.email || ""}
                                        disabled
                                        className="w-full rounded-xl border border-gray-200 bg-gray-100 py-3 pl-11 pr-4 text-sm text-gray-500"
                                    />
                                </div>

                                <p className="mt-2 text-xs text-gray-400">
                                    Email address cannot be changed here.
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Phone Number
                                </label>

                                <div className="relative">
                                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />

                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!editing || saving}
                                        maxLength={20}
                                        placeholder="Enter phone number"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-black outline-none transition focus:border-red-500 focus:bg-white disabled:cursor-not-allowed disabled:text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                            {!editing ? (
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                                >
                                    <FiEdit3 />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={saving}
                                        className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <FiSave />

                                        {saving
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}