"use client";

import React, {
    useEffect,
    useState,
} from "react";

import Link from "next/link";

import {
    FiCheck,
    FiEdit2,
    FiMessageCircle,
    FiStar,
    FiTrash2,
    FiPackage,
} from "react-icons/fi";

import { reviewApi } from "@/app/lib/review";
import { getImageUrl } from "@/app/lib/imageUrl";

export default function ReviewsPage() {
    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [deletingId, setDeletingId] =
        useState(null);

    const [error, setError] =
        useState("");

    const fetchReviews = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await reviewApi.getMyReviews({
                    page: 1,
                    limit: 20,
                });

            setReviews(
                response?.data?.reviews || []
            );
        } catch (error) {
            console.error(
                "Failed to fetch reviews:",
                error
            );

            setError(
                error?.message ||
                    "Unable to load your reviews."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (
        reviewId
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this review?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(reviewId);

            await reviewApi.remove(
                reviewId
            );

            setReviews((current) =>
                current.filter(
                    (review) =>
                        review._id !== reviewId
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete review:",
                error
            );

            alert(
                error?.message ||
                    "Unable to delete review."
            );
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">

                <div>
                    <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-100" />

                    <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-100" />
                </div>

                <div className="grid gap-5">

                    {Array.from(
                        { length: 3 },
                        (_, index) => (
                            <div
                                key={index}
                                className="h-48 animate-pulse rounded-2xl border border-gray-100 bg-gray-50"
                            />
                        )
                    )}

                </div>

            </div>
        );
    }

    return (
        <div className="space-y-6 container py-15">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>
                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <FiMessageCircle className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                My Reviews
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage the reviews
                                you have shared.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                    {reviews.length}{" "}
                    {reviews.length === 1
                        ? "Review"
                        : "Reviews"}
                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Empty */}
            {!error &&
                reviews.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                            <FiMessageCircle className="h-7 w-7" />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-gray-900">
                            No reviews yet
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                            You haven't written any
                            product reviews yet.
                            Share your experience
                            after trying a product.
                        </p>

                        <Link
                            href="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            <FiPackage className="h-4 w-4" />
                            Browse Products
                        </Link>

                    </div>
                )}

            {/* Reviews */}
            {reviews.length > 0 && (
                <div className="grid gap-5">

                    {reviews.map((review) => {
                        const product =
                            review.product;

                        const productImage =
                            product?.img
                                ? getImageUrl(
                                      product.img
                                  )
                                : null;

                        return (
                            <div
                                key={
                                    review._id
                                }
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="p-5 sm:p-6">

                                    <div className="flex flex-col gap-5 sm:flex-row">

                                        {/* Product */}
                                        <div className="flex min-w-0 flex-1 gap-4">

                                            <Link
                                                href={
                                                    product?.slug
                                                        ? `/products/${product.slug}`
                                                        : "#"
                                                }
                                                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                                            >
                                                {productImage ? (
                                                    <img
                                                        src={
                                                            productImage
                                                        }
                                                        alt={
                                                            product?.name ||
                                                            "Product"
                                                        }
                                                        className="h-full w-full object-contain p-2"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-gray-300">
                                                        <FiPackage className="h-7 w-7" />
                                                    </div>
                                                )}
                                            </Link>

                                            <div className="min-w-0">

                                                <Link
                                                    href={
                                                        product?.slug
                                                            ? `/products/${product.slug}`
                                                            : "#"
                                                    }
                                                    className="line-clamp-2 text-base font-semibold text-gray-900 transition hover:text-red-600"
                                                >
                                                    {product?.name ||
                                                        "Product"}
                                                </Link>

                                                {/* Rating */}
                                                <div className="mt-2 flex items-center gap-1">

                                                    {Array.from(
                                                        {
                                                            length: 5,
                                                        },
                                                        (
                                                            _,
                                                            index
                                                        ) => (
                                                            <FiStar
                                                                key={
                                                                    index
                                                                }
                                                                className={`h-4 w-4 ${
                                                                    index <
                                                                    review.rating
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "text-gray-200"
                                                                }`}
                                                            />
                                                        )
                                                    )}

                                                    <span className="ml-1 text-xs text-gray-400">
                                                        {
                                                            review.rating
                                                        }
                                                        /5
                                                    </span>

                                                </div>

                                                {/* Verification */}
                                                <div className="mt-2">

                                                    {review.isVerifiedPurchase ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-600">
                                                            <FiCheck className="h-3 w-3" />
                                                            Verified
                                                            purchase
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                                                            Customer
                                                            review
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                        {/* Actions */}
                                        <div className="flex shrink-0 items-start gap-2">

                                            <Link
                                                href={`/account/review/${review._id}/edit`}
                                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                                            >
                                                <FiEdit2 className="h-3.5 w-3.5" />
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                disabled={
                                                    deletingId ===
                                                    review._id
                                                }
                                                onClick={() =>
                                                    handleDelete(
                                                        review._id
                                                    )
                                                }
                                                className="inline-flex items-center gap-2 rounded-xl border border-red-100 px-3.5 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <FiTrash2 className="h-3.5 w-3.5" />

                                                {deletingId ===
                                                review._id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </div>

                                    </div>

                                    {/* Review */}
                                    <div className="mt-5 rounded-xl bg-gray-50 p-4">

                                        {review.title && (
                                            <h3 className="text-sm font-semibold text-gray-900">
                                                {
                                                    review.title
                                                }
                                            </h3>
                                        )}

                                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                                            {
                                                review.comment
                                            }
                                        </p>

                                    </div>

                                    {/* Review Images */}
                                    {review.images?.length >
                                        0 && (
                                        <div className="mt-4 flex flex-wrap gap-3">

                                            {review.images.map(
                                                (
                                                    image,
                                                    index
                                                ) => (
                                                    <a
                                                        key={`${review._id}-${index}`}
                                                        href={getImageUrl(
                                                            image
                                                        )}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="h-20 w-20 overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                                                    >
                                                        <img
                                                            src={getImageUrl(
                                                                image
                                                            )}
                                                            alt={`Review image ${
                                                                index +
                                                                1
                                                            }`}
                                                            className="h-full w-full object-cover transition hover:scale-105"
                                                        />
                                                    </a>
                                                )
                                            )}

                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">

                                        <span className="text-xs text-gray-400">
                                            Reviewed on{" "}
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>

                                        {review.isEdited && (
                                            <span className="text-xs text-gray-400">
                                                Edited
                                            </span>
                                        )}

                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}