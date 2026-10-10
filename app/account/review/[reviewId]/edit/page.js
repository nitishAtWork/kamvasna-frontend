"use client";

import React, {
    useEffect,
    useState,
} from "react";

import { useParams, useRouter } from "next/navigation";

import {
    FiArrowLeft,
    FiStar,
} from "react-icons/fi";

import { reviewApi } from "@/app/lib/review";

export default function EditReviewPage() {
    const params = useParams();
    const router = useRouter();

    const reviewId =
        params?.reviewId;

    const [review, setReview] =
        useState(null);

    const [rating, setRating] =
        useState(0);

    const [title, setTitle] =
        useState("");

    const [comment, setComment] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadReview = async () => {
            try {
                const response =
                    await reviewApi.getMyReviews({
                        page: 1,
                        limit: 100,
                    });

                const found =
                    response?.data?.reviews?.find(
                        (item) =>
                            item._id ===
                            reviewId
                    );

                if (!found) {
                    setError(
                        "Review not found."
                    );
                    return;
                }

                setReview(found);
                setRating(found.rating);
                setTitle(
                    found.title || ""
                );
                setComment(
                    found.comment || ""
                );
            } catch (error) {
                setError(
                    error?.message ||
                        "Unable to load review."
                );
            } finally {
                setLoading(false);
            }
        };

        if (reviewId) {
            loadReview();
        }
    }, [reviewId]);

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        if (!rating) {
            setError(
                "Please select a rating."
            );
            return;
        }

        if (comment.trim().length < 5) {
            setError(
                "Review must contain at least 5 characters."
            );
            return;
        }

        try {
            setSaving(true);
            setError("");

            await reviewApi.update(
                reviewId,
                {
                    rating,
                    title,
                    comment,
                }
            );

            router.push(
                "/dashboard/review"
            );

            router.refresh();
        } catch (error) {
            setError(
                error?.message ||
                    "Unable to update review."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="h-96 animate-pulse rounded-2xl bg-gray-50" />
        );
    }

    if (!review) {
        return (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
                <p className="text-sm text-red-600">
                    {error ||
                        "Review not found."}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl py-15">

            <button
                type="button"
                onClick={() =>
                    router.back()
                }
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
                <FiArrowLeft />
                Back to reviews
            </button>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Review
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Update your experience with this
                    product.
                </p>

                {error && (
                    <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >

                    {/* Rating */}
                    <div>
                        <label className="text-sm font-semibold text-gray-900">
                            Your rating
                        </label>

                        <div className="mt-3 flex gap-2">

                            {Array.from(
                                { length: 5 },
                                (_, index) => {
                                    const value =
                                        index + 1;

                                    return (
                                        <button
                                            key={
                                                value
                                            }
                                            type="button"
                                            onClick={() =>
                                                setRating(
                                                    value
                                                )
                                            }
                                            className="transition hover:scale-110"
                                        >
                                            <FiStar
                                                className={`h-7 w-7 ${
                                                    value <=
                                                    rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-200"
                                                }`}
                                            />
                                        </button>
                                    );
                                }
                            )}

                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-sm font-semibold text-gray-900">
                            Review title
                        </label>

                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target
                                        .value
                                )
                            }
                            maxLength={150}
                            className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            placeholder="Give your review a title"
                        />
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="text-sm font-semibold text-gray-900">
                            Your review
                        </label>

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target
                                        .value
                                )
                            }
                            maxLength={3000}
                            rows={6}
                            className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            placeholder="Share your experience..."
                        />

                        <div className="mt-1 text-right text-xs text-gray-400">
                            {comment.length}/3000
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                        <button
                            type="button"
                            onClick={() =>
                                router.back()
                            }
                            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}