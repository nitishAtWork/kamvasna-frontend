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
            <div className="container bg-white mt-4 rounded-xl">
                <div>
                    <div className="grid lg:grid-cols-12 gap-4">
                        <Link href={'/products'} className="lg:col-span-2">
                            <Image className="w-full h-auto my-4 rounded-lg" src={'/img/17.jpg'} width={500} height={500} alt="Banner" title="Banner" />
                        </Link>
                        <Link href={'/products'} className="lg:col-span-8">
                            <Image className="w-full h-auto my-4 rounded-lg" src={'/img/18.jpg'} width={1000} height={500} alt="Banner" title="Banner" />
                        </Link>
                        <Link href={'/products'} className="lg:col-span-2">
                            <Image className="w-full h-auto mt-4 rounded-lg" src={'/img/19.jpg'} width={500} height={500} alt="Banner" title="Banner" />
                            <Image className="w-full h-auto my-4 rounded-lg" src={'/img/20.jpg'} width={500} height={500} alt="Banner" title="Banner" />
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
                                        {/* <div className="py-4 block">
                                        <div className="w-full relative">
                                            <Link href={`/products/${product?.slug}`} title={product?.name} className="w-full">
                                                <Image src={product?.img} height={200} width={200} className="w-full h-auto max-w-50 max-h-[130px] object-cover" title={product?.name} alt={product?.name} />
                                            </Link>
                                            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-2.5 p-2 bg-white">
                                                <FaRegEye />
                                                <FaCartPlus />
                                            </div>
                                        </div>
                                        <Link href={`/products/${product?.slug}`} title={product?.name} className="line-clamp-2 text-sm mt-1.5"  >{product?.name}</Link>
                                    </div> */}
                                        <ProductCardSmall product={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            : null
                    }

                </div>
            </div>
        </div >
    );
};

export default HeroSection;