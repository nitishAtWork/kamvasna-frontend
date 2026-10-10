import { apiRequest } from "@/app/lib/api";

export const industryApi = {
    getIndustry() {
        return apiRequest(`/nature-of-business/frontend`);
    }
};
