import apiClient from "@/app/lib/apiClient";

export const cartApi = {
  getCart(cartId = null) {
    const query = cartId
      ? `?cartId=${encodeURIComponent(
        cartId
      )}`
      : "";

    return apiClient.get(
      `/cart${query}`
    );
  },

  addItem({
    productId,
    quantity = 1,
  }) {
    return apiClient.post(
      "/cart/items",
      {
        productId,
        quantity,
      }
    );
  },

  updateItem(
    productId,
    quantity
  ) {
    return apiClient.patch(
      `/cart/items/${productId}`,
      {
        quantity,
      }
    );
  },

  removeItem(productId) {
    return apiClient.delete(
      `/cart/items/${productId}`
    );
  },

  clearCart() {
    return apiClient.delete(
      "/cart"
    );
  },

  mergeCart(cartId) {
    return apiClient.post(
      "/cart/merge",
      {
        cartId,
      }
    );
  },
};

export default cartApi;