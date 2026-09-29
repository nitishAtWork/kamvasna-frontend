"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheck,
  FiShoppingCart,
} from "react-icons/fi";
import { useState } from "react";

import { useCart } from "@/app/context/CartContext";
import ProductQuantity from "./ProductQuantity";
import { getImageUrl } from "@/app/lib/imageUrl";
import ProductImages from "./ProductImages";

export default function ProductDetails({
  product,
}) {
  const [quantity, setQuantity] =
    useState(1);

  const {
    addToCart,
    updatingProductId,
  } = useCart();

  const isAdding =
    updatingProductId === product._id;

  const hasDiscount =
    product.compareAtPrice &&
    product.compareAtPrice >
    product.price;

  const discountPercentage =
    hasDiscount
      ? Math.round(
        ((product.compareAtPrice -
          product.price) /
          product.compareAtPrice) *
        100
      )
      : 0;

  const isOutOfStock =
    !product.stock ||
    product.stock <= 0;

  const handleDecrease =
    () => {
      setQuantity((current) =>
        Math.max(
          1,
          current - 1
        )
      );
    };

  const handleIncrease =
    () => {
      setQuantity((current) =>
        Math.min(
          product.stock,
          current + 1
        )
      );
    };

  const handleAddToCart =
    async () => {
      try {
        await addToCart(
          product._id,
          quantity
        );
      } catch (error) {
        console.error(
          "Failed to add product:",
          error
        );
      }
    };

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      {/* Back */}
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
      >
        <FiArrowLeft size={16} />
        Back to Products
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Product image */}
        <div className="relative">
          {/* {product.img ? (
            <Image
              src={getImageUrl(
                product.img
              )}
              alt={
                product.name
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )} */}

          <ProductImages product={product} />

          {discountPercentage >
            0 && (
              <span className="absolute left-4 top-4 rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white">
                Save{" "}
                {
                  discountPercentage
                }
                %
              </span>
            )}
        </div>

        {/* Product information */}
        <div className="flex flex-col">
          {product.brand && (
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              {product.brand}
            </p>
          )}

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </span>

            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹
                  {product.compareAtPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                  {
                    discountPercentage
                  }
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-5">
            {isOutOfStock ? (
              <span className="text-sm font-medium text-red-600">
                Out of stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-green-600">
                <FiCheck
                  size={
                    16
                  }
                />
                In stock
                {product.stock <=
                  5 && (
                    <span className="text-gray-500">
                      — only{" "}
                      {
                        product.stock
                      }{" "}
                      left
                    </span>
                  )}
              </span>
            )}
          </div>

          {/* Description */}
          {product.shortDescription && (
            <p className="mt-6 text-base leading-7 text-gray-600">
              {
                product.shortDescription
              }
            </p>
          )}

          {product.description && (
            <div className="mt-4 text-sm leading-6 text-gray-600">
              {product.description}
            </div>
          )}

          {/* Divider */}
          <div className="my-7 border-t border-gray-200" />

          {/* Quantity */}
          {!isOutOfStock && (
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900">
                Quantity
              </p>

              <ProductQuantity
                quantity={
                  quantity
                }
                onDecrease={
                  handleDecrease
                }
                onIncrease={
                  handleIncrease
                }
                max={
                  product.stock
                }
                disabled={
                  isOutOfStock ||
                  isAdding
                }
              />
            </div>
          )}

          {/* Add to cart */}
          <button
            type="button"
            onClick={
              handleAddToCart
            }
            disabled={
              isOutOfStock ||
              isAdding
            }
            className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-black px-6 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <FiShoppingCart
              size={19}
            />
            {isOutOfStock
              ? "Out of Stock"
              : isAdding
                ? "Adding..."
                : `Add ${quantity} ${quantity === 1
                  ? "Item"
                  : "Items"
                } to Cart`}
          </button>

          {/* SKU */}
          {product.sku && (
            <p className="mt-4 text-xs text-gray-400">
              SKU:{" "}
              {product.sku}
            </p>
          )}
        </div>
      </div>

      {/* Specifications */}
      {product.specifications &&
        Object.keys(
          product.specifications
        ).length > 0 && (
          <section className="mt-14 border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900">
              Specifications
            </h2>

            <div className="mt-5 overflow-hidden rounded-xl border border-gray-200">
              {Object.entries(
                product.specifications
              ).map(
                (
                  [
                    key,
                    value,
                  ],
                  index
                ) => (
                  <div
                    key={
                      key
                    }
                    className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-3 ${index %
                      2 ===
                      0
                      ? "bg-gray-50"
                      : "bg-white"
                      }`}
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {
                        key
                      }
                    </span>

                    <span className="text-sm text-gray-900 sm:col-span-2">
                      {String(
                        value
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
          </section>
        )}
    </main>
  );
}