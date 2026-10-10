"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getImageUrl } from "@/app/lib/imageUrl";
import {
    FiCheckCircle,
    FiPackage,
    FiTruck,
    FiMapPin,
    FiPhone,
    FiCreditCard,
    FiShoppingBag,
    FiArrowLeft,
    FiClock,
    FiHash,
    FiAlertCircle,
} from "react-icons/fi";

import { orderApi } from "@/app/lib/orders";

const Page = () => {
    const params = useParams();
    const router = useRouter();

    const orderId = params?.id;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await orderApi.getOrder(orderId);

                // console.log("GET ORDER RESPONSE:", response);

                const orderData = response?.data?.order;

                if (!orderData) {
                    throw new Error("Order details not found.");
                }

                setOrder(orderData);
            } catch (error) {
                console.error("Failed to fetch order:", error);

                setError(
                    error?.response?.data?.message ||
                        error?.message ||
                        "Unable to load order details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatPrice = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN");
    };

    /*
     * Loading
     */
    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="container py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-40 rounded-lg bg-gray-200" />
                        <div className="h-32 rounded-2xl bg-gray-200" />

                        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                            <div className="space-y-6">
                                <div className="h-80 rounded-2xl bg-gray-200" />
                                <div className="h-60 rounded-2xl bg-gray-200" />
                            </div>

                            <div className="space-y-6">
                                <div className="h-48 rounded-2xl bg-gray-200" />
                                <div className="h-64 rounded-2xl bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    /*
     * Error
     */
    if (error || !order) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FiAlertCircle size={30} />
                    </div>

                    <h1 className="mt-5 text-xl font-bold text-black">
                        Unable to load order
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error || "The requested order could not be found."}
                    </p>

                    <button
                        type="button"
                        onClick={() => router.push("/orders")}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                        <FiArrowLeft />
                        Back to Orders
                    </button>
                </div>
            </main>
        );
    }

    /*
     * Order status
     */
    const status = order.orderStatus?.toUpperCase();

    const isConfirmed = [
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
    ].includes(status);

    const isProcessing = [
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
    ].includes(status);

    const isShipped = [
        "SHIPPED",
        "DELIVERED",
    ].includes(status);

    const isDelivered = status === "DELIVERED";

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="container py-6">
                    <button
                        type="button"
                        onClick={() => router.push("/orders")}
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-red-600"
                    >
                        <FiArrowLeft />
                        Back to Orders
                    </button>

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <FiShoppingBag className="text-red-600" />

                                <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                                    Order Details
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold text-black sm:text-3xl">
                                #{order.orderNumber}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Placed on {formatDate(order.createdAt)}
                            </p>
                        </div>

                        <div
                            className={`flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold sm:self-auto ${
                                status === "CANCELLED"
                                    ? "bg-red-50 text-red-700"
                                    : status === "DELIVERED"
                                      ? "bg-green-50 text-green-700"
                                      : "bg-red-50 text-red-600"
                            }`}
                        >
                            <FiCheckCircle />
                            {order.orderStatus}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-8">
                {/* Success Banner */}
                <div className="mb-8 overflow-hidden rounded-2xl bg-black shadow-sm">
                    <div className="relative p-6 sm:p-8">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-600/20 blur-2xl" />

                        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                                <FiCheckCircle size={28} />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {status === "CANCELLED"
                                        ? "Order cancelled"
                                        : "Order placed successfully!"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-300">
                                    {status === "CANCELLED"
                                        ? "This order has been cancelled."
                                        : "Thank you for your order. We'll keep you updated about your delivery."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Status */}
                {status !== "CANCELLED" && (
                    <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                        <div className="mb-7">
                            <h2 className="text-lg font-bold text-black">
                                Order Status
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Track your order progress
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-[10%] right-[10%] top-5 hidden h-0.5 bg-gray-200 sm:block" />

                            <div className="grid grid-cols-2 gap-7 sm:grid-cols-4">
                                {/* Confirmed */}
                                <div className="relative z-10 text-center">
                                    <div
                                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-white ${
                                            isConfirmed
                                                ? "bg-red-600 shadow-lg shadow-red-600/20"
                                                : "bg-gray-200 text-gray-400"
                                        }`}
                                    >
                                        <FiCheckCircle />
                                    </div>

                                    <p
                                        className={`mt-3 text-sm font-bold ${
                                            isConfirmed
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        Confirmed
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Order received
                                    </p>
                                </div>

                                {/* Processing */}
                                <div className="relative z-10 text-center">
                                    <div
                                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-white ${
                                            isProcessing
                                                ? "bg-black"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        <FiPackage />
                                    </div>

                                    <p
                                        className={`mt-3 text-sm font-bold ${
                                            isProcessing
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        Processing
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Preparing order
                                    </p>
                                </div>

                                {/* Shipped */}
                                <div className="relative z-10 text-center">
                                    <div
                                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                                            isShipped
                                                ? "bg-red-600 text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        <FiTruck />
                                    </div>

                                    <p
                                        className={`mt-3 text-sm font-bold ${
                                            isShipped
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        Shipped
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        On the way
                                    </p>
                                </div>

                                {/* Delivered */}
                                <div className="relative z-10 text-center">
                                    <div
                                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                                            isDelivered
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        <FiCheckCircle />
                                    </div>

                                    <p
                                        className={`mt-3 text-sm font-bold ${
                                            isDelivered
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        Delivered
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Order delivered
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    {/* LEFT */}
                    <div className="space-y-8">
                        {/* Products */}
                        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <FiShoppingBag />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-black">
                                            Ordered Items
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            {order.items?.length || 0} items
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {order.items?.map((item, index) => (
                                    <div
                                        key={
                                            item.product ||
                                            item._id ||
                                            index
                                        }
                                        className="flex gap-4 p-5 sm:p-6"
                                    >
                                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 sm:h-28 sm:w-28">
                                            <img
                                                src={getImageUrl(item.img)}
                                                alt={item.name}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>

                                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                                            <div>
                                                <h3 className="line-clamp-2 text-sm font-semibold text-black sm:text-base">
                                                    {item.name}
                                                </h3>

                                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                                    <span>
                                                        SKU: {item.sku}
                                                    </span>

                                                    <span>
                                                        Qty: {item.quantity}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between gap-3">
                                                <span className="text-sm text-gray-500">
                                                    ₹
                                                    {formatPrice(
                                                        item.price
                                                    )}{" "}
                                                    × {item.quantity}
                                                </span>

                                                <span className="font-bold text-black">
                                                    ₹
                                                    {formatPrice(
                                                        item.subtotal
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                    <FiMapPin />
                                </div>

                                <div>
                                    <h2 className="font-bold text-black">
                                        Delivery Address
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Your order will be delivered here
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <h3 className="font-semibold text-black">
                                    {order.shippingAddress?.name}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    {order.shippingAddress?.addressLine1}

                                    {order.shippingAddress
                                        ?.addressLine2 && (
                                        <>
                                            <br />
                                            {
                                                order.shippingAddress
                                                    .addressLine2
                                            }
                                        </>
                                    )}

                                    <br />

                                    {order.shippingAddress?.city},{" "}
                                    {order.shippingAddress?.state} -{" "}
                                    {order.shippingAddress?.postalCode}

                                    <br />

                                    {order.shippingAddress?.country}
                                </p>

                                <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 text-sm text-gray-600">
                                    <FiPhone className="text-red-600" />

                                    {order.shippingAddress?.phone}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT */}
                    <aside className="space-y-8">
                        {/* Payment */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                                    <FiCreditCard />
                                </div>

                                <div>
                                    <h2 className="font-bold text-black">
                                        Payment
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Payment information
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Method
                                    </span>

                                    <span className="font-semibold text-black">
                                        {order.paymentMethod}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Status
                                    </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            order.paymentStatus === "PAID"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-yellow-50 text-yellow-700"
                                        }`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Price Summary */}
                        <section className="rounded-2xl bg-black p-5 text-white shadow-lg sm:p-6">
                            <h2 className="mb-6 text-lg font-bold">
                                Order Summary
                            </h2>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>

                                    <span>
                                        ₹{formatPrice(order.subtotal)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>

                                    <span>
                                        {Number(order.shippingAmount) === 0
                                            ? "FREE"
                                            : `₹${formatPrice(
                                                  order.shippingAmount
                                              )}`}
                                    </span>
                                </div>

                                {Number(order.discountAmount) > 0 && (
                                    <div className="flex justify-between text-green-400">
                                        <span>Discount</span>

                                        <span>
                                            -₹
                                            {formatPrice(
                                                order.discountAmount
                                            )}
                                        </span>
                                    </div>
                                )}

                                <div className="border-t border-white/10 pt-5">
                                    <div className="flex items-end justify-between">
                                        <span className="text-gray-300">
                                            Total Amount
                                        </span>

                                        <span className="text-2xl font-bold text-white">
                                            ₹
                                            {formatPrice(
                                                order.totalAmount
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Order Information */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-5 font-bold text-black">
                                Order Information
                            </h2>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <FiHash className="mt-0.5 shrink-0 text-red-600" />

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Order Number
                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-black">
                                            {order.orderNumber}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <FiClock className="mt-0.5 shrink-0 text-red-600" />

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Order Date
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-black">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <FiPackage className="mt-0.5 shrink-0 text-red-600" />

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Order Status
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-black">
                                            {order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default Page;