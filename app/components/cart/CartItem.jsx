"use client";

import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";

import CartQuantity from "./CartQuantity";
import { useCart } from "@/app/context/CartContext";
import { getImageUrl } from "@/app/lib/imageUrl";

export default function CartItem({
    item,
}) {
    const {
        updateQuantity,
        removeFromCart,
        updatingProductId,
    } = useCart();

    const product = item.product;

    if (!product) {
        return null;
    }

    const isUpdating =
        updatingProductId === product._id;

    const itemTotal =
        product.price * item.quantity;

    const handleDecrease = () => {
        if (item.quantity <= 1) {
            return;
        }

        updateQuantity(
            product._id,
            item.quantity - 1
        );
    };

    const handleIncrease = () => {
        if (
            product.stock &&
            item.quantity >= product.stock
        ) {
            return;
        }

        updateQuantity(
            product._id,
            item.quantity + 1
        );
    };

    const handleRemove = () => {
        removeFromCart(product._id);
    };

    return (
        <div className="flex gap-4 border-b border-gray-200 py-5">
            {/* Product image */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {product.img ? (
                    <Image
                        src={getImageUrl(
                            product.img
                        )}
                        alt={product.name}
                        title={product.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No Image
                    </div>
                )}
            </div>

            {/* Product information */}
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-4">
                    <div>
                        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                            {product.name}
                        </h3>

                        {product.brand && (
                            <p className="mt-1 text-xs text-gray-500">
                                {product.brand}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={isUpdating}
                        className="shrink-0 text-gray-400 transition hover:text-red-500 disabled:opacity-50"
                        aria-label={`Remove ${product.name}`}
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>

                <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                    <CartQuantity
                        quantity={item.quantity}
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                        disabled={isUpdating}
                    />

                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                            ₹
                            {itemTotal.toLocaleString(
                                "en-IN"
                            )}
                        </p>

                        {item.quantity > 1 && (
                            <p className="mt-1 text-xs text-gray-500">
                                ₹
                                {product.price.toLocaleString(
                                    "en-IN"
                                )}{" "}
                                each
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}