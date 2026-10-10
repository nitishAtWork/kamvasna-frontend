import { slugApi } from "../lib/slug";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Disable Next.js route caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

const staticLinks = [
    { name: "Home", slug: "" },
    { name: "Company Profile", slug: "about" },
    { name: "Our Products", slug: "products" },
    { name: "Contact Us", slug: "contact" },
    { name: "Market Place", slug: "marketplace" },
    { name: "Shipping Information", slug: "shipping" },
    { name: "Returns & Refunds", slug: "returns" },
    { name: "Privacy Policy", slug: "privacy-policy" },
    { name: "Terms & Conditions", slug: "terms" },
];

// Escape XML special characters
const escapeXml = (value) =>
    String(value).replace(/[<>&'"]/g, (char) => {
        const entities = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            "'": "&apos;",
            '"': "&quot;",
        };

        return entities[char];
    });

export async function GET() {
    let dynamicSlugs = [];

    try {
        const response = await slugApi.getSitemapSlug();

        dynamicSlugs = Array.isArray(response?.data)
            ? response.data
            : [];
    } catch (error) {
        console.error("Failed to fetch sitemap slugs:", error);
    }

    // Combine static and dynamic links
    const allLinks = [
        ...staticLinks,
        ...dynamicSlugs
            .filter((item) => item?.slug)
            .map((item) => ({
                name: item.name || item.slug,
                slug: item.slug,
            })),
    ];

    // Remove duplicate URLs and normalize slugs
    const uniqueLinks = [
        ...new Map(
            allLinks.map((item) => [
                item.slug.replace(/^\/+|\/+$/g, ""),
                item,
            ])
        ).values(),
    ];

    const generatedAt = new Date().toISOString();

    const xmlUrls = uniqueLinks
        .map((item) => {
            const slug = item.slug.replace(/^\/+|\/+$/g, "");

            const url = slug
                ? `${BASE_URL.replace(/\/+$/, "")}/${slug}`
                : BASE_URL.replace(/\/+$/, "");

            return `
    <url>
        <loc>${escapeXml(url)}</loc>
        <lastmod>${generatedAt}</lastmod>
        <changefreq>${slug ? "daily" : "weekly"}</changefreq>
        <priority>${slug ? "0.8" : "1.0"}</priority>
    </url>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Sitemap Total URLs: ${uniqueLinks.length} (Site Promoted By - instavyapar.com) -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlUrls}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control":
                "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
}