// app/components/layout/Navbar.jsx

"use client";

import Link from "next/link";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] =
        useState(false);

    const { totals } = useCart();

    const {
        user,
        logout,
    } = useAuth();

    const itemCount =
        totals?.itemCount || 0;

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-gray-900"
                >
                    YourStore
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-700 transition hover:text-black"
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        className="text-sm font-medium text-gray-700 transition hover:text-black"
                    >
                        Products
                    </Link>

                    <Link
                        href="/about"
                        className="text-sm font-medium text-gray-700 transition hover:text-black"
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm font-medium text-gray-700 transition hover:text-black"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Account */}
                    {user ? (
                        <div className="hidden items-center gap-3 md:flex">
                            <Link
                                href="/account"
                                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
                            >
                                <FiUser size={18} />
                                Account
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-sm text-gray-500 transition hover:text-red-500"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden items-center gap-2 text-sm font-medium text-gray-700 hover:text-black md:flex"
                        >
                            <FiUser size={18} />
                            Login
                        </Link>
                    )}

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 hover:text-black"
                        aria-label="Shopping cart"
                    >
                        <FiShoppingCart size={21} />

                        {itemCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                                {itemCount > 99
                                    ? "99+"
                                    : itemCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(
                                !mobileOpen
                            )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <FiX size={22} />
                        ) : (
                            <FiMenu size={22} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <nav className="mx-auto max-w-7xl px-5 py-4">
                        <div className="flex flex-col">
                            <MobileLink
                                href="/"
                                label="Home"
                                onClick={() =>
                                    setMobileOpen(
                                        false
                                    )
                                }
                            />

                            <MobileLink
                                href="/products"
                                label="Products"
                                onClick={() =>
                                    setMobileOpen(
                                        false
                                    )
                                }
                            />

                            <MobileLink
                                href="/about"
                                label="About"
                                onClick={() =>
                                    setMobileOpen(
                                        false
                                    )
                                }
                            />

                            <MobileLink
                                href="/contact"
                                label="Contact"
                                onClick={() =>
                                    setMobileOpen(
                                        false
                                    )
                                }
                            />

                            <div className="my-2 border-t border-gray-100" />

                            {user ? (
                                <>
                                    <MobileLink
                                        href="/account"
                                        label="Account"
                                        onClick={() =>
                                            setMobileOpen(
                                                false
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMobileOpen(
                                                false
                                            );
                                            handleLogout();
                                        }}
                                        className="px-1 py-3 text-left text-sm font-medium text-red-500"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <MobileLink
                                    href="/login"
                                    label="Login"
                                    onClick={() =>
                                        setMobileOpen(
                                            false
                                        )
                                    }
                                />
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

function MobileLink({
    href,
    label,
    onClick,
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="border-b border-gray-100 px-1 py-3 text-sm font-medium text-gray-700"
        >
            {label}
        </Link>
    );
}