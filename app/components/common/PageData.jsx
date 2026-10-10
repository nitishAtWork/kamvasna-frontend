import { serverFetch } from '@/app/hooks/serverFetch'
import { Parser } from 'html-to-react'
import React from 'react'

const PageData = async ({ apiUrl }) => {
    const data = await serverFetch(apiUrl)
    return (
        <div className='py-16'>
            <div className="container">
                <h1>{data?.shortDescription || data?.name}</h1>
                <div className="mt-2 text-base leading-8 text-gray-600 sm:text-lg">
                    {Parser().parse(data?.description)}
                </div>
            </div>
        </div>
    )
}

export default PageData