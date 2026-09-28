"use client";

import { FiMinus, FiPlus } from "react-icons/fi";

export default function CartQuantity({
    quantity,
    onDecrease,
    onIncrease,
    disabled = false,
}) {
    return (
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-200">
            <button
                type="button"
                onClick={onDecrease}
                disabled={disabled || quantity <= 1}
                className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
            >
                <FiMinus size={15} />
            </button>

            <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-2 text-sm font-medium">
                {quantity}
            </span>

            <button
                type="button"
                onClick={onIncrease}
                disabled={disabled}
                className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Increase quantity"
            >
                <FiPlus size={15} />
            </button>
        </div>
    );
}