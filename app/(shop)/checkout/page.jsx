"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        useState("COD");

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

            alert(
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
        if (!address) {
            alert(
                "Please select or add a delivery address."
            );
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
                    address.addressLine2 || "",
                city: address.city,
                state: address.state,
                postalCode:
                    address.postalCode,
                country:
                    address.country || "India",
            };

            const response =
                await orderApi.create({
                    shippingAddress,
                    paymentMethod,
                });

            // console.log(
            //     "CREATE ORDER RESPONSE:",
            //     response
            // );

            const order =
                response?.data?.order;

            if (!order) {
                throw new Error(
                    "Order details not found in response."
                );
            }

            await loadCart();

            /*
             * ONLINE PAYMENT
             */
            if (
                order.paymentMethod ===
                "ONLINE" &&
                order.paymentCheckoutUrl
            ) {
                window.location.href =
                    order.paymentCheckoutUrl;

                return;
            }

            /*
             * COD
             */
            if (
                order.paymentMethod ===
                "COD"
            ) {
                router.push(
                    `/orders/${order._id}`
                );

                return;
            }
        } catch (error) {
            console.error(
                "Order creation failed:",
                error
            );

            alert(
                error?.message ||
                "Failed to place order."
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

                    {/* PAYMENT */}
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
        </main>
    );
}