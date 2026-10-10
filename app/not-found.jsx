"use client";

import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHome,
  FiSearch,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
  FiHeart,
} from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafaf8] px-4 py-16 sm:px-6">

      {/* Background blobs */}
      <div className="absolute left-[-120px] top-[-100px] h-80 w-80 animate-pulse rounded-full bg-red-200/40 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 animate-pulse rounded-full bg-pink-200/40 blur-3xl [animation-delay:1s]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-100/30 blur-3xl" />

      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">

        <div className="absolute left-[10%] top-[22%] flex h-14 w-14 animate-bounce items-center justify-center rounded-2xl bg-white text-red-400 shadow-xl [animation-duration:3s]">
          <FiShoppingBag className="h-6 w-6" />
        </div>

        <div className="absolute right-[12%] top-[18%] flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-white text-pink-400 shadow-xl [animation-delay:.8s] [animation-duration:4s]">
          <FiHeart className="h-5 w-5 fill-current" />
        </div>

        <div className="absolute bottom-[20%] left-[14%] flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-white text-purple-400 shadow-xl [animation-delay:1.2s] [animation-duration:3.5s]">
          <FiStar className="h-5 w-5 fill-current" />
        </div>

        <div className="absolute bottom-[18%] right-[13%] flex h-14 w-14 animate-bounce items-center justify-center rounded-2xl bg-white text-blue-400 shadow-xl [animation-delay:.5s] [animation-duration:4.5s]">
          <FiShoppingCart className="h-6 w-6" />
        </div>

      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl text-center">

        {/* 404 */}
        <div className="relative mx-auto mb-5 w-fit">

          <div className="select-none text-[130px] font-black leading-none tracking-[-0.08em] text-gray-900 sm:text-[190px] lg:text-[220px]">
            4
            <span className="relative mx-1 inline-block text-red-600">

              {/* O */}
              <span className="block h-[105px] w-[105px] rounded-full border-[18px] border-red-600 sm:h-[150px] sm:w-[150px] sm:border-[24px] lg:h-[175px] lg:w-[175px] lg:border-[28px]" />

              {/* Cart inside 0 */}
              <FiShoppingCart className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-red-600 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />

            </span>
            4
          </div>

          {/* Small floating label */}
          <div className="absolute -right-2 top-0 rotate-6 rounded-full bg-gray-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg sm:-right-8 sm:top-5">
            Oops!
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-xl">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-red-600">
            <FiSearch className="h-3.5 w-3.5" />
            Looks like you got lost
          </div>

          <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            This page went
            <span className="text-red-500"> shopping.</span>
          </div>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
            We searched everywhere, but couldn't find the page you're
            looking for. Don't worry — there's plenty more to discover.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-200"
            >
              <FiHome className="h-4 w-4" />
              Back to Home
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:text-red-500 hover:shadow-lg"
            >
              <FiShoppingBag className="h-4 w-4" />
              Explore Products
            </Link>

          </div>

          {/* Bottom hint */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span className="h-px w-8 bg-gray-200" />
            <span>Let's get you back to shopping</span>
            <span className="h-px w-8 bg-gray-200" />
          </div>

        </div>
      </div>
    </main>
  );
}