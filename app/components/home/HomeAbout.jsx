import { serverFetch } from '@/app/hooks/serverFetch'
import { Parser } from 'html-to-react'
import Image from 'next/image'
import React from 'react'

const HomeAbout = async () => {
    const data = await serverFetch("/pages/home")
    return (
        <div className='pb-16'>
            <Image src={data?.img} width={1800} height={500} className="w-full h-auto mb-18" alt="Banner" title="Banner" />
            <div className="container">
                <h1>{data?.shortDescription}</h1>
                <div className="mt-2 text-base leading-8 text-gray-600 sm:text-lg">
                    {Parser().parse(data?.description)}
                </div>
            </div>
        </div>
    )
}

export default HomeAbout