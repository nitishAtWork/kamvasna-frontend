"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getGuestCartId,
  setGuestCartId,
  clearGuestCartId,
} from "@/app/lib/cartStorage";

import cartService from "@/app/services/cartService";
import { cartApi } from "@/app/lib/cart";
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

  const [updating, setUpdating] =
    useState(false);

  const [updatingProductId, setUpdatingProductId] =
    useState(null);

  const [clearing, setClearing] =
    useState(false);

  const items = cart?.items || [];

  const totals = cart?.totals || {
    subtotal: 0,
    itemCount: 0,
    total: 0,
  };

  /*
   * Load current cart.
   *
   * Backend decides whether this is:
   * - guest cart
   * - authenticated user cart
   */
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

  /*
   * Add product
   */
  const addToCart = async (
    productId,
    quantity = 1
  ) => {
    try {
      setUpdatingProductId(productId);

      const response =
        await cartService.addItem({
          productId,
          quantity,
        });

      const data =
        response?.data?.data ||
        response?.data;

      if (data?.cart) {
        setCart({
          ...data.cart,
          totals: data.totals,
        });
      }

      return response;
    } finally {
      setUpdatingProductId(null);
    }
  };

  /*
   * Update quantity
   */
  const updateQuantity = async (
    productId,
    quantity
  ) => {
    try {
      setUpdatingProductId(productId);

      const response =
        await cartService.updateItem(
          productId,
          quantity
        );

      const data =
        response?.data?.data ||
        response?.data;

      if (data?.cart) {
        setCart({
          ...data.cart,
          totals: data.totals,
        });
      }

      return response;
    } finally {
      setUpdatingProductId(null);
    }
  };

  /*
   * Remove product
   */
  const removeFromCart = async (
    productId
  ) => {
    try {
      setUpdatingProductId(productId);

      const response =
        await cartService.removeItem(
          productId
        );

      const data =
        response?.data?.data ||
        response?.data;

      if (data?.cart) {
        setCart({
          ...data.cart,
          totals: data.totals,
        });
      }

      return response;
    } finally {
      setUpdatingProductId(null);
    }
  };

  /*
   * Clear cart
   */
  const clearCart = async () => {
    try {
      setUpdating(true);

      const response =
        await cartService.clearCart();

      const data =
        response?.data?.data ||
        response?.data;

      if (data?.cart) {
        setCart({
          ...data.cart,
          totals: data.totals,
        });
      } else {
        setCart(null);
      }

      return response;
    } finally {
      setUpdating(false);
    }
  };

  /*
   * Guest → authenticated cart
   */
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

  /*
   * Initial cart load
   */
  useEffect(() => {
    loadCart();
  }, []);

  const value = {
    cart,
    items,
    totals,

    loading,

    updatingProductId,
    clearing,

    loadCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    mergeCart,
  };

  return (
    <CartContext.Provider
      value={value}
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