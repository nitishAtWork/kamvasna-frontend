"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FiArrowUpRight,
    FiChevronRight,
} from "react-icons/fi";

const categories = [
    {
        name: "Masturbators",
        slug: "masturbators",
        image: "/img/mastru.png",
    },
    {
        name: "Silicone Condoms",
        slug: "condoms",
        image: "/img/Silicon-Condom.png",
    },
    {
        name: "Sex Dolls",
        slug: "sex-dolls",
        image: "/img/sex-doll.png",
    },
    {
        name: "Dildo & Vibrator",
        slug: "dildos",
        image: "/img/dildo-vib.png",
    },
];

const Category = () => {
    return (
        <section className="relative overflow-hidden bg-[#f2f3f8] pt-4 sm:pt-4">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-red-50 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-gray-100 blur-3xl" />

            <div className="relative container px-4 sm:px-4">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:grid-cols-4">
                    {categories.map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/products`}
                            className="group relative"
                        >
                            <div className="relative min-h-[105px] lg:min-h-[135px] lg:px-4 px-3 overflow-hidden rounded-2xl border border-gray-200 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/10">
                                {/* Background glow */}
                                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-red-600/10 blur-3xl transition-all duration-500 group-hover:bg-red-600/20" />

                                {/* Arrow */}
                                <div className="absolute right-3 bottom-3 z-20 md:flex hidden h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white ">
                                    <FiArrowUpRight size={14} />
                                </div>

                                <div className="flex flex-wrap md:flex-nowrap items-center lg:justify-normal justify-center gap-2.5">
                                    {/* Product image */}
                                    <div className="flex lg:h-[115px] h-[75px] items-center justify-center pt-4">
                                        <div className="absolute h-24 w-24 rounded-full bg-red-600/10 blur-xl transition-all duration-500 group-hover:bg-red-600/20" />

                                        <div className="relative flex lg:h-24 lg:w-24 h-16  w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-red-500 via-red-700 to-black shadow-lg transition-transform duration-500 group-hover:scale-105">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                title={category.name}
                                                width={100}
                                                height={100}
                                                className="lg:h-[78px] h-[50px] lg:w-[78px] w-[50px] object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 h-fit">
                                        <p className="truncate md:text-start text-center text-[7px] font-bold text-white lg:text-base">
                                            {category.name}
                                        </p>

                                        {/* Bottom */}
                                        <div className="mt-3 lg:mb-0 mb-2.5 md:flex hidden items-center md:justify-between justify-center md:mx-0 mx-auto border-t border-white/10 pt-2.5 w-fit">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600 transition-colors duration-300 group-hover:text-red-500">
                                                Explore
                                            </span>

                                            <FiChevronRight
                                                size={14}
                                                className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover red line */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;