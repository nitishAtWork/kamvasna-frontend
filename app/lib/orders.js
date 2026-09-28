import { apiRequest } from "./api";

export const orderApi = {
  create(data) {
    return apiRequest("/orders", {
      method: "POST",
      body: data,
    });
  },

  getOrders(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        searchParams.append(key, value);
      }
    });

    const query = searchParams.toString();

    return apiRequest(
      `/orders${query ? `?${query}` : ""}`
    );
  },

  getOrder(id) {
    return apiRequest(`/orders/${id}`);
  },

  cancelOrder(id) {
    return apiRequest(`/orders/${id}/cancel`, {
      method: "POST",
    });
  },
};