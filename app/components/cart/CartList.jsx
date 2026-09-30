"use client";

import CartItem from "./CartItem";

export default function CartList({
    items,
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white px-5">
            {items.map((item) => (
                <CartItem
                    key={item.product?._id}
                    item={item}
                />
            ))}
        </div>
    );
}