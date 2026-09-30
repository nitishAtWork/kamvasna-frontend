import { apiRequest } from "@/app/lib/api";

export const productApi = {
  getProducts(params = {}) {
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
      `/products/frontend${query ? `?${query}` : ""}`
    );
  },

  getProduct(slug) {
    return apiRequest(`/products/${slug}`);
  },
};
