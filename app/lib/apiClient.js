import axios from "axios";
import { toast } from "sonner";

import { getAccessToken } from "@/app/lib/token";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,

    headers: {
        "Content-Type": "application/json",
    },

    withCredentials: true,
});

/*
 * Add access token.
 */
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = getAccessToken();

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/*
 * Handle API errors.
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Something went wrong";

        toast.error(message);

        return Promise.reject(error);
    }
);

export default apiClient;
