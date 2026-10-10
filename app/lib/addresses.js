import { apiRequest } from "@/app/lib/api";

export const addressApi = {
    getAll() {
        return apiRequest("/addresses", {
            method: "GET",
        });
    },

    getById(addressId) {
        return apiRequest(`/addresses/${addressId}`, {
            method: "GET",
        });
    },

    create(data) {
        return apiRequest("/addresses", {
            method: "POST",
            body: data,
        });
    },

    update(addressId, data) {
        return apiRequest(`/addresses/${addressId}`, {
            method: "PATCH",
            body: data,
        });
    },

    setDefault(addressId) {
        return apiRequest(
            `/addresses/${addressId}/default`,
            {
                method: "PATCH",
            }
        );
    },

    remove(addressId) {
        return apiRequest(
            `/addresses/${addressId}`,
            {
                method: "DELETE",
            }
        );
    },
};