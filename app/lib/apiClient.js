import axios from "axios";

import {
    getAccessToken,
} from "@/app/lib/token";

const apiClient = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_URL,

    headers: {
        "Content-Type":
            "application/json",
    },

    withCredentials: true,
});

/*
 * Add access token.
 */
apiClient.interceptors.request.use(
    (config) => {
        if (
            typeof window !==
            "undefined"
        ) {
            const token =
                getAccessToken();

            if (token) {
                config.headers =
                    config.headers || {};

                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) =>
        Promise.reject(error)
);

/*
 * Don't redirect from here.
 *
 * AuthContext is responsible for
 * authentication / refresh / logout.
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;