import { redirect } from "next/navigation";
import Detail from "@/app/components/common/Detail";
const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;
import { slugApi } from "@/app/lib/slug";

const getMetaApiByType = (type, slug, slugtwo) => {
    switch (type) {

        case "natureOfBusiness":
            return `/nature-of-business/frontend/${slug}/${slugtwo}`;

        case "country":
        case "state":
        case "city":
            return `/keyword-in-city/frontend/${slug}/${slugtwo}`;

        default:
            return null;
    }
};

export async function generateMetadata({ params }) {
    const { slug, slugtwo } = await params;
    const allSlugs = await slugApi.getSlug();

    const matchedSlug = allSlugs?.data?.find(s => s.slug === slug);

    const matchedSlugTwo = allSlugs?.data?.find(s => s.slug === slugtwo);

    if (!matchedSlug || !matchedSlugTwo) {
        return redirect("/");
    }

    const apiPath = getMetaApiByType(matchedSlug.type, slug, slugtwo);

    if (!apiPath) {
        return {};
    }

    try {
        const res = await fetch(
            `${BASE_URL_API}${apiPath}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("Meta fetch failed");
        }

        const json = await res.json();
        const data = json?.data || {};

        return {
            title:
                data.metaTitle ||
                data.seoTitle ||
                data.name ||
                slug.replace(/-/g, " "),

            description:
                data.metaDescription ||
                data.shortDescription ||
                "",

            keywords: data.metaKeywords || "",

        };
    } catch (error) {
        console.error("Metadata error:", error);
        return redirect("/");
    }
}


const Page = async ({ params }) => {
    const { slug, slugtwo } = await params;
    const allSlugs = await slugApi.getSlug();

    const matchedSlug = allSlugs?.data?.find(s => s.slug === slug);

    const matchedSlugTwo = allSlugs?.data?.find(s => s.slug === slugtwo);

    if (!matchedSlug || !matchedSlugTwo) {
        return (
            <>
                <div className="container py-20 text-center text-xl font-semibold">
                    404 – Page Not Found
                </div>
            </>
        );
    }

    const renderSection = () => {
        switch (matchedSlug.type) {
            case "natureOfBusiness":
                return <>
                    <Detail subdomain={slug} apiUrl={`/nature-of-business/frontend/${slug}/${slugtwo}`} />
                </>;

            case "country":
            case "state":
            case "city":
                return <>
                    <Detail subdomain={slug} apiUrl={`/keyword-in-city/frontend/${slug}/${slugtwo}`} />
                </>;

            default:
                return <div>Unsupported page type</div>;
        }
    };

    return (
        <>
            {renderSection()}
        </>
    );
};

export default Page;
