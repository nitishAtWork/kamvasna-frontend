import React from 'react'
import { serverFetch } from '@/app/hooks/serverFetch';
// import Breadcrumb from './Breadcrumb';
import { Parser } from 'html-to-react';
import RelatedProduct from '../products/RelatedProduct';
import Image from 'next/image';
// import ImageGallery from './ImageGallery';

const Detail = async ({ apiUrl }) => {
    const data = await serverFetch(apiUrl);

    // console.log(data)

    return (
        <>
            {/* <Breadcrumb name={data?.name} /> */}
            <RelatedProduct />
            <div className="py-15">
                <div className="container">
                    <div className='clearfix'>
                        <Image className='max-w-full lg:max-w-120 lg:mr-5 mb-5 lg:float-left rounded-2xl' width={600} height={600} src={data?.img} alt={data?.name}
                            title={data?.name} />
                        {/* TAG */}
                        <h1 className="text-[25px] mb-2">{data?.name}</h1>
                        <h2 className="text-[21px] mb-2">{data?.shortDescription}</h2>
                        <div className='text-[14px] text-slate-600 text-justify'>
                            {Parser().parse(data?.description || "")}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail