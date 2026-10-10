import { apiRequest } from "@/app/lib/api";

export const locationApi = {
    getCountry() {
        return apiRequest(`/countries/frontend`);
    }
};
