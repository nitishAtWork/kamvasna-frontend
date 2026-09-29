"use client";

import {
  useEffect,
  useState,
} from "react";

import ProductGrid from "@/app/components/products/ProductGrid";
import ProductCardSkeleton from "@/app/components/products/ProductCardSkeleton";

import { productApi } from "@/app/lib/product";

export default function ProductsPage() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await productApi.getProducts();

        const productList =
          response?.data?.products ||
          response?.products ||
          [];

        setProducts(
          Array.isArray(productList)
            ? productList
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setError(
          "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Products
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Browse our collection.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({
            length: 8,
          }).map(
            (_, index) => (
              <ProductCardSkeleton
                key={index}
              />
            )
          )}
        </div>
      ) : (
        <ProductGrid
          products={
            products
          }
        />
      )}
    </main>
  );
}