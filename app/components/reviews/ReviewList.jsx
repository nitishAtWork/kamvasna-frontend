"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    FiCamera,
    FiChevronLeft,
    FiChevronRight,
    FiStar,
    FiUser,
} from "react-icons/fi";

import { reviewApi } from "@/app/lib/review";
import { getImageUrl } from "@/app/lib/imageUrl";

export default function ReviewList({
    productId,
    refreshKey = 0,
}) {
    const [reviews, setReviews] =
        useState([]);

    const [summary, setSummary] =
        useState({
            average: 0,
            count: 0,
            distribution: {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0,
            },
        });

    const [pagination, setPagination] =
        useState({
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
        });

    const [page, setPage] =
        useState(1);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const fetchReviews =
        async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await reviewApi.getReviews(
                        productId,
                        {
                            page,
                            limit: 10,
                        }
                    );

                const data =
                    response?.data;

                setReviews(
                    data?.reviews || []
                );

                setSummary(
                    data?.summary || {
                        average: 0,
                        count: 0,
                        distribution: {
                            5: 0,
                            4: 0,
                            3: 0,
                            2: 0,
                            1: 0,
                        },
                    }
                );

                setPagination(
                    data?.pagination || {
                        page,
                        limit: 10,
                        total: 0,
                        totalPages: 0,
                    }
                );
            } catch (error) {
                console.error(
                    "Failed to fetch reviews:",
                    error
                );

                setError(
                    error?.message ||
                        "Unable to load reviews."
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        if (!productId) {
            return;
        }

        fetchReviews();
    }, [
        productId,
        page,
        refreshKey,
    ]);

    const getPercentage = (
        count
    ) => {
        if (!summary.count) {
            return 0;
        }

        return Math.round(
            (count /
                summary.count) *
                100
        );
    };

    const formatDate = (
        date
    ) => {
        if (!date) {
            return "";
        }

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-40 rounded-2xl bg-gray-100" />
                <div className="h-32 rounded-2xl bg-gray-100" />
                <div className="h-32 rounded-2xl bg-gray-100" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div>
            {/* Summary */}
            <div className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:grid-cols-[220px_1fr]">
                {/* Average */}
                <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                    <div className="text-4xl font-bold text-black">
                        {Number(
                            summary.average ||
                                0
                        ).toFixed(1)}
                    </div>

                    <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4, 5].map(
                            (star) => (
                                <FiStar
                                    key={
                                        star
                                    }
                                    size={
                                        18
                                    }
                                    className={
                                        summary.average >=
                                        star
                                            ? "fill-yellow-500 text-yellow-500"
                                            : "text-gray-300"
                                    }
                                />
                            )
                        )}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                        {summary.count}{" "}
                        {summary.count ===
                        1
                            ? "review"
                            : "reviews"}
                    </p>
                </div>

                {/* Distribution */}
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(
                        (star) => {
                            const count =
                                summary
                                    .distribution?.[
                                    star
                                ] || 0;

                            const percentage =
                                getPercentage(
                                    count
                                );

                            return (
                                <div
                                    key={
                                        star
                                    }
                                    className="flex items-center gap-3"
                                >
                                    <span className="w-10 text-sm font-medium text-gray-600">
                                        {star}{" "}
                                        ★
                                    </span>

                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-yellow-500 transition-all"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <span className="w-10 text-right text-xs text-gray-400">
                                        {count}
                                    </span>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>

            {/* Reviews */}
            {reviews.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        <FiStar
                            size={24}
                        />
                    </div>

                    <h3 className="mt-4 font-bold text-black">
                        No reviews yet
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Be the first to
                        review this
                        product.
                    </p>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {reviews.map(
                        (review) => (
                            <ReviewCard
                                key={
                                    review._id
                                }
                                review={
                                    review
                                }
                            />
                        )
                    )}
                </div>
            )}

            {/* Pagination */}
            {pagination.totalPages >
                1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        disabled={
                            page <= 1
                        }
                        onClick={() =>
                            setPage(
                                (current) =>
                                    current -
                                    1
                            )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <FiChevronLeft />
                    </button>

                    <span className="text-sm font-medium text-gray-600">
                        Page {page} of{" "}
                        {
                            pagination.totalPages
                        }
                    </span>

                    <button
                        type="button"
                        disabled={
                            page >=
                            pagination.totalPages
                        }
                        onClick={() =>
                            setPage(
                                (current) =>
                                    current +
                                    1
                            )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}

function ReviewCard({
    review,
}) {
    const userName =
        review.user?.name ||
        "Customer";

    const avatar =
        review.user?.avatar;

    return (
        <article className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    {avatar ? (
                        <img
                            src={getImageUrl(
                                avatar
                            )}
                            alt={
                                userName
                            }
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                            <FiUser />
                        </div>
                    )}

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-black">
                            {userName}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            <div className="flex gap-0.5">
                                {[
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                ].map(
                                    (
                                        star
                                    ) => (
                                        <FiStar
                                            key={
                                                star
                                            }
                                            size={
                                                13
                                            }
                                            className={
                                                review.rating >=
                                                star
                                                    ? "fill-yellow-500 text-yellow-500"
                                                    : "text-gray-300"
                                            }
                                        />
                                    )
                                )}
                            </div>

                            {review.isVerifiedPurchase && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                                    <FiCheckCircle
                                        size={
                                            11
                                        }
                                    />
                                    Verified Purchase
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <span className="shrink-0 text-xs text-gray-400">
                    {formatReviewDate(
                        review.createdAt
                    )}
                </span>
            </div>

            {review.title && (
                <h3 className="mt-5 text-sm font-bold text-black">
                    {review.title}
                </h3>
            )}

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                {review.comment}
            </p>

            {/* Review Images */}
            {review.images?.length >
                0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                    {review.images.map(
                        (
                            image,
                            index
                        ) => (
                            <a
                                key={
                                    `${image}-${index}`
                                }
                                href={getImageUrl(
                                    image
                                )}
                                target="_blank"
                                rel="noreferrer"
                                className="block h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                            >
                                <img
                                    src={getImageUrl(
                                        image
                                    )}
                                    alt={`Review photo ${
                                        index +
                                        1
                                    }`}
                                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                />
                            </a>
                        )
                    )}
                </div>
            )}

            {review.images?.length >
                0 && (
                <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                    <FiCamera />
                    {review.images.length}{" "}
                    photo
                    {review.images.length >
                    1
                        ? "s"
                        : ""}
                </div>
            )}
        </article>
    );
}

function formatReviewDate(
    date
) {
    if (!date) {
        return "";
    }

    return new Date(
        date
    ).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
}