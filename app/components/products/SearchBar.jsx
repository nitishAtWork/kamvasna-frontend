"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    FiArrowUpRight,
    FiSearch,
    FiX,
} from "react-icons/fi";

export default function SearchBar({
    products = [],
    mobile = false,
    onSearch,
}) {
    const router = useRouter();
    const wrapperRef = useRef(null);

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const query = search.trim().toLowerCase();

    const filteredProducts =
        query.length > 0
            ? products
                  .filter((product) => {
                      const name =
                          product?.name?.toLowerCase() || "";

                      const brand =
                          product?.brand?.toLowerCase() || "";

                      const shortDescription =
                          product?.shortDescription?.toLowerCase() ||
                          "";

                      return (
                          name.includes(query) ||
                          brand.includes(query) ||
                          shortDescription.includes(query)
                      );
                  })
                  .slice(0, 6)
            : [];

    /*
     * Close suggestions when clicking outside.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(
                    event.target
                )
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /*
     * Search submit.
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        const value = search.trim();

        if (!value) {
            return;
        }

        setOpen(false);

        if (onSearch) {
            onSearch(value);
            return;
        }

        router.push(
            `/products?search=${encodeURIComponent(
                value
            )}`
        );
    };

    /*
     * Product click.
     */
    const handleProductClick = (product) => {
        setOpen(false);
        setSearch("");

        if (product?.slug) {
            router.push(
                `/products/${product.slug}`
            );
            return;
        }

        router.push("/products");
    };

    /*
     * Clear search.
     */
    const handleClear = () => {
        setSearch("");
        setOpen(false);
    };

    return (
        <div
            ref={wrapperRef}
            className={`relative ${
                mobile
                    ? "w-full"
                    : "w-full max-w-[320px]"
            }`}
        >
            <form onSubmit={handleSubmit}>
                <div className="group relative">
                    <FiSearch
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/50 transition group-focus-within:text-white/80"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => {
                            setSearch(
                                event.target.value
                            );
                            setOpen(true);
                        }}
                        onFocus={() => {
                            if (search.trim()) {
                                setOpen(true);
                            }
                        }}
                        placeholder="Search products..."
                        autoComplete="off"
                        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.055] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] focus:border-white/25 focus:bg-white/[0.08] focus:ring-4 focus:ring-white/[0.03]"
                    />

                    {search ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
                            aria-label="Clear search"
                        >
                            <FiX size={15} />
                        </button>
                    ) : null}

                    {/* <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-white/25 xl:block">
                        Enter
                    </kbd> */}
                </div>
            </form>

            {/* Search suggestions */}
            {open && query && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
                    {filteredProducts.length > 0 ? (
                        <>
                            <div className="border-b border-white/10 px-4 py-3">
                                <p className="text-xs font-medium uppercase tracking-wider text-white/35">
                                    Products
                                </p>
                            </div>

                            <div className="max-h-[380px] overflow-y-auto p-2">
                                {filteredProducts.map(
                                    (product) => (
                                        <button
                                            key={
                                                product._id ||
                                                product.id ||
                                                product.slug
                                            }
                                            type="button"
                                            onClick={() =>
                                                handleProductClick(
                                                    product
                                                )
                                            }
                                            className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.07]"
                                        >
                                            {/* Product image */}
                                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                                                {product.img ? (
                                                    <Image
                                                        src={
                                                            product.img
                                                        }
                                                        width={
                                                            48
                                                        }
                                                        height={
                                                            48
                                                        }
                                                        alt={
                                                            product.name ||
                                                            "Product"
                                                        }
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <FiSearch
                                                            size={
                                                                16
                                                            }
                                                            className="text-white/20"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product info */}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-white/85 transition group-hover:text-white">
                                                    {
                                                        product.name
                                                    }
                                                </p>

                                                {product.brand && (
                                                    <p className="mt-1 truncate text-xs text-white/35">
                                                        {
                                                            product.brand
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <FiArrowUpRight
                                                size={15}
                                                className="shrink-0 text-white/20 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-white/70 group-hover:opacity-100"
                                            />
                                        </button>
                                    )
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="px-5 py-8 text-center">
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05]">
                                <FiSearch
                                    size={17}
                                    className="text-white/30"
                                />
                            </div>

                            <p className="text-sm text-white/50">
                                No products found
                            </p>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="mt-3 text-xs font-medium text-white/70 underline underline-offset-4 transition hover:text-white"
                            >
                                Search all products
                            </button>
                        </div>
                    )}

                    {filteredProducts.length > 0 && (
                        <div className="border-t border-white/10 p-2">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                            >
                                Search for "{search}"

                                <FiArrowUpRight
                                    size={15}
                                />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}