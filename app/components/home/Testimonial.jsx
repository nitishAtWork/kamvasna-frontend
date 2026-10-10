"use client";

import React, { useEffect, useState } from "react";
import {
    FiCheck,
    FiMessageCircle,
    FiShoppingBag,
    FiStar,
    FiTruck,
} from "react-icons/fi";

import { reviewApi } from "@/app/lib/review";

const getInitials = (name) => {
    return (
        name
            ?.split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U"
    );
};

const getAvatarColor = (name) => {
    const colors = [
        "bg-red-100 text-red-700",
        "bg-purple-100 text-purple-600",
        "bg-blue-100 text-blue-600",
        "bg-green-100 text-green-600",
        "bg-pink-100 text-pink-600",
        "bg-yellow-100 text-yellow-600",
    ];

    const index =
        name?.charCodeAt(0) % colors.length || 0;

    return colors[index];
};

const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
};

export default function Testimonial() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response =
                    await reviewApi.getAllApproved();

                setReviews(response?.data || []);
            } catch (error) {
                console.error(
                    "Failed to fetch reviews:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    /*
     * Calculate rating summary
     * from approved reviews.
     */
    const totalReviews = reviews.length;

    const averageRating =
        totalReviews > 0
            ? (
                  reviews.reduce(
                      (sum, review) =>
                          sum +
                          Number(
                              review.rating || 0
                          ),
                      0
                  ) / totalReviews
              ).toFixed(1)
            : "0.0";

    return (
        <section className="relative overflow-hidden bg-white pb-12">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-pink-100/50 blur-3xl" />

            <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-purple-100/40 blur-3xl" />

            <div className="relative container">

                {/* Intro */}
                <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1fr_auto]">

                    <div className="max-w-2xl">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-red-600">

                            <FiMessageCircle className="h-3.5 w-3.5" />

                            Customer Love

                        </div>

                        <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">

                            Loved by shoppers,

                            <span className="block text-red-600">
                                trusted by customers.
                            </span>

                        </div>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                            See what customers are saying
                            about their products, delivery
                            and overall shopping experience.
                        </p>

                    </div>

                    {/* Rating Summary */}
                    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
                            <FiStar className="h-6 w-6 fill-current" />
                        </div>

                        <div>

                            <div className="flex items-center gap-3">

                                <span className="text-3xl font-bold text-gray-900">
                                    {averageRating}
                                </span>

                                <div>

                                    <div className="flex gap-0.5 text-yellow-400">

                                        {Array.from(
                                            {
                                                length: 5,
                                            },
                                            (_, index) => (
                                                <FiStar
                                                    key={
                                                        index
                                                    }
                                                    className="h-4 w-4 fill-current"
                                                />
                                            )
                                        )}

                                    </div>

                                    <div className="mt-1 text-xs text-gray-400">
                                        {totalReviews}{" "}
                                        customer{" "}
                                        {totalReviews ===
                                        1
                                            ? "review"
                                            : "reviews"}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Trust indicators */}
                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
                            <FiCheck className="h-4 w-4" />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Verified Reviews
                            </div>

                            <div className="text-xs text-gray-400">
                                From real customers
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <FiTruck className="h-4 w-4" />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Fast Delivery
                            </div>

                            <div className="text-xs text-gray-400">
                                Safe & discreet packaging
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                            <FiShoppingBag className="h-4 w-4" />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Happy Customers
                            </div>

                            <div className="text-xs text-gray-400">
                                Shopping with confidence
                            </div>
                        </div>

                    </div>

                </div>

                {/* Reviews */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    {loading ? (
                        Array.from(
                            { length: 3 },
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-[270px] animate-pulse rounded-2xl border border-gray-100 bg-gray-50"
                                />
                            )
                        )
                    ) : reviews.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">

                            <FiMessageCircle className="mx-auto h-8 w-8 text-gray-300" />

                            <p className="mt-3 text-sm text-gray-500">
                                No customer reviews yet.
                            </p>

                        </div>
                    ) : (
                        reviews.map((review) => {
                            const name =
                                review.user?.name ||
                                "Anonymous";

                            return (
                                <div
                                    key={review._id}
                                    className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl"
                                >

                                    {/* Top */}
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            {/* Avatar */}
                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(
                                                    name
                                                )}`}
                                            >
                                                {getInitials(
                                                    name
                                                )}
                                            </div>

                                            <div>

                                                <div className="text-sm font-semibold text-gray-900">
                                                    {name}
                                                </div>

                                                <div className="mt-1 flex items-center gap-1.5">

                                                    {review.isVerifiedPurchase ? (
                                                        <>
                                                            <FiCheck className="h-3 w-3 text-green-500" />

                                                            <span className="text-xs text-gray-400">
                                                                Verified
                                                                purchase
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">
                                                            Customer
                                                            review
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-400">
                                            <FiMessageCircle className="h-4 w-4" />
                                        </div>

                                    </div>

                                    {/* Stars */}
                                    <div className="mt-5 flex items-center gap-0.5">

                                        {Array.from(
                                            {
                                                length: 5,
                                            },
                                            (_, index) => (
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

                                    </div>

                                    {/* Product */}
                                    {review.product?.name && (
                                        <p className="mt-3 line-clamp-1 text-xs font-medium text-gray-400">
                                            {review.product.name}
                                        </p>
                                    )}

                                    {/* Title */}
                                    {review.title && (
                                        <p className="mt-2 text-sm font-semibold text-gray-900">
                                            {review.title}
                                        </p>
                                    )}

                                    {/* Review */}
                                    <p className="mt-2 flex-1 text-sm leading-7 text-gray-600">
                                        {review.comment}
                                    </p>

                                    {/* Bottom */}
                                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">

                                        <span className="rounded-full bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-gray-500">
                                            {formatDate(
                                                review.createdAt
                                            )}
                                        </span>

                                        {review.isVerifiedPurchase && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
                                                <FiCheck className="h-3 w-3" />
                                                Verified
                                            </span>
                                        )}

                                    </div>

                                </div>
                            );
                        })
                    )}

                </div>

            </div>

        </section>
    );
}