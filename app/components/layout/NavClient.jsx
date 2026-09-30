// app/components/layout/Navbar.jsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FiShoppingCart,
    FiUser,
    FiMenu,
    FiX,
    FiChevronDown,
    FiSearch,
    FiArrowUpRight,
    FiGift,
    FiTruck,
    FiZap,
    FiArrowRight,
} from "react-icons/fi";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

export default function NavClient({ siteInfo, product = [] }) {

    const [offerIndex, setOfferIndex] = useState(0);

    const offers = [
        {
            icon: FiTruck,
            text: "FREE SHIPPING ON ORDERS ABOVE ₹999",
            action: "SHOP NOW",
            href: "/products",
        },
        {
            icon: FiZap,
            text: "NEW ARRIVALS ARE HERE",
            action: "EXPLORE",
            href: "/products",
        },
        {
            icon: FiGift,
            text: "SPECIAL OFFERS AVAILABLE NOW",
            action: "DISCOVER",
            href: "/products",
        },
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setOfferIndex((current) => (current + 1) % offers.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileProductOpen, setMobileProductOpen] = useState(false);
    const [search, setSearch] = useState("");

    const { totals } = useCart();
    const { user, logout } = useAuth();

    const itemCount = totals?.itemCount || 0;

    const filteredProducts = product.filter((prod) =>
        prod?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setMobileProductOpen(false);
        setSearch("");
    };

    return (

        <header className="sticky top-0 z-50 text-white">

            {/* ================================================= */}
            {/* TOP OFFER BAR */}
            {/* ================================================= */}

            <div className="relative overflow-hidden border-b border-white/10 bg-[#151515]">

                <div className="mx-auto flex h-9 container items-center justify-center">

                    <div
                        key={offerIndex}
                        className="flex animate-[fadeIn_0.5s_ease-in-out] items-center gap-2 text-[11px] font-medium tracking-wide sm:text-xs"
                    >

                        {(() => {
                            const Icon = offers[offerIndex].icon;

                            return (
                                <>
                                    <Icon
                                        size={13}
                                        className="text-white/70"
                                    />

                                    <span className="text-white/65">
                                        {offers[offerIndex].text}
                                    </span>

                                    <span className="hidden text-white/20 sm:block">
                                        •
                                    </span>

                                    <Link
                                        href={offers[offerIndex].href}
                                        className="group flex items-center gap-1 font-semibold text-white transition"
                                    >
                                        {offers[offerIndex].action}

                                        <FiArrowRight
                                            size={12}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </>
                            );
                        })()}

                    </div>

                </div>

                {/* Small decorative glow */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 bg-white/[0.03] blur-2xl" />

            </div>


            {/* ================================================= */}
            {/* MAIN NAVBAR */}
            {/* ================================================= */}

            <div className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">


                <div className="flex h-[76px] container items-center gap-6">

                    {/* ================================================= */}
                    {/* LOGO */}
                    {/* ================================================= */}

                    <Link
                        href="/"
                        className="group shrink-0"
                    >
                        <Image
                            src={siteInfo?.logo}
                            width={200}
                            height={80}
                            className="max-h-14 w-auto object-contain transition duration-300 group-hover:opacity-80"
                            alt={siteInfo?.name || "Website"}
                            title={siteInfo?.name || "Website"}
                        />
                    </Link>


                    {/* ================================================= */}
                    {/* DESKTOP NAVIGATION */}
                    {/* ================================================= */}

                    <nav className="hidden items-center gap-7 md:flex">

                        {/* Home */}
                        <Link
                            href="/"
                            className="relative py-7 text-sm font-medium text-white/65 transition hover:text-white"
                        >
                            Home

                            <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 hover:w-full" />
                        </Link>


                        {/* ================================================= */}
                        {/* PRODUCTS - HOVER DROPDOWN */}
                        {/* ================================================= */}

                        <div className="group relative">

                            {/* Products button */}
                            <Link
                                href="/products"
                                className="flex items-center gap-1.5 py-7 text-sm font-medium text-white/65 transition hover:text-white"
                            >
                                Products

                                <FiChevronDown
                                    size={14}
                                    className="transition-transform duration-300 group-hover:rotate-180"
                                />
                            </Link>


                            {/* ================================================= */}
                            {/* PRODUCT DROPDOWN */}
                            {/* ================================================= */}

                            <div className="pointer-events-none absolute left-1/2 top-full w-[420px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">

                                <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_25px_70px_rgba(0,0,0,0.6)]">

                                    {/* Dropdown top */}
                                    <div className="border-b border-white/10 px-5 py-4">

                                        <div className="flex items-center justify-between">

                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    Our Products
                                                </p>

                                                <p className="mt-0.5 text-xs text-white/40">
                                                    Explore our collection
                                                </p>
                                            </div>

                                            <Link
                                                href="/products"
                                                className="flex items-center gap-1 text-xs font-medium text-white/50 transition hover:text-white"
                                            >
                                                View all
                                                <FiArrowUpRight size={13} />
                                            </Link>

                                        </div>

                                    </div>


                                    {/* Product list */}
                                    <div className="max-h-[380px] overflow-y-auto p-2">

                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map((prod) => (

                                                <Link
                                                    key={
                                                        prod.id ||
                                                        prod._id ||
                                                        prod.slug
                                                    }
                                                    href={
                                                        prod.slug
                                                            ? `/products/${prod.slug}`
                                                            : "/products"
                                                    }
                                                    className="group/item flex items-center gap-3 rounded-xl p-3 transition duration-200 hover:bg-white/[0.07]"
                                                >

                                                    {/* Image */}
                                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">

                                                        {prod.img ? (
                                                            <Image
                                                                src={prod.img}
                                                                width={48}
                                                                height={48}
                                                                alt={
                                                                    prod.name ||
                                                                    "Product"
                                                                }
                                                                className="h-full w-full object-cover transition duration-300 group-hover/item:scale-110"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-[10px] text-white/30">
                                                                No Image
                                                            </div>
                                                        )}

                                                    </div>


                                                    {/* Product info */}
                                                    <div className="min-w-0 flex-1">

                                                        <p className="truncate text-sm font-medium text-white/80 transition group-hover/item:text-white">
                                                            {prod.name}
                                                        </p>

                                                        {prod.shortDescription && (
                                                            <p className="mt-1 truncate text-xs text-white/35">
                                                                {
                                                                    prod.shortDescription
                                                                }
                                                            </p>
                                                        )}

                                                    </div>


                                                    {/* Arrow */}
                                                    <FiArrowUpRight
                                                        size={15}
                                                        className="shrink-0 text-white/20 opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-white/70 group-hover/item:opacity-100"
                                                    />

                                                </Link>

                                            ))
                                        ) : (

                                            <div className="px-5 py-10 text-center">

                                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05]">
                                                    <FiSearch
                                                        size={17}
                                                        className="text-white/30"
                                                    />
                                                </div>

                                                <p className="text-sm text-white/50">
                                                    No products found
                                                </p>

                                            </div>

                                        )}

                                    </div>


                                    {/* Bottom CTA */}
                                    <div className="border-t border-white/10 p-3">

                                        <Link
                                            href="/products"
                                            className="group/all flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                                        >
                                            Browse All Products

                                            <FiArrowUpRight
                                                size={15}
                                                className="transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
                                            />
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* About */}
                        <Link
                            href="/about"
                            className="py-7 text-sm font-medium text-white/65 transition hover:text-white"
                        >
                            About
                        </Link>


                        {/* Contact */}
                        <Link
                            href="/contact"
                            className="py-7 text-sm font-medium text-white/65 transition hover:text-white"
                        >
                            Contact
                        </Link>

                    </nav>


                    {/* ================================================= */}
                    {/* NAVBAR SEARCH */}
                    {/* ================================================= */}

                    <div className="ml-auto hidden w-full max-w-[320px] lg:block">
                        <div className="group relative">

                            <FiSearch
                                size={17}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition group-focus-within:text-white/70"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.055] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] focus:border-white/25 focus:bg-white/[0.08] focus:ring-4 focus:ring-white/[0.03]"
                            />

                            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-white/25 xl:block">
                                ⌘ K
                            </kbd>

                        </div>
                    </div>


                    {/* ================================================= */}
                    {/* RIGHT ACTIONS */}
                    {/* ================================================= */}

                    <div className="flex shrink-0 items-center gap-1">

                        {/* Account */}
                        {user ? (

                            <div className="hidden items-center gap-3 md:flex">

                                <Link
                                    href="/account"
                                    className="flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                                >
                                    <FiUser size={18} />
                                    Account
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="text-sm text-white/35 transition hover:text-red-400"
                                >
                                    Logout
                                </button>

                            </div>

                        ) : (

                            <Link
                                href="/login"
                                className="hidden h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-white/65 transition hover:bg-white/[0.06] hover:text-white md:flex"
                            >
                                <FiUser size={18} />
                                Login
                            </Link>

                        )}


                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/65 transition hover:bg-white/[0.07] hover:text-white"
                            aria-label="Shopping cart"
                        >

                            <FiShoppingCart size={20} />

                            {itemCount > 0 && (
                                <span className="absolute right-0 top-0 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
                                    {itemCount > 99 ? "99+" : itemCount}
                                </span>
                            )}

                        </Link>


                        {/* Mobile menu */}
                        <button
                            type="button"
                            onClick={() =>
                                setMobileOpen((open) => !open)
                            }
                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition hover:bg-white/[0.07] hover:text-white md:hidden"
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? (
                                <FiX size={22} />
                            ) : (
                                <FiMenu size={22} />
                            )}
                        </button>

                    </div>

                </div>


                {/* ================================================= */}
                {/* MOBILE MENU */}
                {/* ================================================= */}

                {mobileOpen && (

                    <div className="border-t border-white/10 bg-[#0a0a0a] md:hidden">

                        <nav className="mx-auto max-w-7xl px-5 py-4">

                            {/* Mobile Search */}
                            <div className="relative mb-4">

                                <FiSearch
                                    size={17}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search products..."
                                    className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
                                />

                            </div>


                            <div className="flex flex-col">

                                <MobileLink
                                    href="/"
                                    label="Home"
                                    onClick={closeMobileMenu}
                                />


                                {/* Mobile Products */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setMobileProductOpen(
                                            (open) => !open
                                        )
                                    }
                                    className="flex items-center justify-between border-b border-white/10 px-1 py-4 text-left text-sm font-medium text-white/70"
                                >
                                    Products

                                    <FiChevronDown
                                        size={16}
                                        className={`transition-transform ${mobileProductOpen
                                            ? "rotate-180"
                                            : ""
                                            }`}
                                    />
                                </button>


                                {mobileProductOpen && (

                                    <div className="border-b border-white/10 py-2">

                                        {filteredProducts.length > 0 ? (

                                            filteredProducts.map((prod) => (

                                                <Link
                                                    key={
                                                        prod.id ||
                                                        prod._id ||
                                                        prod.slug
                                                    }
                                                    href={
                                                        prod.slug
                                                            ? `/products/${prod.slug}`
                                                            : "/products"
                                                    }
                                                    onClick={closeMobileMenu}
                                                    className="flex items-center gap-3 rounded-xl px-2 py-3 text-sm text-white/50 transition hover:bg-white/[0.05] hover:text-white"
                                                >

                                                    {prod.img ? (
                                                        <Image
                                                            src={prod.img}
                                                            width={38}
                                                            height={38}
                                                            alt={
                                                                prod.name ||
                                                                "Product"
                                                            }
                                                            className="h-9 w-9 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-9 w-9 rounded-lg bg-white/[0.06]" />
                                                    )}

                                                    <span className="truncate">
                                                        {prod.name}
                                                    </span>

                                                </Link>

                                            ))

                                        ) : (

                                            <p className="px-2 py-5 text-center text-sm text-white/30">
                                                No products found
                                            </p>

                                        )}

                                        <Link
                                            href="/products"
                                            onClick={closeMobileMenu}
                                            className="mt-2 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
                                        >
                                            View All Products
                                        </Link>

                                    </div>

                                )}


                                <MobileLink
                                    href="/about"
                                    label="About"
                                    onClick={closeMobileMenu}
                                />

                                <MobileLink
                                    href="/contact"
                                    label="Contact"
                                    onClick={closeMobileMenu}
                                />


                                <div className="my-2 border-t border-white/10" />


                                {user ? (
                                    <>
                                        <MobileLink
                                            href="/account"
                                            label="Account"
                                            onClick={closeMobileMenu}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                closeMobileMenu();
                                                handleLogout();
                                            }}
                                            className="px-1 py-4 text-left text-sm font-medium text-red-400"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <MobileLink
                                        href="/login"
                                        label="Login"
                                        onClick={closeMobileMenu}
                                    />
                                )}

                            </div>

                        </nav>

                    </div>

                )}

            </div>

        </header>
    );
}


function MobileLink({ href, label, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="border-b border-white/10 px-1 py-4 text-sm font-medium text-white/70 transition hover:text-white"
        >
            {label}
        </Link>
    );
}
