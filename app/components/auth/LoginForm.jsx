"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import AuthLayout from "@/app/components/auth/AuthLayout";
import Input from "@/app/components/common/Input";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

export default function LoginForm() {
    const router = useRouter();
    const {
        login,
    } = useAuth();

    const {
        mergeCart,
        loadCart,
        cart,
    } = useCart();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    function handleChange(event) {
        const {
            name,
            value,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }
    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            // console.log(
            //     "========== BEFORE LOGIN =========="
            // );

            // console.log(
            //     "CART:",
            //     cart
            // );

            // console.log(
            //     "GUEST CART ID:",
            //     cart?.cartId
            // );

            const guestCartId =
                cart?.cartId || null;

            await login(form);

            // console.log(
            //     "========== AFTER LOGIN =========="
            // );

            // console.log(
            //     "GUEST CART ID TO MERGE:",
            //     guestCartId
            // );

            if (guestCartId) {
                await mergeCart(
                    guestCartId
                );
            }

            await loadCart();

            router.push("/");
        } catch (error) {
            console.error(error);

            setError(
                error.message ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            description="Login to continue to your account."
            footer={
                <>
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-black hover:underline"
                    >
                        Create account
                    </Link>
                </>
            }
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                />

                <div>
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    <div className="mt-2 text-right">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-gray-600 hover:text-black hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="h-12 w-full rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>
            </form>
        </AuthLayout>
    );
}