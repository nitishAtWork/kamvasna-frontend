"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
// import TestimonialCard from "../cards/TestimonialCard";
import { GoArrowRight } from "react-icons/go";
import { IoHappyOutline } from "react-icons/io5";
import TestimonialCard from "./TestimonialCard";


export default function Testimonial() {
    const testimonials = [
        {
            name: "Varun Sanini",
            role: "Happy Customer",
            rating: 5,
            message:
                "Excellent service and a great experience. The team was professional, helpful, and delivered exactly what we needed."
        },
        {
            name: "Rahul Sharma",
            role: "Happy Customer",
            rating: 5,
            message:
                "Excellent service and a great experience. The team was professional, helpful, and delivered exactly what we needed."
        },
        {
            name: "Priya Patel",
            role: "Happy Customer",
            rating: 5,
            message:
                "Very satisfied with the quality and support. I would definitely recommend their services to others."
        },
        {
            name: "Rahul Sharma",
            role: "Happy Customer",
            rating: 5,
            message:
                "Excellent service and a great experience. The team was professional, helpful, and delivered exactly what we needed."
        },
        {
            name: "Priya Patel",
            role: "Happy Customer",
            rating: 5,
            message:
                "Very satisfied with the quality and support. I would definitely recommend their services to others."
        },
    ];
    return (
        <>
            <div className="py-10 md:py-15 relative overflow-hidden bg-gray-100">
                <div className="container">
                    <div className="grid grid-cols-2 items-center mb-10">
                        <div className="flex items-center gap-4">
                            <span className="text-6xl font-bold text-[#e0b000] block whitespace-nowrap">4.9 /5</span>
                            <div>
                                <div className=" flex gap-1 text-lg text-yellow-400">
                                    {Array.from({ length: 5 }, (_, star) => (
                                        <span className="text-2xl" key={star}>★</span>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm">
                                    <span className="underline font-medium">Stylebee</span> has already collected <strong>1233</strong> + reviews</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <span className="text-[16px] font-medium underline">Add Your Review</span>
                        </div>
                    </div>
                    <div className="reveal reveal-delay-1 is-revealed">
                        <Swiper
                            modules={[EffectFade, Autoplay, Navigation]}
                            spaceBetween={30}
                            autoplay={{ delay: 3500, disableOnInteraction: false, }}
                            speed={1000}
                            // fadeEffect={{ crossFade: true }}
                            slidesPerView={1}
                            navigation={{
                                nextEl: ".testi-next",
                                prevEl: ".testi-prev",
                            }}
                            loop={true}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {testimonials.map((value, index) => (
                                <SwiperSlide key={index} className=" my-5 ">
                                    <TestimonialCard value={value} />
                                </SwiperSlide>
                            ))}

                        </Swiper>
                        {/* LEFT ARROW */}
                        <div className="flex gap-2.5 items-center justify-center mt-3">
                            <button
                                type="button"
                                className="testi-prev h-[54px] w-[54px] flex items-center justify-center rounded-full bg-white text-[#20258f] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:bg-[var(--color-2)] hover:text-white md:flex "
                            >
                                <GoArrowRight className="rotate-180 text-[22px]" />
                            </button>

                            {/* RIGHT ARROW */}
                            <button
                                type="button"
                                className="testi-next h-[54px] w-[54px] flex items-center justify-center rounded-full bg-white text-[#20258f] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:bg-[var(--color-2)] hover:text-white md:flex "
                            >
                                <GoArrowRight className="text-[22px]" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
