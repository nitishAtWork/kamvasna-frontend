"use client";

import Image from "next/image";
import { getImageUrl } from "@/app/lib/imageUrl";

export default function CheckoutSummary({
    items = [],
    totals = {},
    address,
    placingOrder,
    onPlaceOrder,
}) {
    const canPlaceOrder =
        Boolean(address);

    return (
        <aside className="h-fit rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-5">
                <h2 className="text-lg font-bold text-gray-900">
                    Order Summary
                </h2>
            </div>

            <div className="divide-y divide-gray-100">
                {items.map(
                    (item) => {
                        const product =
                            item.product;

                        return (
                            <div
                                key={
                                    product._id
                                }
                                className="flex gap-3 p-5"
                            >
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    {product.img && (
                                        <Image
                                            src={getImageUrl(
                                                product.img
                                            )}
                                            alt={
                                                product.name
                                            }
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-sm font-medium text-gray-900">
                                        {
                                            product.name
                                        }
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Qty:{" "}
                                        {
                                            item.quantity
                                        }
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-900">
                                        ₹
                                        {(
                                            product.price *
                                            item.quantity
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>

            <div className="space-y-3 border-t border-gray-200 p-5">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Subtotal
                    </span>

                    <span className="font-medium text-gray-900">
                        ₹
                        {(
                            totals.subtotal ||
                            0
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Shipping
                    </span>

                    <span className="font-medium text-gray-900">
                        Free
                    </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                            Total
                        </span>

                        <span className="text-lg font-bold text-gray-900">
                            ₹
                            {(
                                totals.total ||
                                0
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={
                        onPlaceOrder
                    }
                    disabled={
                        !canPlaceOrder ||
                        placingOrder
                    }
                    className="mt-3 flex h-12 w-full items-center justify-center rounded-lg bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    {placingOrder
                        ? "Placing Order..."
                        : "Place Order"}
                </button>

                {!address && (
                    <p className="text-center text-xs text-gray-400">
                        Enter your delivery
                        address to continue.
                    </p>
                )}
            </div>
        </aside>
    );
}