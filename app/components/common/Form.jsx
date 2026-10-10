"use client";

import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Form = ({ siteInfo }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccess("");
        setError("");

        if (!formData.name.trim()) {
            setError("Please enter your name.");
            toast.error("Please enter your name.");
            return;
        }

        if (!formData.email.trim()) {
            setError("Please enter your email.");
            toast.error("Please enter your email.");
            return;
        }

        if (!formData.phone.trim()) {
            setError("Please enter your phone number.");
            toast.error("Please enter your phone number.");
            return;
        }

        if (!formData.subject) {
            setError("Please select what you need help with.");
            toast.error("Please select what you need help with.");
            return;
        }

        // if (!formData.message.trim()) {
        //     setError("Please enter your message.");
        //     return;
        // }

        try {
            setLoading(true);

            const enquiryData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                subject: formData.subject,
                queryFor: formData.subject,
                message: formData.message.trim(),
                currentUrl: window.location.href,
            };

            // 1. Submit to the primary enquiry API
            const response = await fetch(`${API_URL}/enquiries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(enquiryData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message || "Failed to submit enquiry."
                );
            }

            // 2. Submit the same data to the lead API
            try {
                await axios.post(
                    "https://api-lead.instavyapar.co.in/api/inquery/create",
                    {
                        ...enquiryData,
                        userId: siteInfo?.apiId,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
            } catch (leadError) {
                // Primary enquiry already succeeded.
                console.error(
                    "Enquiry saved, but lead API submission failed:",
                    leadError?.response?.data || leadError.message
                );
            }

            setSuccess(
                result?.message ||
                "Your enquiry has been submitted successfully."
            );

            toast.success(
                result?.message ||
                "Your enquiry has been submitted successfully."
            );

            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (err) {
            console.error("Enquiry submission error:", err);

            setError(
                err?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* Success */}
            {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {success}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            {/* Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name *"
                        autoComplete="name"
                        disabled={loading}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>

                <div>
                    <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com *"
                        autoComplete="email"
                        disabled={loading}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>
            </div>

            {/* Phone */}
            <div>
                <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number *"
                    autoComplete="tel"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>

            {/* Subject */}
            <div>
                <select
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-700 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <option value="" disabled>
                        What can we help you with? *
                    </option>

                    <option value="order">
                        Order Assistance
                    </option>

                    <option value="product">
                        Product Information
                    </option>

                    <option value="delivery">
                        Delivery Question
                    </option>

                    <option value="return">
                        Return / Refund
                    </option>

                    <option value="other">
                        Something Else
                    </option>
                </select>
            </div>

            {/* Message */}
            <div>
                <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    disabled={loading}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Sending..." : "Send Message"}

                {!loading && (
                    <FiSend className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
            </button>
        </form>
    );
};

export default Form;