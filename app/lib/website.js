import { apiRequest } from "@/app/lib/api";

export const websiteApi = {
    getWebsite() {
        return apiRequest(`/website`);
    }
};
