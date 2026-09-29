"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

import { useCart } from "@/app/context/CartContext";

export default function ProductCard({
  product,
}) {
  const {
    addToCart,
    updatingProductId,
  } = useCart();

  const isAdding =
    updatingProductId === product._id;

  const handleAddToCart = async () => {
    try {
      await addToCart(
        product._id,
        1
      );
    } catch (error) {
      console.error(
        "Add to cart failed:",
        error
      );
    }
  };

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

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.img ? (
            <Image
              src={product.img}
              alt={
                product.name
              }
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No Image
            </div>
          )}

          {discountPercentage >
            0 && (
              <span className="absolute left-3 top-3 rounded-md bg-black px-2 py-1 text-xs font-semibold text-white">
                -
                {
                  discountPercentage
                }
                %
              </span>
            )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {product.brand && (
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {product.brand}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
        >
          <p className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-gray-900 transition hover:text-gray-600">
            {product.name}
          </p>
        </Link>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">
            ₹
            {product.price.toLocaleString(
              "en-IN"
            )}
          </span>

          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ₹
              {product.compareAtPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={
            isAdding ||
            product.stock <= 0
          }
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-black px-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FiShoppingCart size={17} />

          {product.stock <= 0
            ? "Out of Stock"
            : isAdding
              ? "Adding..."
              : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}