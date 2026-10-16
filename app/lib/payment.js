import { apiRequest } from "./api";

export const paymentApi = {
    getUroPayStatus(orderId) {
        return apiRequest(
            `/payments/uropay/${encodeURIComponent(orderId)}/status`
        );
    },
};