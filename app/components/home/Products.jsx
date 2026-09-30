"use client";

import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import ProductCard from "../products/ProductCard";

export default function Products({ products = [] }) {
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
        <div className="container py-14">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="mt-10 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setVisible(products.length)}
                        className="group flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-8 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white hover:shadow-lg"
                    >
                        <span>Load More</span>

                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:bg-white/20">
                            <FiArrowDown
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-y-0.5"
                            />
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
