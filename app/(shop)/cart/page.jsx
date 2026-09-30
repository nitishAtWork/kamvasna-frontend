"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import {
    useCart,
} from "@/app/context/CartContext";

import CartList from "@/app/components/cart/CartList";
import CartSummary from "@/app/components/cart/CartSummary";
import EmptyCart from "@/app/components/cart/EmptyCart";

export default function CartPage() {
    const {
        items,
        totals,
        loading,
    } = useCart();

    if (loading) {
        return (
            <main className="mx-auto max-w-7xl px-5 py-10">
                <div className="animate-pulse">
                    <div className="h-8 w-32 rounded bg-gray-200" />

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
                        <div className="h-80 rounded-xl bg-gray-200" />

                        <div className="h-64 rounded-xl bg-gray-200" />
                    </div>
                </div>
            </main>
        );
    }

    if (!items.length) {
        return <EmptyCart />;
    }

    return (
        <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
                >
                    <FiArrowLeft size={16} />
                    Continue Shopping
                </Link>

                <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Shopping Cart
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            {totals.itemCount}{" "}
                            {totals.itemCount ===
                            1
                                ? "item"
                                : "items"}{" "}
                            in your cart
                        </p>
                    </div>
                </div>
            </div>

            {/* Cart */}
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
                <CartList
                    items={items}
                />

                <div className="lg:sticky lg:top-6">
                    <CartSummary
                        totals={totals}
                    />
                </div>
            </div>
        </main>
    );
}