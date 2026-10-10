"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import ProductCardSmall from "./ProductCardSmall";
import ProductCardSkeleton from "@/app/components/products/ProductCardSkeleton";

import { productApi } from "@/app/lib/product";
import SmallPdSkeleton from "./SmallPdSkeleton";

const RelatedProduct = () => {

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

    const swiperBreakpoints = {
        0: { slidesPerView: 2 },
        320: { slidesPerView: 3 },
        675: { slidesPerView: 6 },
        991: { slidesPerView: 8 },
        1224: { slidesPerView: 9 },
    };

    return (
        <div className="py-6 relative bg-cover bg-cente bg-[#f2f3f8]">
            <div className="container">
                <div className="bg-white px-4 rounded-xl">

                    <div>
                        {/* Error */}
                        {error && (
                            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {

                            loading ? (
                                <Swiper
                                    spaceBetween={16}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    navigation={
                                        {
                                            nextEl: ".custom-next",
                                            prevEl: ".custom-prev",
                                        }
                                    }
                                    modules={[Autoplay, FreeMode, Navigation, Pagination]}
                                    className=""
                                    breakpoints={swiperBreakpoints}
                                >
                                    {Array.from({
                                        length: 12,
                                    }).map(
                                        (_, index) => (
                                            <SwiperSlide key={index}>
                                                <SmallPdSkeleton />
                                            </SwiperSlide>
                                        )
                                    )}
                                </Swiper>
                            ) :
                                products?.length > 0 ?
                                    <Swiper
                                        spaceBetween={16}
                                        slidesPerView={1}
                                        loop={products.length > 3}
                                        autoplay={
                                            products.length > 3
                                                ? {
                                                    delay: 5000,
                                                    disableOnInteraction: false,
                                                }
                                                : false
                                        }
                                        navigation={
                                            {
                                                nextEl: ".custom-next",
                                                prevEl: ".custom-prev",
                                            }
                                        }
                                        modules={[Autoplay, FreeMode, Navigation, Pagination]}
                                        breakpoints={swiperBreakpoints}
                                    >
                                        {products?.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <ProductCardSmall product={product} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    : null
                        }

                    </div>
                </div>
            </div>
        </div >
    );
};

export default RelatedProduct;