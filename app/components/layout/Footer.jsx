import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getProducts, getSiteInfo } from '@/app/lib/common'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaPinterest, FaWhatsapp } from "react-icons/fa6";
import { HiArrowNarrowRight } from "react-icons/hi";


const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/" },
    { label: "Our Products", href: "/" },
    { label: "Contact", href: "/" },
];


const Footer = async () => {
    const siteInfo = await getSiteInfo();
    return (
        <>
            <footer className='bg-[#151515] text-gray-400 pt-15'>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
                                <div className='flex gap-2 mt-4'>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaFacebook /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaInstagram /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaXTwitter /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaPinterest /></Link>
                                    <Link className='border block p-2 text-gray-400 rounded-sm' href={`/`}><FaWhatsapp /></Link>
                                </div>
                            </div>
                        </div>
                        {/* Quick Links */}
                        <div className="md:col-span-2">
                            <p className="uppercase underline h3">Quick Links</p>
                            <ul className="mt-5  text-sm flex flex-wrap gap-3">
                                {quickLinks.map((link) => (
                                    <li key={link.label} className='py-2'>
                                        <Link
                                            title={link.label}
                                            href={link.href}
                                            className=" hover:text-[var(--color-2)] flex items-center gap-2 border px-7 py-2 rounded-3xl"
                                        > {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <span className='mb-6 block text-xl'>Subscribe to our emails</span>
                            <div className='border px-2 flex rounded-3xl justify-between items-center'>
                                <input className='outline-0 p-2' type="text" name="" id="" placeholder='Email' />
                                <button className='bg-white rounded-full text-black p-2'>
                                    <HiArrowNarrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-t-1 mt-10 text-center py-4 text-sm'>
                    <p>© 2026, Kamvasna Powered by instavyapar</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
