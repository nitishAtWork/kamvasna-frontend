"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { cartApi } from "@/app/lib/cart";
import {
    getGuestCartId,
    setGuestCartId,
    clearGuestCartId,
} from "@/app/lib/cartStorage";

import { useAuth } from "@/app/context/AuthContext";

const CartContext =
    createContext(null);

export function CartProvider({
    children,
}) {
    const {
        user,
        loading: authLoading,
        isAuthenticated,
    } = useAuth();

    const [cart, setCart] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    /*
     * Load cart.
     */
    async function loadCart() {
        /*
         * Don't load anything until
         * authentication state is known.
         */
        if (authLoading) {
            return;
        }

        try {
            setLoading(true);

            /*
             * Logged-in user:
             *
             * Backend identifies cart
             * using authenticated userId.
             */
            if (isAuthenticated) {
                const response =
                    await cartApi.getCart();

                const currentCart =
                    response.data?.cart ||
                    response.data;

                setCart(currentCart);

                return;
            }

            /*
             * Guest user.
             */
            const guestCartId =
                getGuestCartId();

            const response =
                await cartApi.getCart(
                    guestCartId
                );

            const currentCart =
                response.data?.cart ||
                response.data;

            /*
             * Save guest cart ID.
             */
            if (
                currentCart?.cartId
            ) {
                setGuestCartId(
                    currentCart.cartId
                );
            }

            setCart(currentCart);
        } catch (error) {
            console.error(
                "Failed to load cart:",
                error
            );

            setCart(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!authLoading) {
            loadCart();
        }
    }, [
        authLoading,
        isAuthenticated,
    ]);

    /*
     * Add product.
     */
    async function addToCart(
        productId,
        quantity = 1
    ) {
        const response =
            await cartApi.addItem({
                productId,
                quantity,
            });

        const updatedCart =
            response.data?.cart ||
            response.data;

        /*
         * Save guest cart ID.
         */
        if (
            !isAuthenticated &&
            updatedCart?.cartId
        ) {
            setGuestCartId(
                updatedCart.cartId
            );
        }

        setCart(updatedCart);

        return response;
    }

    async function updateCartItem(
        itemId,
        quantity
    ) {
        const response =
            await cartApi.updateItem(
                itemId,
                {
                    quantity,
                }
            );

        const updatedCart =
            response.data?.cart ||
            response.data;

        setCart(updatedCart);

        return response;
    }

    async function removeFromCart(
        itemId
    ) {
        const response =
            await cartApi.removeItem(
                itemId
            );

        const updatedCart =
            response.data?.cart ||
            response.data;

        setCart(updatedCart);

        return response;
    }

    async function clearCart() {
        const response =
            await cartApi.clearCart();

        const updatedCart =
            response.data?.cart ||
            response.data;

        setCart(updatedCart);

        return response;
    }

    /*
     * Merge guest cart after login.
     */
    async function mergeCart() {
        const guestCartId =
            getGuestCartId();

        /*
         * Nothing to merge.
         */
        if (!guestCartId) {
            return loadCart();
        }

        const response =
            await cartApi.merge(
                guestCartId
            );

        const updatedCart =
            response.data?.cart ||
            response.data;

        setCart(updatedCart);

        /*
         * Guest cart is now merged.
         */
        clearGuestCartId();

        return response;
    }

    const itemCount =
        useMemo(() => {
            return (
                cart?.items?.reduce(
                    (total, item) =>
                        total +
                        Number(
                            item.quantity || 0
                        ),
                    0
                ) || 0
            );
        }, [cart]);

    const subtotal =
        useMemo(() => {
            return (
                cart?.items?.reduce(
                    (total, item) => {
                        const price =
                            Number(
                                item.price ??
                                item.product
                                    ?.price ??
                                0
                            );

                        return (
                            total +
                            price *
                            Number(
                                item.quantity ||
                                0
                            )
                        );
                    },
                    0
                ) || 0
            );
        }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                itemCount,
                subtotal,

                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart,

                mergeCart,
                refreshCart:
                    loadCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context =
        useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}







