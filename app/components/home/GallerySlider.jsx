"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { GoArrowRight } from "react-icons/go";
import { Parser } from "html-to-react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const GallerySlider = () => {

    const gallery = [
        {
            name: "For Him",
            img: "/img/background.jpg",
        },
        {
            name: "For Her",
            img: "/img/bg.jpg",
        },
        {
            name: "For Couple",
            img: "/img/bg-2.jpg",
        },
        {
            name: "For BDSM",
            img: "/img/bg-4.jpg",
        },
        {
            name: "New Arrivals",
            img: "/img/bg-img.jpg",
        },
    ]

    return (
        <section className="pb-18 relative">

            <div className="container">

                {gallery?.length > 0 && (
                    <div className="relative">
                        <Swiper
                            spaceBetween={16}
                            slidesPerView={1}
                            loop={true}
                            speed={900}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                320: { slidesPerView: 2 },
                                675: { slidesPerView: 2 },
                                991: { slidesPerView: 3 },
                                1224: { slidesPerView: 4 },
                            }}
                            navigation={{
                                nextEl: ".service-next",
                                prevEl: ".service-prev",
                            }}
                            modules={[Autoplay, Navigation]}
                        >
                            {gallery?.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <Link href={'/products'} title={product?.name} className="relative rounded-lg block overflow-hidden">
                                        <Image
                                            width={600}
                                            height={600}
                                            src={product?.img}
                                            alt={product?.name || "Service"}
                                            title={product?.name || "Service"}
                                            className=" h-full grayscale-75 hover:grayscale-0 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-70"
                                        />
                                        <span className="absolute left-0 bottom-0 block px-6 py-2 bg-gray-50/70 rounded-tr-lg">{product?.name}</span>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* LEFT ARROW */}
                        <button
                            type="button"
                            className=" service-prev absolute left-0 top-[48%] z-30 hidden h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-1)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:bg-[var(--color-1)] hover:text-white md:flex "
                        >
                            <GoArrowRight className="rotate-180 text-[20px]" />
                        </button>

                        {/* RIGHT ARROW */}
                        <button
                            type="button"
                            className=" service-next absolute right-0 top-[48%] z-30 hidden h-[44px] w-[44px] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-1)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:bg-[var(--color-1)] hover:text-white md:flex "
                        >
                            <GoArrowRight className="text-[20px]" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GallerySlider;