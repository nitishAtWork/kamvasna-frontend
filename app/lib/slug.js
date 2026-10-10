import { apiRequest } from "@/app/lib/api";

export const slugApi = {
    getSlug() {
        return apiRequest(`/slugs`);
    },
    getSitemapSlug() {
        return apiRequest(`/slugs/sitemap`);
    }
};
