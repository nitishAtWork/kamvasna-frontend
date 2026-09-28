"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

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
            /*
             * We will connect this
             * after matching your
             * actual backend
             * createOrder payload.
             */
            if (!address) {
                return;
            }

            setPlacingOrder(true);

            try {
                console.log(
                    "PLACE ORDER:",
                    {
                        address,
                        items,
                        totals,
                    }
                );

                /*
                 * Next step:
                 *
                 * await orderApi.createOrder(...)
                 */

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