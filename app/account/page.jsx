"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    FiUser,
    FiMail,
    FiShoppingBag,
    FiMapPin,
    FiLock,
    FiLogOut,
    FiArrowRight,
    FiPackage,
    FiSettings,
    FiChevronRight,
} from "react-icons/fi";
import { MdOutlineReviews } from "react-icons/md";

import { useAuth } from "@/app/context/AuthContext";

export default function AccountPage() {
    const router = useRouter();

    const {
        user,
        loading,
        isAuthenticated,
        logout,
    } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [loading, isAuthenticated, router]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) {
        return (
            <>
                <main className="min-h-screen bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="animate-pulse">
                            <div className="h-9 w-48 rounded-lg bg-gray-200" />
                            <div className="mt-3 h-5 w-72 rounded bg-gray-200" />

                            <div className="mt-8 h-48 rounded-2xl bg-gray-200" />

                            <div className="mt-8 grid gap-6 md:grid-cols-2">
                                <div className="h-64 rounded-2xl bg-gray-200" />
                                <div className="h-64 rounded-2xl bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const firstLetter =
        user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <>
            <main className="min-h-screen bg-gray-50">
                {/* Page Header */}
                <section className="border-b border-gray-200 bg-white">
                    <div className="container py-8">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <FiUser className="text-red-600" />

                                <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                                    My Account
                                </span>
                            </div>

                            <p className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                                Account Dashboard
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                Manage your account, orders and personal
                                information.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container py-8">
                    {/* Profile Banner */}
                    <section className="relative overflow-hidden rounded-2xl bg-black shadow-lg">
                        {/* Decorative circles */}
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-600/20 blur-2xl" />

                        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-red-600/10 blur-3xl" />

                        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                            {/* Avatar */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-red-600 text-3xl font-bold text-white shadow-lg shadow-red-600/20">
                                {firstLetter}
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-400">
                                    Welcome back
                                </p>

                                <p className="mt-1 text-2xl font-bold text-white">
                                    {user?.name || "User"}
                                </p>

                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
                                    <FiMail className="text-red-500" />

                                    {user?.email || "-"}
                                </div>
                            </div>

                            {/* Profile Button */}
                            <Link
                                href="/account/profile"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-red-600 hover:bg-red-600"
                            >
                                Edit Profile
                                <FiArrowRight />
                            </Link>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section className="mt-8">
                        <div className="mb-5">
                            <p className="text-xl font-bold text-black">
                                Quick Access
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your shopping account
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Orders */}
                            <Link
                                href="/orders"
                                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                                        <FiShoppingBag size={22} />
                                    </div>

                                    <FiChevronRight className="text-gray-300 transition group-hover:text-red-600" />
                                </div>

                                <p className="mt-5 font-bold text-black">
                                    My Orders
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    View and track your orders
                                </p>
                            </Link>

                            {/* Address */}
                            <Link
                                href="/account/addresses"
                                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-black transition group-hover:bg-black group-hover:text-white">
                                        <FiMapPin size={22} />
                                    </div>

                                    <FiChevronRight className="text-gray-300 transition group-hover:text-red-600" />
                                </div>

                                <p className="mt-5 font-bold text-black">
                                    Addresses
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Manage your delivery addresses
                                </p>
                            </Link>

                            {/* Reviews */}
                            <Link
                                href="/account/review"
                                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-black transition group-hover:bg-black group-hover:text-white">
                                        <MdOutlineReviews size={22} />
                                    </div>

                                    <FiChevronRight className="text-gray-300 transition group-hover:text-red-600" />
                                </div>

                                <p className="mt-5 font-bold text-black">
                                    Review
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Manage your reviews
                                </p>
                            </Link>

                            {/* Security */}
                            <Link
                                href="/account/security"
                                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-black transition group-hover:bg-black group-hover:text-white">
                                        <FiLock size={22} />
                                    </div>

                                    <FiChevronRight className="text-gray-300 transition group-hover:text-red-600" />
                                </div>

                                <p className="mt-5 font-bold text-black">
                                    Security
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Manage your password and security
                                </p>
                            </Link>

                            {/* Settings */}
                            {/* <Link
                                href="/account/settings"
                                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                                        <FiSettings size={22} />
                                    </div>

                                    <FiChevronRight className="text-gray-300 transition group-hover:text-red-600" />
                                </div>

                                <p className="mt-5 font-bold text-black">
                                    Settings
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Manage your account preferences
                                </p>
                            </Link> */}
                        </div>
                    </section>

                    {/* Account Information */}
                    <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
                        {/* Information */}
                        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <FiUser />
                                    </div>

                                    <div>
                                        <p className="font-bold text-black">
                                            Account Information
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Your personal account details
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                                <div className="rounded-xl bg-gray-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <FiUser className="text-red-600" />
                                        Full Name
                                    </div>

                                    <p className="mt-2 font-semibold text-black">
                                        {user?.name || "-"}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <FiMail className="text-red-600" />
                                        Email Address
                                    </div>

                                    <p className="mt-2 break-all font-semibold text-black">
                                        {user?.email || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Orders Card */}
                        <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
                            <div className="relative p-6">
                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-600/20 blur-2xl" />

                                <div className="relative">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                                        <FiPackage size={22} />
                                    </div>

                                    <p className="mt-6 text-xl font-bold text-white">
                                        Your Orders
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-gray-400">
                                        Check your previous purchases and
                                        track the status of your current
                                        orders.
                                    </p>

                                    <Link
                                        href="/orders"
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-red-600 hover:text-white"
                                    >
                                        View All Orders
                                        <FiArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Logout */}
                    <section className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5 sm:p-6">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm">
                                    <FiLogOut />
                                </div>

                                <div>
                                    <p className="font-bold text-black">
                                        Sign out
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Sign out of your account on this
                                        device.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                            >
                                <FiLogOut />
                                Logout
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
