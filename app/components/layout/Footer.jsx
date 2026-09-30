import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getProducts, getSiteInfo } from '@/app/lib/common'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaPinterest, FaWhatsapp } from "react-icons/fa6";


const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/" },
    { label: "Our Products", href: "/" },
    { label: "Market Place", href: "/" },
    { label: "Sitemap", href: "/" },
    { label: "Contact", href: "/" },
];


const Footer = async () => {
    const siteInfo = await getSiteInfo();
    return (
        <>
            <footer className='bg-[#151515] text-gray-400 py-10'>
                <div className="container">
                    <div className="grid grid-cols-4">
                        <div className="">
                            <div>
                                <Link href="/" className="group inline-block">
                                    {siteInfo?.logo && (
                                        <Image
                                            src={siteInfo.logo}
                                            width={200}
                                            height={100}
                                            className="h-19 w-auto object-contain transition duration-300 group-hover:opacity-80"
                                            alt={siteInfo?.name || "Website"}
                                            title={siteInfo?.name || "Website"}
                                        />
                                    )}
                                </Link>
                                <div className='flex gap-2 mt-6'>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaFacebook /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaInstagram /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaXTwitter /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaPinterest /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaWhatsapp /></Link>
                                </div>
                            </div>
                        </div>
                        {/* Quick Links */}
                        <div className="col-span-2">
                            <p className="uppercase underline h5">Quick Links</p>
                            <ul className="mt-5 space-y-4 text-sm flex flex-wrap gap-6">
                                {quickLinks.map((link) => (
                                    <li key={link.label} className='py-2'>
                                        <Link
                                            title={link.label}
                                            href={link.href}
                                            className=" hover:text-[var(--color-2)] flex items-center gap-2"
                                        > {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
