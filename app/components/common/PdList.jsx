"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { productApi } from "@/app/lib/product";
import { keywordApi } from "@/app/lib/keyword";

export default function PdList({subdomain}) {
    const [products, setProducts] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const [productResponse, keywordResponse] =
                    await Promise.all([
                        productApi.getProducts(),
                        keywordApi.getKeywords(),
                    ]);

                const productList =
                    productResponse?.data?.products ??
                    productResponse?.products ??
                    [];

                const keywordList =
                    keywordResponse?.data?.keywords ??
                    keywordResponse?.data ??
                    keywordResponse?.keywords ??
                    [];

                if (!Array.isArray(productList)) {
                    throw new Error("Invalid products response.");
                }

                if (!Array.isArray(keywordList)) {
                    throw new Error("Invalid keywords response.");
                }

                if (isMounted) {
                    setProducts(productList);
                    setKeywords(keywordList);
                }
            } catch (err) {
                console.error("Failed to load sitemap data:", err);

                if (isMounted) {
                    setError("Unable to load sitemap. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    const linkClass =
        "flex min-h-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-red-700 to-black px-6 py-4 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-lg";

    return (
        <main className="container py-8 lg:py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">
                    {subdomain}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Browse our products and explore our collection.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="space-y-8">
                    {[1, 2].map((section) => (
                        <div key={section}>
                            <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-14 animate-pulse rounded-xl bg-gray-200"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : !error ? (
                <div className="space-y-10">

                    {/* Keywords */}
                    <section>
                        {/* <h2 className="mb-4 text-xl font-bold text-gray-900">
                            Keywords
                        </h2> */}

                        {keywords.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {keywords.map((keyword) => (
                                    <Link
                                        key={keyword._id || keyword.slug}
                                        href={`/${subdomain}/${keyword.slug}`}
                                        className={linkClass}
                                    >
                                        {keyword.name}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No keywords available.
                            </p>
                        )}
                    </section>

                </div>
            ) : null}
        </main>
    );
}
