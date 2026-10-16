"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    FiPackage,
    FiShoppingBag,
    FiClock,
    FiCheckCircle,
    FiTruck,
    FiXCircle,
    FiArrowRight,
    FiCalendar,
    FiCreditCard,
    FiRefreshCw,
    FiAlertCircle,
} from "react-icons/fi";

import { orderApi } from "@/app/lib/orders";
import { getImageUrl } from "@/app/lib/imageUrl";
import { useAuth } from "@/app/context/AuthContext";

const Page = () => {
    
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const router = useRouter();
    const pathname = usePathname();

    const {
        user,
        isAuthenticated,
        loading: authLoading,
    } = useAuth();

    useEffect(() => {
        if (authLoading) return;

        if (!isAuthenticated || !user) {
            const redirectUrl = encodeURIComponent(pathname || "/");
            router.replace(`/login?redirect=${redirectUrl}`);
        }
    }, [authLoading, isAuthenticated, user, pathname, router]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await orderApi.getOrders();

            console.log("GET ORDERS RESPONSE:", response);

            /*
             * Expected:
             *
             * {
             *   success: true,
             *   data: {
             *      orders: [...]
             *   }
             * }
             */

            const orderList = response?.data?.orders || [];

            setOrders(orderList);
        } catch (error) {
            console.error("Failed to fetch orders:", error);

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to load your orders."
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatPrice = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN");
    };

    const getStatusConfig = (status) => {
        switch (status?.toUpperCase()) {
            case "CONFIRMED":
                return {
                    label: "Confirmed",
                    icon: FiCheckCircle,
                    className: "bg-red-50 text-red-600",
                };

            case "PROCESSING":
                return {
                    label: "Processing",
                    icon: FiPackage,
                    className: "bg-black text-white",
                };

            case "SHIPPED":
                return {
                    label: "Shipped",
                    icon: FiTruck,
                    className: "bg-blue-50 text-blue-600",
                };

            case "DELIVERED":
                return {
                    label: "Delivered",
                    icon: FiCheckCircle,
                    className: "bg-green-50 text-green-700",
                };

            case "CANCELLED":
                return {
                    label: "Cancelled",
                    icon: FiXCircle,
                    className: "bg-gray-100 text-gray-600",
                };

            default:
                return {
                    label: status || "Pending",
                    icon: FiClock,
                    className: "bg-yellow-50 text-yellow-700",
                };
        }
    };

    /*
     * Loading
     */
    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-10 w-48 rounded-lg bg-gray-200" />
                        <div className="mt-3 h-5 w-72 rounded bg-gray-200" />

                        <div className="mt-8 space-y-5">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-52 rounded-2xl bg-gray-200"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    /*
     * Error
     */
    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FiAlertCircle size={30} />
                    </div>

                    <h1 className="mt-5 text-xl font-bold text-black">
                        Unable to load orders
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchOrders}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                        <FiRefreshCw />
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <FiShoppingBag className="text-red-600" />

                                <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                                    My Account
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                                My Orders
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                View and track all your orders in one place.
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            <FiPackage size={22} />
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Empty State */}
                {orders.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
                            <FiShoppingBag size={34} />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-black">
                            No orders yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            You haven't placed any orders yet. Explore our
                            products and find something you love.
                        </p>

                        <button
                            type="button"
                            onClick={() => router.push("/products")}
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            Start Shopping
                            <FiArrowRight />
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Top Summary */}
                        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <FiShoppingBag />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Total Orders
                                        </p>

                                        <p className="text-xl font-bold text-black">
                                            {orders.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                                        <FiClock />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Processing
                                        </p>

                                        <p className="text-xl font-bold text-black">
                                            {
                                                orders.filter((order) =>
                                                    [
                                                        "CONFIRMED",
                                                        "PROCESSING",
                                                    ].includes(
                                                        order.orderStatus?.toUpperCase()
                                                    )
                                                ).length
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FiTruck />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Shipped
                                        </p>

                                        <p className="text-xl font-bold text-black">
                                            {
                                                orders.filter(
                                                    (order) =>
                                                        order.orderStatus?.toUpperCase() ===
                                                        "SHIPPED"
                                                ).length
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                        <FiCheckCircle />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Delivered
                                        </p>

                                        <p className="text-xl font-bold text-black">
                                            {
                                                orders.filter(
                                                    (order) =>
                                                        order.orderStatus?.toUpperCase() ===
                                                        "DELIVERED"
                                                ).length
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="space-y-5">
                            {orders.map((order) => {
                                const status = getStatusConfig(
                                    order.orderStatus
                                );

                                const StatusIcon = status.icon;

                                return (
                                    <article
                                        key={order._id}
                                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        {/* Order Header */}
                                        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                                                    <FiPackage />
                                                </div>

                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h2 className="font-bold text-black">
                                                            #
                                                            {
                                                                order.orderNumber
                                                            }
                                                        </h2>

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                                                        >
                                                            <StatusIcon
                                                                size={13}
                                                            />

                                                            {status.label}
                                                        </span>
                                                    </div>

                                                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <FiCalendar />
                                                            {formatDate(
                                                                order.createdAt
                                                            )}
                                                        </span>

                                                        <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

                                                        <span>
                                                            {
                                                                order.items
                                                                    ?.length
                                                            }{" "}
                                                            items
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                                                <p className="text-xs text-gray-500">
                                                    Total
                                                </p>

                                                <p className="text-xl font-bold text-black">
                                                    ₹
                                                    {formatPrice(
                                                        order.totalAmount
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Products */}
                                        <div className="p-5 sm:p-6">
                                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex min-w-0 flex-1">
                                                    <div className="flex -space-x-3">
                                                        {order.items
                                                            ?.slice(0, 4)
                                                            .map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            item.product ||
                                                                            index
                                                                        }
                                                                        className="h-16 w-16 overflow-hidden rounded-xl border-2 border-white bg-gray-50 shadow-sm"
                                                                    >
                                                                        <img
                                                                            src={
                                                                                getImageUrl(item.img)
                                                                            }
                                                                            alt={
                                                                                item.name
                                                                            }
                                                                            className="h-full w-full object-contain"
                                                                        />
                                                                    </div>
                                                                )
                                                            )}

                                                        {order.items?.length >
                                                            4 && (
                                                                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-white bg-black text-xs font-bold text-white shadow-sm">
                                                                    +
                                                                    {order.items
                                                                        .length -
                                                                        4}
                                                                </div>
                                                            )}
                                                    </div>

                                                    <div className="ml-5 min-w-0">
                                                        <p className="text-sm font-semibold text-black">
                                                            {order.items?.[0]
                                                                ?.name ||
                                                                "Order Items"}
                                                        </p>

                                                        {order.items?.length >
                                                            1 && (
                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    +{" "}
                                                                    {order.items
                                                                        .length -
                                                                        1}{" "}
                                                                    more item
                                                                    {order.items
                                                                        .length -
                                                                        1 >
                                                                        1
                                                                        ? "s"
                                                                        : ""}
                                                                </p>
                                                            )}

                                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                                            <span className="flex items-center gap-1">
                                                                <FiCreditCard />
                                                                {
                                                                    order.paymentMethod
                                                                }
                                                            </span>

                                                            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

                                                            <span>
                                                                {
                                                                    order.paymentStatus
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        router.push(
                                                            `/orders/${order._id}`
                                                        )
                                                    }
                                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 sm:w-auto"
                                                >
                                                    View Order
                                                    <FiArrowRight />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                                            <span>
                                                Delivery to{" "}
                                                <strong className="font-semibold text-gray-700">
                                                    {
                                                        order.shippingAddress
                                                            ?.city
                                                    }
                                                </strong>
                                            </span>

                                            <span>
                                                {order.shippingAmount === 0
                                                    ? "Free Shipping"
                                                    : `Shipping ₹${formatPrice(
                                                        order.shippingAmount
                                                    )}`}
                                            </span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Page;