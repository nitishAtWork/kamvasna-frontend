"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

import { orderApi } from "@/app/lib/orders";

import CheckoutSteps from "@/app/components/checkout/CheckoutSteps";
import AddressForm from "@/app/components/checkout/AddressForm";
import CheckoutSummary from "@/app/components/checkout/CheckoutSummary";

export default function CheckoutPage() {
    const router = useRouter();

    const { user } = useAuth();

    const {
        items,
        totals,
        loading: cartLoading,
    } = useCart();

    const [address, setAddress] =
        useState(null);

    const [placingOrder, setPlacingOrder] =
        useState(false);

    const [
        paymentMethod,
        setPaymentMethod,
    ] = useState("ONLINE");

    /*
     * User must be logged in before checkout.
     */
    useEffect(() => {
        if (!cartLoading && !user) {
            router.replace(
                `/login?redirect=/checkout`
            );
        }
    }, [
        user,
        cartLoading,
        router,
    ]);

    /*
     * Don't show checkout while
     * authentication/cart state is loading.
     */
    if (
        cartLoading ||
        !user
    ) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-5">
                <div className="text-sm text-gray-500">
                    Loading checkout...
                </div>
            </main>
        );
    }

    /*
     * Empty cart.
     */
    if (!items?.length) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Your cart is empty
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Add some products before
                    proceeding to checkout.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/products"
                        )
                    }
                    className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                    Continue Shopping
                </button>
            </main>
        );
    }

    const handleAddressChange =
        (selectedAddress) => {
            setAddress(
                selectedAddress
            );
        };

    const handlePlaceOrder =
        async () => {
            if (!address) {
                return;
            }

            try {
                setPlacingOrder(true);

                const shippingAddress = {
                    name: address.fullName,
                    phone: address.phone,
                    addressLine1:
                        address.addressLine1,
                    addressLine2:
                        address.addressLine2,
                    city: address.city,
                    state: address.state,
                    postalCode:
                        address.postalCode,
                    country:
                        address.country,
                };

                const response =
                    await orderApi.create({
                        shippingAddress,
                        paymentMethod:
                            "ONLINE",
                    });

                // console.log(
                //     "CREATE ORDER RESPONSE:",
                //     response
                // );
            } catch (error) {
                console.error(
                    "Order creation failed:",
                    error
                );
            } finally {
                setPlacingOrder(false);
            }
        };

    return (
        <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Checkout
            </h1>

            <div className="mt-8">
                <CheckoutSteps
                    currentStep={1}
                />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
                {/* Left */}
                <div className="space-y-6">
                    <AddressForm
                        value={address}
                        onChange={
                            handleAddressChange
                        }
                    />

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Payment Method
                        </h2>

                        <div className="mt-4 space-y-3">
                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="ONLINE"
                                    checked={
                                        paymentMethod ===
                                        "ONLINE"
                                    }
                                    onChange={(event) =>
                                        setPaymentMethod(
                                            event.target.value
                                        )
                                    }
                                />

                                <div>
                                    <p className="font-medium text-gray-900">
                                        Online Payment
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Pay securely online.
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={
                                        paymentMethod ===
                                        "COD"
                                    }
                                    onChange={(event) =>
                                        setPaymentMethod(
                                            event.target.value
                                        )
                                    }
                                />

                                <div>
                                    <p className="font-medium text-gray-900">
                                        Cash on Delivery
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Pay when your order arrives.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <CheckoutSummary
                    items={items}
                    totals={totals}
                    address={address}
                    placingOrder={
                        placingOrder
                    }
                    onPlaceOrder={
                        handlePlaceOrder
                    }
                />
            </div>
        </main>
    );
}