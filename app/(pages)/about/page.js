import { serverFetch } from "@/app/hooks/serverFetch";
import { Parser } from "html-to-react";
import Image from "next/image";
import Link from "next/link";
import {
    FiHeart,
    FiShield,
    FiLock,
    FiCheckCircle,
    FiTruck,
    FiUsers,
    FiArrowRight,
    FiStar,
} from "react-icons/fi";

const page = async () => {
    const data = await serverFetch("/pages/about")

    return (
        <main className="bg-white text-gray-900">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-gray-100">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-50 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gray-100 blur-3xl" />

                <div className="relative container py-20 lg:py-28">
                    <div className="lg:grid lg:grid-cols-2 gap-5 w-full">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                                <FiHeart size={15} />
                                {data?.name}
                            </span>

                            <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                                {data?.shortDescription}
                                {/* <span className="text-red-600"> confidence.</span> */}
                            </h1>

                            <div className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                                {Parser().parse(data?.description)}
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-600"
                                >
                                    Explore Products
                                    <FiArrowRight />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-900 transition hover:border-red-200 hover:text-red-600"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                        <Image src={data?.img} width={800} height={800} className="max-w-full rounded-2xl lg:mt-0 mt-8 h-auto" alt={data?.shortDescription} title={data?.shortDescription} />
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="container px-6 py-20 sm:px-8 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                            Who We Are
                        </p>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                            Intimate wellness,
                            <br />
                            made simple.
                        </h2>

                        <p className="mt-6 leading-8 text-gray-600">
                            At Kamvasna, we believe intimate wellness should be
                            approached with the same care and confidence as
                            every other part of personal wellbeing.
                        </p>

                        <p className="mt-4 leading-8 text-gray-600">
                            We bring together thoughtfully selected intimate
                            products, including silicone condoms and adult
                            wellness products, with a focus on quality,
                            comfort, reliability, and a discreet shopping
                            experience.
                        </p>

                        <p className="mt-4 leading-8 text-gray-600">
                            Whether you're discovering something new or
                            choosing products you already trust, our goal is to
                            make the experience comfortable from browsing to
                            delivery.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="rounded-3xl bg-gray-950 p-8 sm:p-10">
                            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white">
                                <FiHeart size={26} />
                            </div>

                            <p className="text-2xl font-bold text-white">
                                Our philosophy
                            </p>

                            <p className="mt-4 leading-7 text-gray-300">
                                Your intimate wellness is personal. Your
                                shopping experience should be too.
                            </p>

                            <div className="mt-8 space-y-5">
                                {[
                                    "Quality-focused products",
                                    "Privacy-first shopping",
                                    "Discreet delivery",
                                    "Customer-focused support",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <FiCheckCircle
                                            className="shrink-0 text-red-500"
                                            size={19}
                                        />
                                        <span className="text-sm font-medium text-gray-200">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <div className="absolute -bottom-5 -right-5 hidden h-24 w-24 rounded-2xl border border-red-100 bg-red-50 sm:block" /> */}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50">
                <div className="container px-6 py-20 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                            What Matters To Us
                        </p>

                        <p className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                            Built around your comfort
                        </p>

                        <p className="mt-4 leading-7 text-gray-600">
                            Every part of the Kamvasna experience is designed
                            with confidence, privacy, and convenience in mind.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: FiShield,
                                title: "Quality First",
                                text: "We focus on products selected with comfort, reliability, and everyday use in mind.",
                            },
                            {
                                icon: FiLock,
                                title: "Your Privacy",
                                text: "Your personal information and shopping experience are treated with care.",
                            },
                            {
                                icon: FiTruck,
                                title: "Discreet Delivery",
                                text: "We aim to make receiving your order as private and comfortable as shopping with us.",
                            },
                            {
                                icon: FiUsers,
                                title: "Customer First",
                                text: "Our goal is to provide a simple, helpful, and respectful customer experience.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group rounded-2xl border border-gray-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl hover:shadow-gray-200/50"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-gray-950">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-gray-600">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Kamvasna */}
            <section className="container px-6 py-20 sm:px-8 lg:px-12">
                <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                    <div className="rounded-3xl bg-red-600 p-8 sm:p-10">
                        <FiStar className="text-white" size={30} />

                        <h2 className="mt-6 text-3xl font-black text-white">
                            A brand you can shop with confidence.
                        </h2>

                        <p className="mt-5 leading-7 text-red-50">
                            From product discovery to delivery, we're working
                            to create an intimate wellness shopping experience
                            that feels modern, respectful, and dependable.
                        </p>

                        <Link
                            href="/products"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
                        >
                            Shop Kamvasna
                            <FiArrowRight />
                        </Link>
                    </div>

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                            Why Kamvasna
                        </p>

                        <p className="mt-4 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                            Designed for modern intimate wellness.
                        </p>

                        <div className="mt-8 space-y-6">
                            {[
                                {
                                    number: "01",
                                    title: "Thoughtful Selection",
                                    text: "We aim to offer intimate wellness products that combine practicality, comfort, and modern design.",
                                },
                                {
                                    number: "02",
                                    title: "Simple Experience",
                                    text: "From finding the right product to placing an order, we want every step to feel straightforward.",
                                },
                                {
                                    number: "03",
                                    title: "Discretion Matters",
                                    text: "We understand that intimate purchases are personal, which is why discretion remains an important part of our experience.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="flex gap-5 border-b border-gray-100 pb-6 last:border-0"
                                >
                                    <span className="text-sm font-black text-red-600">
                                        {item.number}
                                    </span>

                                    <div>
                                        <p className="font-bold text-gray-950">
                                            {item.title}
                                        </p>

                                        <p className="mt-2 text-sm leading-7 text-gray-600">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="border-y border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                        <FiHeart size={25} />
                    </div>

                    <p className="mt-6 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                        Our mission
                    </p>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        To make intimate wellness more accessible, comfortable,
                        and confidently personal — with quality products,
                        thoughtful service, and a shopping experience you can
                        trust.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="container px-6 py-20 sm:px-8 lg:px-12">
                <div className="overflow-hidden rounded-3xl bg-gray-950 px-6 py-14 text-center sm:px-12">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                        Discover Kamvasna
                    </p>

                    <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black text-white sm:text-4xl">
                        Your comfort. Your confidence. Your choice.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
                        Explore our collection of intimate wellness products
                        and find something that's right for you.
                    </p>

                    <Link
                        href="/products"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-red-500"
                    >
                        Explore Products
                        <FiArrowRight />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default page;