"use client";

import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductQuantity({
    quantity,
    onDecrease,
    onIncrease,
    disabled = false,
    max,
}) {
    const canDecrease =
        quantity > 1;

    const canIncrease =
        !max || quantity < max;

    return (
        <div className="inline-flex h-12 items-center overflow-hidden rounded-lg border border-gray-300">
            <button
                type="button"
                onClick={onDecrease}
                disabled={
                    disabled ||
                    !canDecrease
                }
                className="flex h-full w-12 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
            >
                <FiMinus size={17} />
            </button>

            <span className="flex h-full min-w-14 items-center justify-center border-x border-gray-300 px-3 text-sm font-semibold text-gray-900">
                {quantity}
            </span>

            <button
                type="button"
                onClick={onIncrease}
                disabled={
                    disabled ||
                    !canIncrease
                }
                className="flex h-full w-12 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Increase quantity"
            >
                <FiPlus size={17} />
            </button>
        </div>
    );
}