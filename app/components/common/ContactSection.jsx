import React from "react";
import Link from "next/link";
import {
    FiArrowRight,
    FiClock,
    FiMail,
    FiMapPin,
    FiMessageCircle,
    FiPhone,
    FiSend,
    FiShield,
    FiShoppingBag,
} from "react-icons/fi";
import { getSiteInfo } from "@/app/lib/common";
import Form from "./Form";

const ContactSection = async () => {
    const siteInfo = await getSiteInfo();
    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-red-50 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-gray-100 blur-3xl" />

            <div className="relative container">

                {/* Intro */}
                <div className="mb-12 max-w-2xl">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
                        <FiMessageCircle className="h-3.5 w-3.5" />
                        We're Here To Help
                    </div>

                    <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Have a question?
                        <span className="block text-red-600">
                            Let's talk.
                        </span>
                    </div>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                        Need help with an order, product information, delivery,
                        or anything else? Send us a message and our team will
                        get back to you.
                    </p>

                </div>

                {/* Contact layout */}
                <div className="grid overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)] lg:grid-cols-[0.85fr_1.15fr]">

                    {/* Left panel */}
                    <div className="relative overflow-hidden bg-[#111111] p-7 text-white sm:p-10 lg:p-12">

                        {/* Decorative circles */}
                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[45px] border-red-600/10" />
                        <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full border-[40px] border-white/5" />

                        <div className="relative">

                            <div className="mb-10">
                                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
                                    Contact Information
                                </div>

                                <div className="text-2xl font-bold sm:text-3xl">
                                    We would love to
                                    <span className="block text-red-500">
                                        hear from you.
                                    </span>
                                </div>

                                <p className="mt-4 text-sm leading-6 text-gray-400">
                                    Whether you have a question about a
                                    product or need assistance with an
                                    order, we're here for you.
                                </p>
                            </div>

                            {/* Contact details */}
                            <div className="space-y-5">

                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-red-500">
                                        <FiMail className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500">
                                            Email us
                                        </div>

                                        <a
                                            href={`tel:${siteInfo?.primaryEmail}`}
                                            className="mt-1 block text-sm font-medium text-white transition hover:text-red-500"
                                        >
                                            {siteInfo?.primaryEmail}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-red-500">
                                        <FiMapPin className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500">
                                            Our location
                                        </div>

                                        <div className="mt-1 text-sm font-medium text-white">
                                            {siteInfo?.primaryAddress}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Divider */}
                            <div className="my-9 h-px bg-white/10" />

                            {/* Support info */}
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                                    <FiClock className="h-5 w-5" />
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        Customer Support
                                    </div>

                                    <div className="mt-1 text-xs leading-5 text-gray-400">
                                        We're available to help with
                                        your shopping experience.
                                    </div>
                                </div>
                            </div>

                            {/* Trust */}
                            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <FiShield className="h-5 w-5 shrink-0 text-red-500" />

                                <div className="text-xs leading-5 text-gray-400">
                                    Your information is kept private
                                    and secure.
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right form */}
                    <div className="p-7 sm:p-10 lg:p-12">

                        <div className="mb-8">
                            <div className="text-xl font-bold text-gray-900">
                                Send us a message
                            </div>

                            <p className="mt-2 text-sm text-gray-500">
                                Fill in the details below and we'll get
                                back to you as soon as possible.
                            </p>
                        </div>

                        {/* Form */}
                        <Form siteInfo={siteInfo} />

                        <div className="mt-5 text-center text-xs text-gray-400">
                            We usually respond as soon as possible.
                        </div>

                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5 sm:flex-row">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                            <FiShoppingBag className="h-4 w-4" />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Looking for something specific?
                            </div>

                            <div className="text-xs text-gray-500">
                                Explore our products while you're here.
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200 transition hover:bg-red-600 hover:text-white hover:ring-red-600"
                    >
                        Shop Products
                        <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                </div>

            </div>
        </section>
    );
};

export default ContactSection;