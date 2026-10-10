"use client";

import Image from "next/image";
import { getImageUrl } from "@/app/lib/imageUrl";
import Link from "next/link";

export default function CheckoutSummary({
    items = [],
    totals = {},
    address,
    placingOrder,
    onPlaceOrder,
}) {
    const canPlaceOrder = Boolean(address);

    const deliveryCharge =
        Number(totals?.deliveryCharge) || 0;

    const subtotal =
        Number(totals?.subtotal) || 0;

    const total =
        Number(totals?.total) ||
        subtotal + deliveryCharge;

    return (
        <aside className="h-fit rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-5">
                <h2 className="text-lg font-bold text-gray-900">
                    Order Summary
                </h2>
            </div>

            <div className="divide-y divide-gray-100">
                {items.map((item) => {
                    const product = item.product;

                    return (
                        <Link
                         href={`/products/${product.slug}`}
                            key={product._id}
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
                                    {product.name}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Qty:{" "}
                                    {item.quantity}
                                </p>

                                <div className="flex gap-2 items-baseline">
                                    <p className="mt-1 text-sm font-semibold text-gray-900">
                                        ₹
                                        {(
                                            product.price *
                                            item.quantity
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                    {
                                        product.deliveryCharge > 0 && (
                                            <p className="text-[10px] text-slate-500">+ ₹{(
                                                product.deliveryCharge
                                            ).toLocaleString(
                                                "en-IN"
                                            )} Delivery Fee</p>
                                        )
                                    }
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="space-y-3 border-t border-gray-200 p-5">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
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

                {/* Delivery */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        Delivery
                    </span>

                    <span className="font-medium text-gray-900">
                        {deliveryCharge > 0
                            ? `₹${deliveryCharge.toLocaleString(
                                "en-IN"
                            )}`
                            : "Free"}
                    </span>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">
                            Total
                        </span>

                        <span className="text-lg font-bold text-gray-900">
                            ₹
                            {total.toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>
                </div>

                {/* Place Order */}
                <button
                    type="button"
                    onClick={onPlaceOrder}
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