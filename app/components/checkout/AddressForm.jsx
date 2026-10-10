"use client";

export default function AddressForm({
    value,
    onChange,
    onSubmit,
    saving = false,
}) {
    const form = value || {
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
    };

    return (
        <form onSubmit={onSubmit}>
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
                    {/* Address Label */}
                    <div>
                        <label
                            htmlFor="label"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Address Type
                        </label>

                        <select
                            id="label"
                            name="label"
                            value={form.label || "HOME"}
                            onChange={onChange}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-black"
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
                    <Field
                        label="Full Name"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                        required
                    />

                    {/* Phone */}
                    <Field
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={onChange}
                        required
                    />

                    {/* Address Line 1 */}
                    <div className="sm:col-span-2">
                        <Field
                            label="Address Line 1"
                            name="addressLine1"
                            value={form.addressLine1}
                            onChange={onChange}
                            required
                        />
                    </div>

                    {/* Address Line 2 */}
                    <div className="sm:col-span-2">
                        <Field
                            label="Address Line 2"
                            name="addressLine2"
                            value={form.addressLine2}
                            onChange={onChange}
                        />
                    </div>

                    {/* City */}
                    <Field
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={onChange}
                        required
                    />

                    {/* State */}
                    <Field
                        label="State"
                        name="state"
                        value={form.state}
                        onChange={onChange}
                        required
                    />

                    {/* Postal Code */}
                    <Field
                        label="Postal Code"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={onChange}
                        required
                    />

                    {/* Country */}
                    <Field
                        label="Country"
                        name="country"
                        value={form.country}
                        onChange={onChange}
                        disabled
                    />

                    {/* Default Address */}
                    <div className="sm:col-span-2">
                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={
                                    Boolean(
                                        form.isDefault
                                    )
                                }
                                onChange={onChange}
                                className="h-4 w-4 rounded border-gray-300 accent-black"
                            />

                            <span className="text-sm text-gray-700">
                                Make this my default address
                            </span>
                        </label>
                    </div>
                </div>

                {/* Save Button */}
                {onSubmit && (
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Address"}
                        </button>
                    </div>
                )}
            </section>
        </form>
    );
}

function Field({
    label,
    name,
    type = "text",
    value,
    onChange,
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
                value={value ?? ""}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-black disabled:bg-gray-100"
            />
        </div>
    );
}