"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import cartApi from "../lib/cart";
import { useAuth } from "@/app/context/AuthContext";

const CartContext =
  createContext(null);

export function CartProvider({
  children,
}) {
  const {
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [cart, setCart] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    updatingProductId,
    setUpdatingProductId,
  ] = useState(null);

  const [clearing, setClearing] =
    useState(false);

  const items =
    cart?.items || [];

  const totals =
    cart?.totals || {
      subtotal: 0,
      itemCount: 0,
      total: 0,
    };

  const loadCart = async () => {
    try {
        setLoading(true);

        const response =
            await cartApi.getCart();

        console.log(
            "========== LOAD CART =========="
        );

        console.log(
            "CART RESPONSE:",
            response.data
        );

        const data =
            response?.data?.data ||
            response?.data;

        console.log(
            "CART DATA:",
            data
        );

        console.log(
            "CART ID:",
            data?.cart?.cartId
        );

        if (data?.cart) {
            setCart({
                ...data.cart,
                totals: data.totals,
            });
        } else {
            setCart(null);
        }
    } catch (error) {
        console.error(
            "Failed to load cart:",
            error
        );

        setCart(null);
    } finally {
        setLoading(false);
    }
};

  const addToCart = async (
    productId,
    quantity = 1
  ) => {
    try {
      setUpdatingProductId(
        productId
      );

      const response =
        await cartApi.addItem({
          productId,
          quantity,
        });

      const data =
        response?.data?.data ||
        response?.data;

      if (data?.cart) {
        setCart({
          ...data.cart,
          totals:
            data.totals,
        });
      }

      return response;
    } finally {
      setUpdatingProductId(
        null
      );
    }
  };

  const updateQuantity =
    async (
      productId,
      quantity
    ) => {
      try {
        setUpdatingProductId(
          productId
        );

        const response =
          await cartApi.updateItem(
            productId,
            quantity
          );

        const data =
          response?.data?.data ||
          response?.data;

        if (data?.cart) {
          setCart({
            ...data.cart,
            totals:
              data.totals,
          });
        }

        return response;
      } finally {
        setUpdatingProductId(
          null
        );
      }
    };

  const removeFromCart =
    async (productId) => {
      try {
        setUpdatingProductId(
          productId
        );

        const response =
          await cartApi.removeItem(
            productId
          );

        const data =
          response?.data?.data ||
          response?.data;

        if (data?.cart) {
          setCart({
            ...data.cart,
            totals:
              data.totals,
          });
        }

        return response;
      } finally {
        setUpdatingProductId(
          null
        );
      }
    };

  const clearCart =
    async () => {
      try {
        setClearing(true);

        const response =
          await cartApi.clearCart();

        const data =
          response?.data?.data ||
          response?.data;

        if (data?.cart) {
          setCart({
            ...data.cart,
            totals:
              data.totals,
          });
        } else {
          setCart(null);
        }

        return response;
      } finally {
        setClearing(false);
      }
    };

  const mergeCart = async (cartId) => {
    try {
      const response =
        await cartApi.mergeCart(
          cartId
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
    } catch (error) {
      console.error(
        "Failed to merge cart:",
        error
      );

      throw error;
    }
  };

  /*
   * Wait until AuthContext knows
   * whether the user is authenticated.
   */
  useEffect(() => {
    if (authLoading) {
      return;
    }

    loadCart();
  }, [
    authLoading,
    isAuthenticated,
  ]);

  return (
    <CartContext.Provider
      value={{
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