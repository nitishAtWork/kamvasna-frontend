"use client"
import React from 'react'
import { FaCartPlus, FaRegEye } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from "@/app/context/CartContext";

const ProductCardSmall = ({ product }) => {
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
        <div className="py-4 block group overflow-hidden rounded-lg">
            <div className="w-full relative overflow-hidden">
                <Link href={`/products/${product?.slug}`} title={product?.name} className="w-full relative">
                    <Image src={product?.img} height={200} width={200} className="w-full h-auto max-w-50 rounded-lg max-h-[130px] object-cover" title={product?.name} alt={product?.name} />

                    {discountPercentage >
                        0 && (
                            <span className="absolute left-1.5 top-1.5 bg-black px-1 py-0.5 text-[8px] text-white">
                                -
                                {
                                    discountPercentage
                                }
                                %
                            </span>
                        )}
                </Link>
                {/* cart */}
                <div className="absolute bottom-0 left-0 w-full flex justify-evenly p-2 bg-white/90 transition-all duration-300 group-hover:translate-y-0 translate-y-[100%]">
                    <Link href={`/products/${product?.slug}`} title={"View"}><FaRegEye className='hover:text-red-600 transition-all duration-300' /></Link>
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={
                            isAdding ||
                            product.stock <= 0
                        }
                    >
                        <FaCartPlus className='hover:text-red-600 transition-all duration-300' />
                    </button>

                </div>
            </div>
            <Link href={`/products/${product?.slug}`} title={product?.name} className="line-clamp-2 text-sm mt-1.5 group-hover:text-red-600 transition-all duration-300 "  >{product?.name}</Link>
        </div>
    )
}

export default ProductCardSmall