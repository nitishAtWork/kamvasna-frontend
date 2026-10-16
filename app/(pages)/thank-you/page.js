
"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheck, FiClock, FiArrowRight } from "react-icons/fi";
import { paymentApi } from "@/app/lib/payment";
import { useAuth } from "@/app/context/AuthContext";

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const { user } = useAuth();

    const [status, setStatus] = useState("CHECKING");

    const checkPayment = useCallback(async () => {
        if (!orderId) {
            setStatus("PENDING");
            return;
        }

        try {
            const response = await paymentApi.getUroPayStatus(orderId);
            const result =
                response?.data?.data ??
                response?.data ??
                response;

            setStatus(
                String(result?.paymentStatus || "PENDING").toUpperCase()
            );
        } catch {
            setStatus("PENDING");
        }
    }, [orderId]);

    useEffect(() => {
        if (!user) {
            return;
        }
        checkPayment();
    }, [checkPayment]);

    const paid = status === "PAID";
    const checking = status === "CHECKING" || status === "PENDING";

    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-16">
            <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12">

                <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${paid
                            ? "bg-green-100 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                >
                    {paid ? (
                        <FiCheck className="h-10 w-10" />
                    ) : (
                        <FiClock className="h-9 w-9" />
                    )}
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                    KAMVASNA
                </p>

                <h1 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
                    {paid
                        ? "Thank You for Your Order!"
                        : "Thank You!"}
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                    {paid
                        ? "Your payment has been confirmed. We've received your order and will keep you updated."
                        : checking
                            ? "We're confirming your payment. Please wait a moment before placing another order."
                            : "We couldn't confirm your payment yet. Please check your orders for the latest status."}
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                        Continue Shopping
                        <FiArrowRight />
                    </Link>

                    <Link
                        href="/orders"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-bold text-gray-800 transition hover:border-black"
                    >
                        My Orders
                    </Link>
                </div>

                <p className="mt-8 text-xs text-gray-400">
                    Thank you for choosing Kamvasna.
                </p>
            </div>
        </main>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[75vh] items-center justify-center bg-gray-50">
                    Loading...
                </div>
            }
        >
            <ThankYouContent />
        </Suspense>
    );
}
