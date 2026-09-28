import apiClient from "@/app/lib/apiClient";

const cartService = {
    getCart() {
        return apiClient.get("/cart");
    },

    addItem(data) {
        return apiClient.post(
            "/cart/items",
            data
        );
    },

    updateItem(productId, quantity) {
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
        return apiClient.delete("/cart");
    },

    mergeCart() {
        return apiClient.post("/cart/merge");
    },
};

export default cartService;