"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, FreeMode, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import Image from "next/image";
import Link from "next/link";
import ProductCardSmall from "../products/ProductCardSmall";

const HeroSection = ({ product }) => {

    return (
        <div className="py-2 relative bg-cover bg-cente bg-[#f2f3f8]">
            <div className="container">
                <div className="bg-white px-4 mt-4 rounded-xl">
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            {/* Left Image */}
                            <Link href="/products" className="hidden lg:block lg:col-span-2">
                                <Image
                                    className="w-full h-auto my-4 rounded-lg"
                                    src="/img/leftimage.webp"
                                    width={500}
                                    height={500}
                                    loading="eager"
                                    alt="Realistic Design Dildo"
                                    title="Realistic Design Dildo"
                                />
                            </Link>

                            {/* Main Banner */}
                            <Link href="/products" className="col-span-1 lg:col-span-8">
                                <Image
                                    className="w-full h-auto my-4 rounded-lg"
                                    src="/img/banner-2.png"
                                    width={1000}
                                    height={500}
                                    loading="eager"
                                    alt="Banner"
                                    title="Banner"
                                />
                            </Link>

                            {/* Right Images */}
                            <Link
                                href="/products"
                                className="col-span-1 lg:col-span-2 flex flex-row lg:flex-col gap-4"
                            >
                                <Image
                                    className="w-[calc(50%-8px)] lg:w-full h-auto rounded-lg lg:mt-4"
                                    src="/img/img1.webp"
                                    width={500}
                                    height={500}
                                    loading="eager"
                                    alt="Banner"
                                    title="Banner"
                                />

                                <Image
                                    className="w-[calc(50%-8px)] lg:w-full h-auto rounded-lg"
                                    src="/img/banner-sm1.png"
                                    width={500}
                                    height={500}
                                    loading="eager"
                                    alt="Banner"
                                    title="Banner"
                                />
                            </Link>
                        </div>
                    </div>

                    <div>
                        {
                            product?.length > 0 ?
                                <Swiper
                                    spaceBetween={16}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    // pagination={{
                                    //     clickable: true,
                                    //     renderBullet: (index, className) => {
                                    //         return `<span class="${className} custom-bullet"></span>`;
                                    //     },
                                    // }}
                                    navigation={
                                        {
                                            nextEl: ".custom-next",
                                            prevEl: ".custom-prev",
                                        }
                                    }
                                    modules={[Autoplay, FreeMode, Navigation, Pagination]}
                                    className=""
                                    breakpoints={{
                                        0: { slidesPerView: 2 },
                                        320: { slidesPerView: 3 },
                                        675: { slidesPerView: 6 },
                                        991: { slidesPerView: 8 },
                                        1224: { slidesPerView: 9 },
                                    }}
                                >
                                    {product?.map((product, index) => (
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

export default HeroSection;