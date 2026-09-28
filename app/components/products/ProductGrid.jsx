"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({
    products = [],
}) {
    if (!products.length) {
        return (
            <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-300">
                <p className="text-sm text-gray-500">
                    No products found.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(
                (product) => (
                    <ProductCard
                        key={
                            product._id
                        }
                        product={
                            product
                        }
                    />
                )
            )}
        </div>
    );
}