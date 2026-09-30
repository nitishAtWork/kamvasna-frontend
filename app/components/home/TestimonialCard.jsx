import React from 'react'
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { MdOutlineWatchLater } from "react-icons/md";

const TestimonialCard = ({ value }) => {
    return (
        <div className="group relative h-full rounded-2xl bg-white p-8  shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            <FaQuoteRight className="text-5xl absolute bottom-7 right-7 opacity-10" />
            <div className="flex items-center justify-between mb-3">
                {/* Star Rating */}
                <div className=" flex  gap-1 text-lg text-yellow-400">
                    {Array.from({ length: value.rating }, (_, star) => (
                        <span className="text-2xl" key={star}>★</span>
                    ))}
                </div>
                <div className='flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
                    <MdOutlineWatchLater />
                    <span>1 week ago</span>
                </div>
            </div>
            {/* Testimonial */}
            <p className="mb-6 leading-7 text-gray-600 italic">
                {value.message}
            </p>
            <div className='flex items-center gap-4 relative'>
                <div class="w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-[#4e5c9f] text-white flex items-center justify-center md:text-2xl text-lg font-semibold">J</div>
                <div>
                    {/* Name */}
                    <span className="block text-[16px] font-semibold ">
                        {value.name}
                    </span>
                    {/* Role */}
                    <span className="mt-1 block text-sm text-gray-600">
                        {value.role}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard