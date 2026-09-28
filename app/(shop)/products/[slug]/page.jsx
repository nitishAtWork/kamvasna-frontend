"use client";

import {
    useEffect,
    useState,
} from "react";

import ProductDetails from "@/app/components/products/ProductDetails";
import ProductCardSkeleton from "@/app/components/products/ProductCardSkeleton";

import { productApi } from "@/app/lib/product";

export default function ProductPage({
    params,
}) {
    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadProduct =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const { slug } =
                        await params;

                    const response =
                        await productApi.getProduct(
                            slug
                        );

                    /*
                     * Adjust this only if your
                     * actual API response differs.
                     */

                    const data =
                        response?.data ||
                        response;

                    const productData =
                        data?.data ||
                        data?.product ||
                        data;

                    setProduct(
                        productData
                    );
                } catch (error) {
                    console.error(
                        "Failed to load product:",
                        error
                    );

                    setError(
                        "Unable to load product."
                    );
                } finally {
                    setLoading(false);
                }
            };

        loadProduct();
    }, [params]);

    if (loading) {
        return (
            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />

                    <div className="space-y-5">
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

                        <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />

                        <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />

                        <div className="h-20 w-full animate-pulse rounded bg-gray-200" />

                        <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
                    </div>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-5">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Product not found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error ||
                            "The product you're looking for doesn't exist."}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <ProductDetails
            product={product}
        />
    );
}