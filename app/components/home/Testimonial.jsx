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
    ];
    return (
        <>
            <div className="py-10 md:py-15 relative overflow-hidden bg-gray-200 px-5">
                <div className="container">
                    <div className="text-center mb-7">
                        <span className="block text-3xl font-semibold flex justify-center gap-3"><IoHappyOutline className="text-4xl" /> <span className="text-[var(--color-2)]">2,59,000+</span>
                            Happy customer</span>
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
                                <SwiperSlide key={index} className="h-auto my-5 mb-12">
                                    <TestimonialCard value={value} />
                                </SwiperSlide>
                            ))}

                        </Swiper>
                        {/* LEFT ARROW */}
                        <div className="flex gap-2.5 items-center lg:justify-start justify-center mt-3">
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
