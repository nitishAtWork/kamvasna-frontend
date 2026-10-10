"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    FiMapPin,
    FiPlus,
    FiEdit3,
    FiTrash2,
    FiArrowLeft,
    FiCheckCircle,
    FiX,
    FiStar,
} from "react-icons/fi";

import { useAuth } from "@/app/context/AuthContext";
import { addressApi } from "@/app/lib/addresses";

export default function AddressesPage() {
    const router = useRouter();

    const {
        loading: authLoading,
        isAuthenticated,
    } = useAuth();

    const [addresses, setAddresses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] =
        useState(null);

    const [defaultId, setDefaultId] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
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

    // ==========================================
    // Load addresses
    // ==========================================

    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (!isAuthenticated) {
            router.replace("/login");
            return;
        }

        loadAddresses();
    }, [
        authLoading,
        isAuthenticated,
        router,
    ]);

    const loadAddresses = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await addressApi.getAll();

            /*
             * Supports:
             *
             * response.data
             *
             * or
             *
             * response.data.data
             *
             * depending on apiRequest().
             */

            const data =
                response?.data?.data ??
                response?.data ??
                [];

            setAddresses(
                Array.isArray(data)
                    ? data
                    : []
            );
        } catch (error) {
            console.error(
                "Failed to load addresses:",
                error
            );

            setError(
                error?.message ||
                    "Unable to load your addresses."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // Form change
    // ==========================================

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    // ==========================================
    // Reset form
    // ==========================================

    const resetForm = () => {
        setFormData({
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

        setEditingId(null);
        setShowForm(false);
    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const payload = {
                label: formData.label,
                fullName:
                    formData.fullName.trim(),
                phone:
                    formData.phone.trim(),
                addressLine1:
                    formData.addressLine1.trim(),
                addressLine2:
                    formData.addressLine2.trim(),
                city:
                    formData.city.trim(),
                state:
                    formData.state.trim(),
                postalCode:
                    formData.postalCode.trim(),
                country:
                    formData.country.trim(),
                isDefault:
                    Boolean(
                        formData.isDefault
                    ),
            };

            let response;

            if (editingId) {
                response =
                    await addressApi.update(
                        editingId,
                        payload
                    );
            } else {
                response =
                    await addressApi.create(
                        payload
                    );
            }

            console.log(
                "ADDRESS RESPONSE:",
                response
            );

            resetForm();

            await loadAddresses();
        } catch (error) {
            console.error(
                "Address save failed:",
                error
            );

            setError(
                error?.message ||
                    "Unable to save address."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // Edit
    // ==========================================

    const handleEdit = (address) => {
        setError("");

        setEditingId(address._id);

        setFormData({
            label:
                address.label ||
                "HOME",

            fullName:
                address.fullName ||
                "",

            phone:
                address.phone ||
                "",

            addressLine1:
                address.addressLine1 ||
                "",

            addressLine2:
                address.addressLine2 ||
                "",

            city:
                address.city ||
                "",

            state:
                address.state ||
                "",

            postalCode:
                address.postalCode ||
                "",

            country:
                address.country ||
                "India",

            isDefault:
                Boolean(
                    address.isDefault
                ),
        });

        setShowForm(true);
    };

    // ==========================================
    // Delete
    // ==========================================

    const removeAddress = async (
        addressId
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this address?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(addressId);
            setError("");

            await addressApi.remove(
                addressId
            );

            setAddresses((prev) =>
                prev.filter(
                    (address) =>
                        address._id !==
                        addressId
                )
            );
        } catch (error) {
            console.error(
                "Delete address failed:",
                error
            );

            setError(
                error?.message ||
                    "Unable to delete address."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // ==========================================
    // Set default
    // ==========================================

    const handleSetDefault = async (
        addressId
    ) => {
        try {
            setDefaultId(addressId);
            setError("");

            const response =
                await addressApi.setDefault(
                    addressId
                );

            console.log(
                "DEFAULT ADDRESS RESPONSE:",
                response
            );

            await loadAddresses();
        } catch (error) {
            console.error(
                "Set default address failed:",
                error
            );

            setError(
                error?.message ||
                    "Unable to update default address."
            );
        } finally {
            setDefaultId(null);
        }
    };

    // ==========================================
    // Loading
    // ==========================================

    if (
        authLoading ||
        (loading && isAuthenticated)
    ) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-10">
                <div className="mx-auto max-w-5xl animate-pulse">
                    <div className="h-8 w-48 rounded bg-gray-200" />

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <div className="h-56 rounded-2xl bg-gray-200" />
                        <div className="h-56 rounded-2xl bg-gray-200" />
                    </div>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Back */}
                <button
                    onClick={() =>
                        router.push("/account")
                    }
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-red-600"
                >
                    <FiArrowLeft />
                    Back to Account
                </button>

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-600">
                            <FiMapPin />
                            Addresses
                        </div>

                        <h1 className="mt-2 text-3xl font-bold text-black">
                            Delivery Addresses
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage the addresses you use
                            for delivery.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                        <FiPlus />
                        Add Address
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Form */}
                {showForm && (
                    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-black">
                                    {editingId
                                        ? "Edit Address"
                                        : "Add New Address"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Enter your delivery
                                    details.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600"
                            >
                                <FiX />
                            </button>
                        </div>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="grid gap-5 sm:grid-cols-2"
                        >
                            {/* Label */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Address Type
                                </label>

                                <select
                                    name="label"
                                    value={
                                        formData.label
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                >
                                    <option value="HOME">
                                        Home
                                    </option>

                                    <option value="WORK">
                                        Work
                                    </option>

                                    <option value="OTHER">
                                        Other
                                    </option>
                                </select>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    name="fullName"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Phone Number
                                </label>

                                <input
                                    name="phone"
                                    type="tel"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Country
                                </label>

                                <input
                                    name="country"
                                    value={
                                        formData.country
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* Address 1 */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Address Line 1
                                </label>

                                <input
                                    name="addressLine1"
                                    value={
                                        formData.addressLine1
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* Address 2 */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Address Line 2
                                </label>

                                <input
                                    name="addressLine2"
                                    value={
                                        formData.addressLine2
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    City
                                </label>

                                <input
                                    name="city"
                                    value={
                                        formData.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    State
                                </label>

                                <input
                                    name="state"
                                    value={
                                        formData.state
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* Postal */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Postal Code
                                </label>

                                <input
                                    name="postalCode"
                                    value={
                                        formData.postalCode
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white"
                                />
                            </div>

                            {/* Default */}
                            <div className="flex items-center">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={
                                            formData.isDefault
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                    />

                                    <span className="text-sm font-medium text-gray-700">
                                        Set as default
                                        address
                                    </span>
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={
                                        resetForm
                                    }
                                    disabled={saving}
                                    className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                          ? "Update Address"
                                          : "Save Address"}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                {/* Empty */}
                {!loading &&
                    addresses.length === 0 && (
                        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                                <FiMapPin
                                    size={28}
                                />
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-black">
                                No saved addresses
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Add an address to make
                                checkout faster.
                            </p>

                            <button
                                onClick={() => {
                                    resetForm();
                                    setShowForm(
                                        true
                                    );
                                }}
                                className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-red-600"
                            >
                                Add Your First
                                Address
                            </button>
                        </div>
                    )}

                {/* Address list */}
                {addresses.length > 0 && (
                    <div className="grid gap-5 md:grid-cols-2">
                        {addresses.map(
                            (address) => (
                                <div
                                    key={
                                        address._id
                                    }
                                    className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                                        address.isDefault
                                            ? "border-red-300 ring-1 ring-red-100"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                                <FiMapPin />
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-black">
                                                    {
                                                        address.fullName
                                                    }
                                                </h3>

                                                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                                                    {address.label ||
                                                        "HOME"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-1">
                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        address
                                                    )
                                                }
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-black"
                                                title="Edit"
                                            >
                                                <FiEdit3 />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    removeAddress(
                                                        address._id
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    address._id
                                                }
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-5 border-t border-gray-100 pt-4 text-sm leading-6 text-gray-600">
                                        {
                                            address.addressLine1
                                        }

                                        {address.addressLine2 && (
                                            <>
                                                <br />
                                                {
                                                    address.addressLine2
                                                }
                                            </>
                                        )}

                                        <br />

                                        {
                                            address.city
                                        }
                                        ,{" "}
                                        {
                                            address.state
                                        }{" "}
                                        -{" "}
                                        {
                                            address.postalCode
                                        }

                                        <br />

                                        {
                                            address.country
                                        }

                                        <br />

                                        <span className="font-medium text-black">
                                            {
                                                address.phone
                                            }
                                        </span>
                                    </div>

                                    {/* Default */}
                                    {address.isDefault ? (
                                        <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                                            <FiCheckCircle />
                                            Default Address
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleSetDefault(
                                                    address._id
                                                )
                                            }
                                            disabled={
                                                defaultId ===
                                                address._id
                                            }
                                            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-red-600 disabled:opacity-50"
                                        >
                                            <FiStar />
                                            {defaultId ===
                                            address._id
                                                ? "Updating..."
                                                : "Set as default"}
                                        </button>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}