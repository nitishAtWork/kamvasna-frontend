import React from 'react'
import Link from "next/link";
import { locationApi } from '@/app/lib/location';
import { industryApi } from '@/app/lib/industry';

const Locations = async () => {
    const location = await locationApi.getCountry();
    const industry = await industryApi.getIndustry();

    const linkClass =
        "flex min-h-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-red-700 to-black px-6 py-4 text-center text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-lg";
    return (
        <div className="sitemap py-15 bg-gray-100">

            <div className="container">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Marketplace
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Browse our marketplace and explore our collection.
                    </p>
                </div>

                <div className="row">
                    <div className="navigation-links">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                            {
                                industry?.data?.map((value, index) => (
                                    <Link key={index} alt={value.name} title={value.name} href={`/${value.slug}`} className={linkClass}>{value.name}</Link>
                                ))
                            }
                        </div>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-9">
                            <>
                                {/* Minor Locations */}
                                {
                                    location?.data?.map((value, index) => (
                                        <Link alt={value.name} title={value.name} key={index} href={`/${value.slug}`} className={linkClass} >{value.name}</Link>
                                    ))
                                }
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Locations