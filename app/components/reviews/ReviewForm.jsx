"use client";

import {
    useRef,
    useState,
} from "react";
import { toast } from "sonner";

import {
    FiCamera,
    FiCheckCircle,
    FiImage,
    FiSend,
    FiStar,
    FiX,
} from "react-icons/fi";

import { reviewApi } from "@/app/lib/review";

export default function ReviewForm({
    productId,
    onSuccess,
    onCancel,
}) {
    const fileInputRef = useRef(null);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] =
        useState(0);

    const [title, setTitle] =
        useState("");

    const [comment, setComment] =
        useState("");

    const [images, setImages] =
        useState([]);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(
            event.target.files || []
        );

        if (!selectedFiles.length) {
            return;
        }

        setError("");

        const remaining =
            5 - images.length;

        const filesToAdd =
            selectedFiles.slice(
                0,
                remaining
            );

        const invalidFile =
            filesToAdd.find(
                (file) =>
                    ![
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/webp",
                        "image/avif",
                        "image/jfif",
                        "image/gif",
                    ].includes(
                        file.type
                    )
            );

        if (invalidFile) {
            setError(
                "Please select only valid image files."
            );

            event.target.value = "";
            return;
        }

        const oversizedFile =
            filesToAdd.find(
                (file) =>
                    file.size >
                    5 * 1024 * 1024
            );

        if (oversizedFile) {
            setError(
                "Each image must be 5MB or smaller."
            );

            event.target.value = "";
            return;
        }

        setImages((previous) => [
            ...previous,
            ...filesToAdd,
        ]);

        event.target.value = "";
    };

    const removeImage = (index) => {
        setImages((previous) =>
            previous.filter(
                (_, imageIndex) =>
                    imageIndex !== index
            )
        );
    };

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        setError("");

        if (!rating) {
            setError(
                "Please select a rating."
            );
            return;
        }

        if (!comment.trim()) {
            setError(
                "Please write your review."
            );
            return;
        }

        try {
            setSubmitting(true);

            const response =
                await reviewApi.create(
                    productId,
                    {
                        rating,
                        title:
                            title.trim(),
                        comment:
                            comment.trim(),
                        images,
                    }
                );

            setSuccess(true);

            toast.success(response?.message)

            if (onSuccess) {
                onSuccess(response);
            }
        } catch (error) {
            console.error(
                "Review submission error:",
                error
            );

            toast.error(
                error?.message ||
                "Unable to submit your review."
            );

            setError(
                error?.message ||
                "Unable to submit your review."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle
                        size={28}
                    />
                </div>

                <h3 className="mt-4 text-lg font-bold text-black">
                    Review submitted
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                    Thank you for sharing
                    your experience.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-black">
                        Write a Review
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Share your experience
                        with this product.
                    </p>
                </div>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-black hover:text-white"
                    >
                        <FiX />
                    </button>
                )}
            </div>

            {/* Rating */}
            <div>
                <label className="text-sm font-semibold text-black">
                    Your Rating
                </label>

                <div className="mt-3 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(
                        (star) => {
                            const active =
                                (
                                    hoverRating ||
                                    rating
                                ) >= star;

                            return (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                        setRating(
                                            star
                                        )
                                    }
                                    onMouseEnter={() =>
                                        setHoverRating(
                                            star
                                        )
                                    }
                                    onMouseLeave={() =>
                                        setHoverRating(
                                            0
                                        )
                                    }
                                    className="transition hover:scale-110"
                                    aria-label={`Rate ${star} stars`}
                                >
                                    <FiStar
                                        size={30}
                                        className={
                                            active
                                                ? "fill-yellow-500 text-yellow-500"
                                                : "text-gray-300"
                                        }
                                    />
                                </button>
                            );
                        }
                    )}

                    {rating > 0 && (
                        <span className="ml-2 text-sm font-medium text-gray-600">
                            {rating}/5
                        </span>
                    )}
                </div>
            </div>

            {/* Title */}
            <div className="mt-6">
                <label
                    htmlFor="review-title"
                    className="text-sm font-semibold text-black"
                >
                    Review Title
                    <span className="ml-1 font-normal text-gray-400">
                        (optional)
                    </span>
                </label>

                <input
                    id="review-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(
                            event.target.value
                        )
                    }
                    maxLength={150}
                    placeholder="Give your review a title"
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:bg-white"
                />
            </div>

            {/* Comment */}
            <div className="mt-5">
                <label
                    htmlFor="review-comment"
                    className="text-sm font-semibold text-black"
                >
                    Your Review
                </label>

                <textarea
                    id="review-comment"
                    value={comment}
                    onChange={(event) =>
                        setComment(
                            event.target.value
                        )
                    }
                    maxLength={3000}
                    rows={5}
                    placeholder="What did you like or dislike about this product?"
                    className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:bg-white"
                />

                <div className="mt-1 text-right text-xs text-gray-400">
                    {comment.length}/3000
                </div>
            </div>

            {/* Images */}
            <div className="mt-5">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-black">
                        Add Photos
                    </label>

                    <span className="text-xs text-gray-400">
                        {images.length}/5
                    </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                    Upload up to 5 product
                    photos. Maximum 5MB each.
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                    {images.map(
                        (
                            file,
                            index
                        ) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="group relative h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                            >
                                <img
                                    src={URL.createObjectURL(
                                        file
                                    )}
                                    alt={`Review image ${index +
                                        1
                                        }`}
                                    className="h-full w-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeImage(
                                            index
                                        )
                                    }
                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-red-600"
                                >
                                    <FiX
                                        size={
                                            13
                                        }
                                    />
                                </button>
                            </div>
                        )
                    )}

                    {images.length <
                        5 && (
                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="flex h-24 w-24 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition hover:border-yellow-500 hover:bg-red-50 hover:text-red-600"
                            >
                                <FiCamera
                                    size={
                                        22
                                    }
                                />

                                <span className="mt-1 text-xs font-medium">
                                    Add Photo
                                </span>
                            </button>
                        )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif,image/jfif,image/gif"
                    multiple
                    onChange={
                        handleImageChange
                    }
                    className="hidden"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Submit */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={
                            submitting
                        }
                        className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <FiSend />
                            Submit Review
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}