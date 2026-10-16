"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

import { orderApi } from "@/app/lib/orders";
import { addressApi } from "@/app/lib/addresses";

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
        loadCart,
    } = useCart();

    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState(null);

    const [loadingAddresses, setLoadingAddresses] =
        useState(true);

    const [showAddressForm, setShowAddressForm] =
        useState(false);

    const [savingAddress, setSavingAddress] =
        useState(false);

    const [placingOrder, setPlacingOrder] =
        useState(false);

    const [paymentMethod, setPaymentMethod] =
        useState("");

    const [paymentMethodError, setPaymentMethodError] =
        useState("");

    useEffect(() => {
        setPaymentMethodError("");
    }, [paymentMethod]);

    /*
     * Temporary form state for new address.
     */
    const [newAddress, setNewAddress] = useState({
        label: "HOME",
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
    });

    /*
     * User must be logged in before checkout.
     */
    useEffect(() => {
        if (!cartLoading && !user) {
            router.replace("/login?redirect=/checkout");
        }
    }, [user, cartLoading, router]);

    /*
     * Fetch saved addresses.
     */
    useEffect(() => {
        if (!user) {
            return;
        }

        const loadAddresses = async () => {
            try {
                setLoadingAddresses(true);

                const response =
                    await addressApi.getAll();

                const savedAddresses =
                    response?.data?.data ??
                    response?.data ??
                    [];

                setAddresses(savedAddresses);

                /*
                 * If addresses exist:
                 * select default address first.
                 */
                if (savedAddresses.length > 0) {
                    const defaultAddress =
                        savedAddresses.find(
                            (item) => item.isDefault
                        );

                    setAddress(
                        defaultAddress ||
                        savedAddresses[0]
                    );

                    setShowAddressForm(false);
                } else {
                    /*
                     * No saved address.
                     * Show address form.
                     */
                    setAddress(null);
                    setShowAddressForm(true);
                }
            } catch (error) {
                console.error(
                    "Failed to load addresses:",
                    error
                );

                /*
                 * If loading fails, allow
                 * the user to enter an address.
                 */
                setShowAddressForm(true);
            } finally {
                setLoadingAddresses(false);
            }
        };

        loadAddresses();
    }, [user]);

    /*
     * Don't show checkout while
     * authentication/cart state is loading.
     */
    if (cartLoading || !user) {
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
                        router.push("/products")
                    }
                    className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                    Continue Shopping
                </button>
            </main>
        );
    }

    /*
     * Save new address.
     */
    const handleSaveAddress = async (event) => {
        event.preventDefault();

        try {
            setSavingAddress(true);

            const response =
                await addressApi.create(
                    newAddress
                );

            const savedAddress =
                response?.data?.data ??
                response?.data;

            if (!savedAddress) {
                throw new Error(
                    "Address was not returned by the server."
                );
            }

            /*
             * Add newly created address
             * to the local list.
             */
            setAddresses((prev) => [
                ...prev,
                savedAddress,
            ]);

            /*
             * Automatically select it.
             */
            setAddress(savedAddress);

            /*
             * Hide form.
             */
            setShowAddressForm(false);

            /*
             * Reset form.
             */
            setNewAddress({
                label: "HOME",
                fullName: "",
                phone: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: "",
                country: "India",
                isDefault: false,
            });
        } catch (error) {
            console.error(
                "Failed to save address:",
                error
            );

            toast.error(
                error?.message ||
                "Failed to save address."
            );
        } finally {
            setSavingAddress(false);
        }
    };

    /*
     * Select saved address.
     */
    const handleSelectAddress = (selectedAddress) => {
        setAddress(selectedAddress);
        setShowAddressForm(false);
    };

    /*
     * Handle new address form fields.
     */
    const handleNewAddressChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setNewAddress((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };


    /*
     * Place order.
     */
    const handlePlaceOrder = async () => {
        if (placingOrder) return;

        if (!paymentMethod) {
            toast.error("Please select a payment method to continue.");
            setPaymentMethodError("Please select a payment method to continue.")
            return;
        }

        if (!address) {
            toast.error("Please select or add a delivery address.");
            return;
        }

        try {
            setPlacingOrder(true);

            const shippingAddress = {
                name: address.fullName,
                phone: address.phone,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2 || "",
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                country: address.country || "India",
            };

            const response = await orderApi.create({
                shippingAddress,
                paymentMethod,
            });

            // Support common API response structures.
            const order =
                response?.data?.order ??
                response?.data?.data?.order ??
                response?.data?.data;

            if (!order?._id) {
                throw new Error(
                    "Order details not found in the server response."
                );
            }

            /*
             * ONLINE PAYMENT
             */
            if (order.paymentMethod === "ONLINE") {
                if (!order.paymentCheckoutUrl) {
                    throw new Error(
                        "The payment checkout URL is missing. Please check your order before trying again."
                    );
                }

                let checkoutUrl;

                try {
                    checkoutUrl = new URL(order.paymentCheckoutUrl);
                } catch {
                    throw new Error(
                        "The payment checkout URL is invalid."
                    );
                }

                // Only redirect to the trusted UroPai checkout host.
                if (
                    checkoutUrl.protocol !== "https:" ||
                    checkoutUrl.hostname !== "api.uropai.in"
                ) {
                    throw new Error(
                        "The payment checkout URL is not trusted."
                    );
                }

                // Redirect immediately; don't let a cart refresh failure
                // interrupt an already-created payment session.
                window.location.assign(checkoutUrl.href);
                return;
            }

            /*
             * CASH ON DELIVERY
             */
            if (order.paymentMethod === "COD") {
                router.push(`/orders/${order._id}`);

                // Cart refresh is best-effort after successful navigation.
                loadCart().catch((error) => {
                    console.error("Failed to refresh cart:", error);
                });

                return;
            }

            throw new Error(
                "Unsupported payment method returned by the server."
            );
        } catch (error) {
            console.error("Order creation failed:", error);

            toast.error(
                error?.message ||
                "Failed to place order. Please try again."
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
                <CheckoutSteps currentStep={1} />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
                {/* LEFT */}
                <div className="space-y-6">

                    {/* ADDRESS SECTION */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Delivery Address
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Choose where you want your order delivered.
                                </p>
                            </div>

                            {addresses.length > 0 &&
                                !showAddressForm && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowAddressForm(
                                                true
                                            )
                                        }
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        + Add New
                                    </button>
                                )}
                        </div>

                        {/* Loading */}
                        {loadingAddresses && (
                            <div className="mt-6 rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
                                Loading saved addresses...
                            </div>
                        )}

                        {/* SAVED ADDRESSES */}
                        {!loadingAddresses &&
                            addresses.length > 0 &&
                            !showAddressForm && (
                                <div className="mt-6 space-y-3">
                                    {addresses.map(
                                        (savedAddress) => {
                                            const selected =
                                                address?._id ===
                                                savedAddress._id;

                                            return (
                                                <button
                                                    key={
                                                        savedAddress._id
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        handleSelectAddress(
                                                            savedAddress
                                                        )
                                                    }
                                                    className={`w-full rounded-xl border p-4 text-left transition ${selected
                                                        ? "border-black bg-gray-50 ring-1 ring-black"
                                                        : "border-gray-200 hover:border-gray-400"
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-start gap-3">

                                                            <div
                                                                className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${selected
                                                                    ? "border-black"
                                                                    : "border-gray-400"
                                                                    }`}
                                                            >
                                                                {selected && (
                                                                    <div className="h-2.5 w-2.5 rounded-full bg-black" />
                                                                )}
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <p className="font-semibold text-gray-900">
                                                                        {
                                                                            savedAddress.fullName
                                                                        }
                                                                    </p>

                                                                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                                                                        {
                                                                            savedAddress.label
                                                                        }
                                                                    </span>

                                                                    {savedAddress.isDefault && (
                                                                        <span className="rounded bg-black px-2 py-0.5 text-[11px] font-semibold text-white">
                                                                            Default
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                                                    {
                                                                        savedAddress.addressLine1
                                                                    }

                                                                    {savedAddress.addressLine2 && (
                                                                        <>
                                                                            ,{" "}
                                                                            {
                                                                                savedAddress.addressLine2
                                                                            }
                                                                        </>
                                                                    )}

                                                                    <br />

                                                                    {
                                                                        savedAddress.city
                                                                    }
                                                                    ,{" "}
                                                                    {
                                                                        savedAddress.state
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        savedAddress.postalCode
                                                                    }

                                                                    <br />

                                                                    {
                                                                        savedAddress.country
                                                                    }
                                                                </p>

                                                                <p className="mt-2 text-sm font-medium text-gray-700">
                                                                    {
                                                                        savedAddress.phone
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            )}

                        {/* NEW ADDRESS FORM */}
                        {!loadingAddresses &&
                            showAddressForm && (
                                <div className="mt-6">
                                    <AddressForm
                                        value={newAddress}
                                        onChange={handleNewAddressChange}
                                        onSubmit={handleSaveAddress}
                                        saving={savingAddress}
                                    />

                                    {addresses.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowAddressForm(false)
                                            }
                                            className="mt-3 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            )}
                    </div>


                    {/* PAYMENT METHOD */}
                    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${!paymentMethodError ? "border-gray-200" : "border-red-500"}`}>
                        <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="3" />
                                        <path d="M3 10h18M7 15h3" />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Payment Method
                                    </h2>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Choose how you'd like to pay
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 p-4 sm:p-6">
                            {/* ONLINE PAYMENT */}
                            <label
                                className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${paymentMethod === "ONLINE"
                                    ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                                    : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/70"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="ONLINE"
                                    checked={paymentMethod === "ONLINE"}
                                    onChange={() => setPaymentMethod("ONLINE")}
                                    className="peer sr-only"
                                    required
                                />

                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${paymentMethod === "ONLINE"
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                                        }`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="3" />
                                        <path d="M3 10h18M7 15h3" />
                                    </svg>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-semibold text-gray-900">
                                            Online Payment
                                        </span>
                                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                            Secure
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                        Pay online using the available payment options.
                                    </p>

                                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        >
                                            <rect x="5" y="10" width="14" height="11" rx="2" />
                                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                        </svg>
                                        Secure checkout
                                    </div>
                                </div>

                                <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${paymentMethod === "ONLINE"
                                        ? "border-gray-900 bg-gray-900 text-white"
                                        : "border-gray-300 bg-white"
                                        }`}
                                >
                                    {paymentMethod === "ONLINE" && (
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            className="h-3 w-3"
                                            aria-hidden="true"
                                        >
                                            <path d="m4 10 4 4 8-8" />
                                        </svg>
                                    )}
                                </span>
                            </label>

                            {/* CASH ON DELIVERY */}
                            <label
                                className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${paymentMethod === "COD"
                                    ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                                    : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/70"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={() => setPaymentMethod("COD")}
                                    className="peer sr-only"
                                    required
                                />

                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${paymentMethod === "COD"
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                                        }`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    >
                                        <rect x="3" y="6" width="18" height="12" rx="2.5" />
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M6 9v.01M18 15v.01" />
                                    </svg>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <span className="font-semibold text-gray-900">
                                        Cash on Delivery
                                    </span>

                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                        Pay when your order arrives at your doorstep.
                                    </p>

                                    <div className="mt-2 text-xs text-gray-500">
                                        Payment collected on delivery
                                    </div>
                                </div>

                                <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${paymentMethod === "COD"
                                        ? "border-gray-900 bg-gray-900 text-white"
                                        : "border-gray-300 bg-white"
                                        }`}
                                >
                                    {paymentMethod === "COD" && (
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            className="h-3 w-3"
                                            aria-hidden="true"
                                        >
                                            <path d="m4 10 4 4 8-8" />
                                        </svg>
                                    )}
                                </span>
                            </label>

                            {/* NO SELECTION MESSAGE */}
                            {!paymentMethod && (
                                <p
                                    role="status"
                                    className={`flex items-center gap-2 px-1 pt-1 text-sm  ${paymentMethodError ? "text-red-500" : "text-slate-500"}`}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        className="h-4 w-4 shrink-0"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 8v4m0 4h.01" />
                                    </svg>
                                    Please select a payment method to continue.
                                </p>
                            )}
                        </div>
                    </div>

                </div>

                <div className="md:sticky md:top-15 h-fit">
                    {/* RIGHT */}
                    <CheckoutSummary
                        items={items}
                        totals={totals}
                        address={address}
                        placingOrder={placingOrder}
                        onPlaceOrder={
                            handlePlaceOrder
                        }
                    />
                </div>
            </div>
        </main>
    );
}