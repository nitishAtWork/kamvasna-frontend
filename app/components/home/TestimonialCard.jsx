"use client";

import React from "react";
import Image from "next/image";
import { FiCheck, FiMessageCircle, FiStar } from "react-icons/fi";

import { getImageUrl } from "@/app/lib/imageUrl";

export default function TestimonialCard({ value }) {
    const {
        user,
        rating = 0,
        title,
        comment,
        isVerifiedPurchase,
        createdAt,
    } = value || {};

    const name = user?.name || "Anonymous";

    const createdAtText = createdAt
        ? new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "";

    const initials = name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="group flex h-full min-h-[270px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(0,0,0,0.10)]">

            {/* Top */}
            <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-sm font-bold text-gray-700">

                        {user?.avatar ? (
                            <Image
                                src={getImageUrl(user.avatar)}
                                alt={name}
                                fill
                                sizes="44px"
                                className="object-cover"
                            />
                        ) : (
                            initials
                        )}

                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            {name}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">

                            {isVerifiedPurchase && (
                                <>
                                    <FiCheck className="h-3 w-3 text-green-500" />

                                    <span className="text-xs text-gray-400">
                                        Verified purchase
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                                </>
                            )}

                            <span className="text-xs text-gray-400">
                                {createdAtText}
                            </span>

                        </div>
                    </div>
                </div>

                {/* Quote */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                    <FiMessageCircle className="h-4 w-4" />
                </div>

            </div>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-0.5">

                {Array.from({ length: 5 }, (_, index) => (
                    <FiStar
                        key={index}
                        className={`h-4 w-4 ${
                            index < rating
                                ? "fill-[#efc325] text-[#efc325]"
                                : "text-gray-200"
                        }`}
                    />
                ))}

            </div>

            {/* Title */}
            {title && (
                <p className="mt-4 text-sm font-semibold text-gray-900">
                    {title}
                </p>
            )}

            {/* Review */}
            <p className="mt-2 flex-1 text-[15px] leading-7 text-gray-600">
                “{comment}”
            </p>

            {/* Bottom */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                {isVerifiedPurchase ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-medium text-green-600">
                        <FiCheck className="h-3 w-3" />
                        Verified purchase
                    </span>
                ) : (
                    <span className="rounded-full bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-gray-500">
                        Customer review
                    </span>
                )}

                <span className="text-xs text-gray-400">
                    {createdAtText}
                </span>

            </div>

        </div>
    );
}