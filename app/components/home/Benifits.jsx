import Link from "next/link";
import React from "react";
import {
    FiArrowUpRight,
    FiCheck,
    FiClock,
    FiGift,
    FiHeart,
    FiShield,
    FiShoppingBag,
    FiTruck,
} from "react-icons/fi";

const Benifits = () => {
    const features = [
        {
            icon: FiTruck,
            title: "Quick Delivery",
            text: "From our store to your doorstep, without the long wait.",
        },
        {
            icon: FiShield,
            title: "Shop With Confidence",
            text: "A secure and reliable shopping experience from start to finish.",
        },
        {
            icon: FiGift,
            title: "More Value",
            text: "Great products, exciting offers and prices you'll love.",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[#f2f3f8] pb-12">

             {/* Bottom feature strip */}
            <div className="container px-0!">
                <div className="my-6 grid gap-4 md:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-900 transition-colors duration-300 group-hover:bg-orange-50 group-hover:text-orange-500">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div>
                                    <div className="text-sm font-bold text-gray-900">
                                        {feature.title}
                                    </div>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        {feature.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Decorative shapes */}
            <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />

            {/* Main Feature */}
            <div className="container relative overflow-hidden bg-gradient-to-br from-black via-gray-800 to-red-600 px-6 py-10 shadow-2xl rounded-xl shadow-orange-200/50 sm:px-10 lg:px-14 lg:py-14">

                {/* Decorative circles */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
                <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full border-[50px] border-white/5" />

                <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

                    {/* Left */}
                    <div className="max-w-xl lg:px-8 px-4">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                            <FiHeart className="h-3.5 w-3.5 fill-white" />
                            Made For You
                        </div>

                        <div className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                            More than
                            <span className="block text-orange-100">
                                just shopping.
                            </span>
                        </div>

                        <p className="mt-6 max-w-lg text-sm leading-7 text-white/80 sm:text-base">
                            Discover products you'll love, enjoy great offers
                            and experience a simpler way to shop. Everything
                            you need, thoughtfully brought together in one
                            place.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href={'/products'} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg">
                                <FiShoppingBag className="h-4 w-4" />
                                Explore Products
                            </Link>

                            <Link href={'/products'} className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm">
                                <FiArrowUpRight className="h-4 w-4" />
                                Discover More
                            </Link>
                        </div>
                    </div>

                    {/* Right - floating visual */}
                    <div className="relative mx-auto w-full max-w-md">

                        {/* Main white card */}
                        <div className="relative rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">

                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Your Shopping Experience
                                    </div>

                                    <div className="mt-2 text-2xl font-bold text-gray-900">
                                        Made Simple
                                    </div>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                                    <FiShoppingBag className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="my-7 h-px bg-gray-100" />

                            <div className="space-y-5">

                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-500">
                                        <FiCheck className="h-5 w-5" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-gray-900">
                                            Quality Checked
                                        </div>
                                        <div className="mt-1 text-xs text-gray-400">
                                            Products selected with care
                                        </div>
                                    </div>

                                    <FiCheck className="text-green-500" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                                        <FiTruck className="h-5 w-5" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-gray-900">
                                            Fast & Reliable
                                        </div>
                                        <div className="mt-1 text-xs text-gray-400">
                                            Delivered to your doorstep
                                        </div>
                                    </div>

                                    <FiCheck className="text-blue-500" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-500">
                                        <FiShield className="h-5 w-5" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-gray-900">
                                            Safe & Secure
                                        </div>
                                        <div className="mt-1 text-xs text-gray-400">
                                            Shop with complete confidence
                                        </div>
                                    </div>

                                    <FiCheck className="text-purple-500" />
                                </div>

                            </div>

                            <div className="mt-7 rounded-2xl bg-gray-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
                                        <FiClock className="h-4 w-4" />
                                    </div>

                                    <div>
                                        <div className="text-xs font-medium text-gray-400">
                                            Shopping made easy
                                        </div>

                                        <div className="text-sm font-semibold text-gray-900">
                                            Whenever you need it.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-left-8">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                                <FiGift className="h-5 w-5" />
                            </div>

                            <div>
                                <div className="text-sm font-bold text-gray-900">
                                    Great Value
                                </div>
                                <div className="text-xs text-gray-400">
                                    Every single day
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
           
        </section>
    );
};

export default Benifits;