import React from 'react'
import { FaStar, FaQuoteRight } from 'react-icons/fa'
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ value }) => {
    return (
        <div className="group relative h-full rounded-4xl bg-white p-8 py-13 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="absolute right-10 top-[99%] w-[60px] h-[50px] [clip-path:polygon(100%_0,0%_100%,0_0)] bg-white shadow-xl"></div>
            <FaQuoteLeft className="text-5xl absolute -top-3 left-12 opacity-20" />
            {/* Star Rating */}
            <div className="mb-4 flex justify-center gap-1 text-lg text-yellow-400">
                {Array.from({ length: value.rating }, (_, star) => (
                    <span className="text-2xl" key={star}>★</span>
                ))}
            </div>

            {/* Testimonial */}
            <p className="mb-6 leading-7 text-gray-600 italic">
                {value.message}
            </p>

            {/* Name */}
            <span className="block text-xl font-medium text-[var(--color-2)]">
                {value.name}
            </span>

            {/* Role */}
            <span className="mt-2 block text-sm text-gray-400">
                {value.role}
            </span>
        </div>
    )
}

export default TestimonialCard