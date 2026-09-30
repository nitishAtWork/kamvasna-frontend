"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
    const [visible, setVisible] = useState(8);

    if (!products.length) {
        return (
            <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-300">
                <p className="text-sm text-gray-500">
                    No products found.
                </p>
            </div>
        );
    }

    const visibleProducts = products.slice(0, visible);
    const hasMore = visible < products.length;

    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => setVisible(products.length)}
                        className="border px-12 py-2 h-fit rounded-2xl"
                    >
                        Load More
                    </button>
                </div>
            )}
        </>
    );
}
