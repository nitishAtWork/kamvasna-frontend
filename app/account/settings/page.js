"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    FiSettings,
    FiArrowLeft,
    FiBell,
    FiMail,
    FiShoppingBag,
    FiSave,
    FiToggleLeft,
    FiToggleRight,
} from "react-icons/fi";

import { useAuth } from "@/app/context/AuthContext";

export default function SettingsPage() {
    const router = useRouter();

    const { loading, isAuthenticated } = useAuth();

    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotionalEmails: false,
        newsletter: false,
        offers: true,
    });

    if (loading) {
        return (
            <>
                <main className="min-h-screen bg-gray-50 px-4 py-10">
                    <div className="mx-auto max-w-3xl animate-pulse">
                        <div className="h-8 w-40 rounded bg-gray-200" />
                        <div className="mt-8 h-96 rounded-2xl bg-gray-200" />
                    </div>
                </main>
            </>
        );
    }

    if (!isAuthenticated) {
        router.replace("/login");
        return null;
    }

    const toggleSetting = (key) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSave = () => {
        console.log("SETTINGS:", settings);
    };

    const SettingItem = ({
        icon: Icon,
        title,
        description,
        settingKey,
    }) => {
        const enabled = settings[settingKey];

        return (
            <button
                type="button"
                onClick={() => toggleSetting(settingKey)}
                className="flex w-full items-center justify-between gap-5 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left transition hover:border-red-100 hover:bg-red-50/40"
            >
                <div className="flex items-start gap-4">
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${enabled
                                ? "bg-red-50 text-red-600"
                                : "bg-gray-200 text-gray-500"
                            }`}
                    >
                        <Icon />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-black">
                            {title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>

                {enabled ? (
                    <FiToggleRight
                        size={32}
                        className="shrink-0 text-red-600"
                    />
                ) : (
                    <FiToggleLeft
                        size={32}
                        className="shrink-0 text-gray-400"
                    />
                )}
            </button>
        );
    };

    return (
        <>
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.push("/account")}
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600"
                    >
                        <FiArrowLeft />
                        Back to Account
                    </button>

                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-600">
                            <FiSettings />
                            Settings
                        </div>

                        <h1 className="mt-2 text-3xl font-bold text-black">
                            Account Settings
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage notifications and communication
                            preferences.
                        </p>
                    </div>

                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-black">
                                Notifications
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Choose which updates you want to receive.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <SettingItem
                                icon={FiShoppingBag}
                                title="Order Updates"
                                description="Receive updates about order confirmation, shipping and delivery."
                                settingKey="orderUpdates"
                            />

                            <SettingItem
                                icon={FiMail}
                                title="Promotional Emails"
                                description="Receive special offers, promotions and product recommendations."
                                settingKey="promotionalEmails"
                            />

                            <SettingItem
                                icon={FiBell}
                                title="Newsletter"
                                description="Receive our latest news, product launches and updates."
                                settingKey="newsletter"
                            />

                            <SettingItem
                                icon={FiBell}
                                title="Special Offers"
                                description="Get notified about exclusive discounts and limited-time offers."
                                settingKey="offers"
                            />
                        </div>

                        <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                            >
                                <FiSave />
                                Save Preferences
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}