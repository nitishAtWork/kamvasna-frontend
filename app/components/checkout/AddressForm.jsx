"use client";

import { useEffect, useState } from "react";

const initialAddress = {
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
};

export default function AddressForm({
    value,
    onChange,
}) {
    const [form, setForm] =
        useState(
            value || initialAddress
        );

    const [errors, setErrors] =
        useState({});

    useEffect(() => {
        if (value) {
            setForm(value);
        }
    }, [value]);

    const handleChange =
        (event) => {
            const {
                name,
                value,
            } = event.target;

            const nextForm = {
                ...form,
                [name]: value,
            };

            setForm(nextForm);

            onChange?.(nextForm);

            if (errors[name]) {
                setErrors(
                    (current) => ({
                        ...current,
                        [name]: "",
                    })
                );
            }
        };

    const validate = () => {
        const nextErrors = {};

        if (!form.fullName.trim()) {
            nextErrors.fullName =
                "Full name is required.";
        }

        if (!form.phone.trim()) {
            nextErrors.phone =
                "Phone number is required.";
        }

        if (
            !form.addressLine1.trim()
        ) {
            nextErrors.addressLine1 =
                "Address is required.";
        }

        if (!form.city.trim()) {
            nextErrors.city =
                "City is required.";
        }

        if (!form.state.trim()) {
            nextErrors.state =
                "State is required.";
        }

        if (!form.postalCode.trim()) {
            nextErrors.postalCode =
                "Postal code is required.";
        }

        setErrors(nextErrors);

        return (
            Object.keys(nextErrors)
                .length === 0
        );
    };

    /*
     * Expose validation through
     * the browser event for now.
     */
    useEffect(() => {
        const handler = () => {
            validate();
        };

        window.addEventListener(
            "checkout:validate-address",
            handler
        );

        return () => {
            window.removeEventListener(
                "checkout:validate-address",
                handler
            );
        };
    });

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <div>
                <h2 className="text-lg font-bold text-gray-900">
                    Delivery Address
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Enter the address where your
                    order should be delivered.
                </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={
                        handleChange
                    }
                    error={
                        errors.fullName
                    }
                    required
                />

                <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={
                        handleChange
                    }
                    error={errors.phone}
                    required
                />

                <div className="sm:col-span-2">
                    <Field
                        label="Address Line 1"
                        name="addressLine1"
                        value={
                            form.addressLine1
                        }
                        onChange={
                            handleChange
                        }
                        error={
                            errors.addressLine1
                        }
                        required
                    />
                </div>

                <div className="sm:col-span-2">
                    <Field
                        label="Address Line 2"
                        name="addressLine2"
                        value={
                            form.addressLine2
                        }
                        onChange={
                            handleChange
                        }
                    />
                </div>

                <Field
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={
                        handleChange
                    }
                    error={errors.city}
                    required
                />

                <Field
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={
                        handleChange
                    }
                    error={errors.state}
                    required
                />

                <Field
                    label="Postal Code"
                    name="postalCode"
                    value={
                        form.postalCode
                    }
                    onChange={
                        handleChange
                    }
                    error={
                        errors.postalCode
                    }
                    required
                />

                <Field
                    label="Country"
                    name="country"
                    value={form.country}
                    onChange={
                        handleChange
                    }
                    disabled
                />
            </div>
        </section>
    );
}

function Field({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    disabled = false,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`h-11 w-full rounded-lg border px-3 text-sm text-gray-900 outline-none transition ${
                    error
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-300 focus:border-black"
                } disabled:bg-gray-100`}
            />

            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}