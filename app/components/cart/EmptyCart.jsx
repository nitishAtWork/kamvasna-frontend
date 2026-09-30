"use client";

import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export default function EmptyCart() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <FiShoppingBag
                    size={32}
                    className="text-gray-500"
                />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
                Your cart is empty
            </h1>

            <p className="mt-2 max-w-md text-sm text-gray-500">
                Looks like you haven't added
                anything to your cart yet.
            </p>

            <Link
                href="/products"
                className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
                Continue Shopping
            </Link>
        </div>
    );
}