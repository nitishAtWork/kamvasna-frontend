import { apiRequest } from "./api";

export const userApi = {
    getMe() {
        return apiRequest(
            "/users/me",
            {
                method: "GET",
            }
        );
    },

    updateProfile(data) {
        return apiRequest(
            "/users/me",
            {
                method: "PATCH",
                body: data,
            }
        );
    },
};