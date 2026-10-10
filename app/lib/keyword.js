import { apiRequest } from "@/app/lib/api";

export const keywordApi = {
    getKeywords(params = {}) {
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
            `/keywords/frontend${query ? `?${query}` : ""}`
        );
    },

    getKeyword(slug) {
        return apiRequest(`/keywords/${slug}`);
    },
};
