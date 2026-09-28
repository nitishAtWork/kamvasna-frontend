"use client";

import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function CartSummary({
    totals,
}) {
    const subtotal =
        totals?.subtotal || 0;

    const total =
        totals?.total || subtotal;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
            </h2>

            <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                        Subtotal
                    </span>

                    <span className="font-medium text-gray-900">
                        ₹
                        {subtotal.toLocaleString(
                            "en-IN"
                        )}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                        Shipping
                    </span>

                    <span className="font-medium text-gray-900">
                        Calculated at checkout
                    </span>
                </div>
            </div>

            <div className="my-5 border-t border-gray-200" />

            <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                    Total
                </span>

                <span className="text-xl font-bold text-gray-900">
                    ₹
                    {total.toLocaleString(
                        "en-IN"
                    )}
                </span>
            </div>

            <Link
                href="/checkout"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
                Proceed to Checkout
                <FiArrowRight size={17} />
            </Link>
        </div>
    );
}