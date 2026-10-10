"use client";

import {
    useEffect,
    useState,
} from "react";
import ReviewForm from "@/app/components/reviews/ReviewForm";
import ReviewList from "@/app/components/reviews/ReviewList";
import { useAuth } from "@/app/context/AuthContext";

import ProductDetails from "@/app/components/products/ProductDetails";
import ProductCardSkeleton from "@/app/components/products/ProductCardSkeleton";

import { productApi } from "@/app/lib/product";
import Link from "next/link";
import RelatedProduct from "@/app/components/products/RelatedProduct";

export default function ProductPage({
    params,
}) {
    const { user, logout } = useAuth();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [showReviewForm, setShowReviewForm] =
        useState(false);

    const [reviewRefreshKey, setReviewRefreshKey] =
        useState(0);

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
        <>
            <ProductDetails
                product={product}
            />

            <RelatedProduct />
            
            <section className="my-12">
                <div className="container">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                                Customer Reviews
                            </p>

                            <p className="mt-1 text-2xl font-bold text-black">
                                What customers say
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Real experiences from customers.
                            </p>
                        </div>

                        {
                            user
                                ?
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowReviewForm(
                                            true
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                                >
                                    Write a Review
                                </button>
                                :
                                <Link
                                    href={"/login"}
                                    type="button"
                                    onClick={() =>
                                        setShowReviewForm(
                                            true
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                                >
                                    Write a Review
                                </Link>
                        }


                    </div>

                    {showReviewForm && (
                        <div className="mb-8">
                            <ReviewForm
                                productId={product._id}
                                onCancel={() =>
                                    setShowReviewForm(
                                        false
                                    )
                                }
                                onSuccess={() => {
                                    setShowReviewForm(
                                        false
                                    );

                                    setReviewRefreshKey(
                                        (value) =>
                                            value + 1
                                    );
                                }}
                            />
                        </div>
                    )}

                    <ReviewList
                        productId={product._id}
                        refreshKey={
                            reviewRefreshKey
                        }
                    />
                </div>
            </section>
        </>
    );
}