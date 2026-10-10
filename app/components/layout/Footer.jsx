import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getSiteInfo } from "@/app/lib/common";

import {
    FaFacebook,
    FaInstagram,
    FaPinterest,
    FaWhatsapp,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import {
    FiArrowRight,
    FiChevronRight,
    FiMail,
    FiMapPin,
    FiPhone,
    FiShield,
    FiTruck,
} from "react-icons/fi";

const shopLinks = [
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/products" },
    { label: "Best Sellers", href: "/products" },
    { label: "Special Offers", href: "/products" },
];

const customerLinks = [
    { label: "My Account", href: "/account" },
    { label: "My Orders", href: "/orders" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Contact Us", href: "/contact" },
];

const helpLinks = [
    { label: "Shipping Information", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
];

const Footer = async () => {
    const siteInfo = await getSiteInfo();

    return (
        <footer className="border-t border-gray-100 bg-white text-gray-600">

            {/* Newsletter / CTA */}
            <div className="bg-[#f7f7f5]">
                <div className="container py-12">

                    <div className="flex flex-col gap-8 rounded-[2rem] bg-gradient-to-r from-black to-black px-6 py-8 shadow-xl shadow-gray-100 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">

                        <div className="max-w-xl">
                            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80">
                                <FiMail className="h-4 w-4" />
                                Stay in the loop
                            </div>

                            <div className="text-2xl font-bold text-white sm:text-3xl">
                                Get offers straight to your inbox.
                            </div>

                            <p className="mt-2 text-sm leading-6 text-white/75">
                                Be the first to know about new products,
                                exclusive offers and special deals.
                            </p>
                        </div>

                        <div className="w-full max-w-md">
                            <div className="flex rounded-full bg-white p-1.5 shadow-lg">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                />

                                <button
                                    type="button"
                                    className="flex shrink-0 items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Subscribe
                                    <FiArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <p className="mt-2 px-4 text-[11px] text-white/60">
                                No spam. Just products, offers and updates.
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            {/* Main Footer */}
            <div className="container py-12">

                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

                    {/* Brand */}
                    <div>

                        {siteInfo?.logo && (
                            <Link href="/" className="inline-block">
                                <Image
                                    src={siteInfo.logo}
                                    width={200}
                                    height={80}
                                    className="h-16 w-auto object-contain"
                                    alt={
                                        siteInfo?.name ||
                                        "Website"
                                    }
                                    title={
                                        siteInfo?.name ||
                                        "Website"
                                    }
                                />
                            </Link>
                        )}

                        <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500">
                            Discover quality products, great value and
                            a shopping experience designed to make
                            every order simple and enjoyable.
                        </p>

                        {/* Contact */}
                        <div className="mt-6 space-y-3">

                            {siteInfo?.primaryEmail && (
                                <a
                                    href={`mailto:${siteInfo.primaryEmail}`}
                                    className="flex items-center gap-3 text-sm text-gray-500 transition hover:text-red-500"
                                >
                                    <FiMail className="h-4 w-4 shrink-0" />
                                    {siteInfo.primaryEmail}
                                </a>
                            )}

                            {siteInfo?.phone && (
                                <a
                                    href={`tel:${siteInfo.phone}`}
                                    className="flex items-center gap-3 text-sm text-gray-500 transition hover:text-red-500"
                                >
                                    <FiPhone className="h-4 w-4 shrink-0" />
                                    {siteInfo.phone}
                                </a>
                            )}

                        </div>

                    </div>

                    {/* Shop */}
                    <div>
                        <div className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-900">
                            Shop
                        </div>

                        <ul className="space-y-3">
                            {shopLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-red-500"
                                    >
                                        <FiChevronRight className="h-3.5 w-3.5 opacity-25 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer */}
                    <div>
                        <div className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-900">
                            Customer
                        </div>

                        <ul className="space-y-3">
                            {customerLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-red-500"
                                    >
                                        <FiChevronRight className="h-3.5 w-3.5 opacity-25 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <div className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-900">
                            Help & Support
                        </div>

                        <ul className="space-y-3">
                            {helpLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-red-500"
                                    >
                                        <FiChevronRight className="h-3.5 w-3.5 opacity-25 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Trust Strip */}
                <div className="mt-14 grid overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 sm:grid-cols-3">

                    <div className="flex items-center gap-4 border-b border-gray-100 p-5 sm:border-b-0 sm:border-r">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
                            <FiTruck className="h-5 w-5" />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Fast Delivery
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                Quick & reliable shipping
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-b border-gray-100 p-5 sm:border-b-0 sm:border-r">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-500 shadow-sm">
                            <FiShield className="h-5 w-5" />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Secure Checkout
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                Safe & protected payments
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-purple-500 shadow-sm">
                            <FiMapPin className="h-5 w-5" />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Delivered To You
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                Reliable doorstep delivery
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-100">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-gray-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

                    <p>
                        © 2026{" "}
                        <span className="font-medium text-gray-600">
                            {siteInfo?.name || "Kamvasna"}
                        </span>
                        . All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/privacy-policy"
                            className="transition hover:text-gray-900"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-gray-900"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/contact"
                            className="transition hover:text-gray-900"
                        >
                            Contact
                        </Link>

                        <span className="hidden text-gray-300 sm:inline">
                            |
                        </span>

                        <span>
                            Powered by{" "}
                            <span className="font-medium text-gray-600">
                                Instavyapar
                            </span>
                        </span>
                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;