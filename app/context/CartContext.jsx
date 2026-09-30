"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import cartApi from "../lib/cart";
import { useAuth } from "@/app/context/AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const {
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const [
    updatingProductId,
    setUpdatingProductId,
  ] = useState(null);

  const [clearing, setClearing] = useState(false);

  const items = cart?.items || [];

  const totals = cart?.totals || {
    subtotal: 0,
    itemCount: 0,
    total: 0,
  };

  const loadCart = async () => {
    try {
      setLoading(true);

      const response = await cartApi.getCart();

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
      setUpdatingProductId(productId);

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
          totals: data.totals,
        });
      }

      toast.success("Product added to cart");

      return response;
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to add product to cart"
      );

      throw error;
    } finally {
      setUpdatingProductId(null);
    }
  };

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    try {
      setUpdatingProductId(productId);

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
          totals: data.totals,
        });
      }

      toast.success("Cart updated");

      return response;
    } catch (error) {
      console.error(
        "Failed to update cart:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update cart"
      );

      throw error;
    } finally {
      setUpdatingProductId(null);
    }
  };

  const removeFromCart = async (
    productId
  ) => {
    try {
      setUpdatingProductId(productId);

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
          totals: data.totals,
        });
      }

      toast.success("Product removed from cart");

      return response;
    } catch (error) {
      console.error(
        "Failed to remove product from cart:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to remove product from cart"
      );

      throw error;
    } finally {
      setUpdatingProductId(null);
    }
  };

  const clearCart = async () => {
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
          totals: data.totals,
        });
      } else {
        setCart(null);
      }

      toast.success("Cart cleared");

      return response;
    } catch (error) {
      console.error(
        "Failed to clear cart:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to clear cart"
      );

      throw error;
    } finally {
      setClearing(false);
    }
  };

  const mergeCart = async (cartId) => {
    try {
      const response =
        await cartApi.mergeCart(cartId);

      const data =
        response?.data?.data ||
        response?.data;

      if (data?.cart) {
        setCart({
          ...data.cart,
          totals: data.totals,
        });
      }

      // Usually better not to show this toast
      // during automatic login/cart merging.
      return response;
    } catch (error) {
      console.error(
        "Failed to merge cart:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to merge cart"
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