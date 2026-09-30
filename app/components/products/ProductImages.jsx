"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ product }) {
  const images = [];

  if (product?.img) {
    images.push(product.img);
  }

  if (Array.isArray(product?.images)) {
    product.images.forEach((image) => {
      if (image && !images.includes(image)) {
        images.push(image);
      }
    });
  }

  const [selectedImage, setSelectedImage] = useState(
    images[0] || null
  );

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-100 text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={selectedImage}
          alt={product?.name || "Product image"}
          fill
          priority
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                selectedImage === image
                  ? "border-black"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt={`${product?.name || "Product"} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}