import { apiRequest } from "@/app/lib/api";

export const cartApi = {
    getCart(cartId) {
        const query = cartId
            ? `?cartId=${encodeURIComponent(
                  cartId
              )}`
            : "";

        return apiRequest(
            `/cart${query}`
        );
    },

    addItem(data) {
        return apiRequest(
            "/cart/items",
            {
                method: "POST",
                body: data,
            }
        );
    },

    updateItem(
        itemId,
        data
    ) {
        return apiRequest(
            `/cart/items/${itemId}`,
            {
                method: "PATCH",
                body: data,
            }
        );
    },

    removeItem(itemId) {
        return apiRequest(
            `/cart/items/${itemId}`,
            {
                method: "DELETE",
            }
        );
    },

    clearCart() {
        return apiRequest(
            "/cart",
            {
                method: "DELETE",
            }
        );
    },

    merge(cartId) {
        return apiRequest(
            "/cart/merge",
            {
                method: "POST",
                body: {
                    cartId,
                },
            }
        );
    },
    
};