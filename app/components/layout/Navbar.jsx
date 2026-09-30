import React from 'react'
import NavClient from './NavClient'
import { getProducts, getSiteInfo } from '@/app/lib/common'

const Navbar = async () => {
    const siteInfo = await getSiteInfo();
    const product = await getProducts();
    return (
        <NavClient siteInfo={siteInfo} product={product} />
    )
}

export default Navbar