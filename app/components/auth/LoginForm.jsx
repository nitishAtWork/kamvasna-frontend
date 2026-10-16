"use client";
import {
    useEffect,
    useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { FiArrowLeft, FiCheck, FiMail } from "react-icons/fi";

import AuthLayout from "@/app/components/auth/AuthLayout";
import Input from "@/app/components/common/Input";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

import { authApi } from "@/app/lib/auth";

export default function LoginForm() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const redirectPath = searchParams.get("redirect");

    const getRedirectPath = () => {
        // Prevent external URL redirects
        if (
            redirectPath &&
            redirectPath.startsWith("/") &&
            !redirectPath.startsWith("//")
        ) {
            return redirectPath;
        }

        return "/";
    };

    const {
        login,
        loginWithOTP,
    } = useAuth();

    const {
        mergeCart,
        loadCart,
        cart,
    } = useCart();

    const [mode, setMode] = useState("otp");

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [otp, setOtp] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    const [loading, setLoading] = useState(false);

    const [sendingOTP, setSendingOTP] =
        useState(false);

    const [resendCooldown, setResendCooldown] =
        useState(0);

    useEffect(() => {
        if (resendCooldown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendCooldown((current) =>
                current > 0 ? current - 1 : 0
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);

    const [error, setError] = useState("");

    const [success, setSuccess] =
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

    function switchMode(newMode) {
        setMode(newMode);

        setError("");
        setSuccess("");
        setOtp("");
        setOtpSent(false);
    }

    /*
     * Password login
     */
    async function handlePasswordLogin() {
        const guestCartId =
            cart?.cartId || null;

        await login(form);

        if (guestCartId) {
            await mergeCart(guestCartId);
        }

        await loadCart();

        router.replace(getRedirectPath());
    }

    /*
     * Send OTP
     */
    async function handleSendOTP() {
        setError("");
        setSuccess("");

        if (!form.email.trim()) {
            toast.error(
                "Please enter your email address."
            );
            return;
        }

        if (resendCooldown > 0) {
            toast.info(
                `Please wait ${resendCooldown}s before requesting another OTP.`
            );
            return;
        }

        try {
            setSendingOTP(true);

            await authApi.sendLoginOTP({
                email: form.email.trim(),
            });

            setOtpSent(true);

            // Start 60 second cooldown
            setResendCooldown(60);

            toast.success(
                "OTP sent successfully!",
                {
                    description:
                        "Check your email for the 6-digit verification code.",
                }
            );
        } catch (error) {
            console.error(
                "Send login OTP failed:",
                error
            );

            toast.error(
                error.message ||
                "Unable to send OTP."
            );
        } finally {
            setSendingOTP(false);
        }
    }

    /*
     * OTP login
     */
    async function handleOTPLogin(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!form.email.trim()) {
            setError(
                "Please enter your email address."
            );
            return;
        }

        if (!otpSent) {
            await handleSendOTP();
            return;
        }

        if (otp.length !== 6) {
            setError(
                "Please enter the 6-digit OTP."
            );
            return;
        }

        try {
            setLoading(true);

            const guestCartId =
                cart?.cartId || null;

            await loginWithOTP({
                email: form.email.trim(),
                otp,
            });

            /*
             * Merge guest cart after successful OTP login
             */
            if (guestCartId) {
                await mergeCart(guestCartId);
            }

            await loadCart();

            router.replace(getRedirectPath());
        } catch (error) {
            console.error(
                "OTP login failed:",
                error
            );

            setError(
                error.message ||
                "Invalid or expired OTP."
            );
        } finally {
            setLoading(false);
        }
    }

    /*
     * Password login submit
     */
    async function handlePasswordSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        try {
            setLoading(true);

            await handlePasswordLogin();
        } catch (error) {
            console.error(
                "Login failed:",
                error
            );

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
            description={
                mode === "password"
                    ? "Login to continue to your account."
                    : "Login securely using a one-time password."
            }
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
            <div className="space-y-5">
                {/* Login mode switch */}
                <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1">
                    <button
                        type="button"
                        onClick={() =>
                            switchMode("otp")
                        }
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${mode === "otp"
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-500 hover:text-black"
                            }`}
                    >
                        Login with OTP
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            switchMode("password")
                        }
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${mode === "password"
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-500 hover:text-black"
                            }`}
                    >
                        Password
                    </button>
                </div>

                {error && (
                    <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-green-600">
                        {success}
                    </div>
                )}

                {mode === "password" ? (
                    /*
                     * PASSWORD LOGIN
                     */
                    <form
                        onSubmit={
                            handlePasswordSubmit
                        }
                        className="space-y-5"
                    >
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={
                                handleChange
                            }
                            placeholder="you@example.com"
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={
                                    form.password
                                }
                                onChange={
                                    handleChange
                                }
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
                ) : (
                    /*
                     * OTP LOGIN
                     */
                    <form
                        onSubmit={
                            handleOTPLogin
                        }
                        className="space-y-5"
                    >
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={
                                handleChange
                            }
                            placeholder="you@example.com"
                            required
                        />

                        {!otpSent ? (
                            <button
                                type="button"
                                onClick={
                                    handleSendOTP
                                }
                                disabled={
                                    sendingOTP
                                }
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FiMail
                                    size={18}
                                />

                                {sendingOTP
                                    ? "Sending OTP..."
                                    : "Send OTP"}
                            </button>
                        ) : (
                            <>
                                <div>
                                    <Input
                                        label="Enter OTP"
                                        type="text"
                                        name="otp"
                                        value={otp}
                                        onChange={(
                                            event
                                        ) =>
                                            setOtp(
                                                event
                                                    .target
                                                    .value
                                                    .replace(
                                                        /\D/g,
                                                        ""
                                                    )
                                                    .slice(
                                                        0,
                                                        6
                                                    )
                                            )
                                        }
                                        placeholder="Enter 6-digit OTP"
                                        inputMode="numeric"
                                        maxLength={
                                            6
                                        }
                                        required
                                    />

                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            OTP sent to{" "}
                                            {form.email}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={handleSendOTP}
                                            disabled={
                                                sendingOTP ||
                                                resendCooldown > 0
                                            }
                                            className="text-xs font-medium text-black transition hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
                                        >
                                            {sendingOTP
                                                ? "Sending..."
                                                : resendCooldown > 0
                                                    ? `Resend OTP in ${resendCooldown}s`
                                                    : "Resend OTP"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        otp.length !==
                                        6
                                    }
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-black font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <FiCheck
                                        size={18}
                                    />

                                    {loading
                                        ? "Verifying..."
                                        : "Verify & Login"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setOtpSent(
                                            false
                                        );
                                        setOtp("");
                                        setError(
                                            ""
                                        );
                                        setSuccess(
                                            ""
                                        );
                                    }}
                                    className="flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-black"
                                >
                                    <FiArrowLeft
                                        size={15}
                                    />
                                    Change email
                                </button>
                            </>
                        )}
                    </form>
                )}
            </div>
        </AuthLayout>
    );
}