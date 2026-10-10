import { redirect } from "next/navigation";
import Detail from "../components/common/Detail";
const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;
import { slugApi } from "../lib/slug";
import PdList from "../components/common/PdList";

const getMetaApiByType = (type, slug) => {
    switch (type) {
        case "keyword":
            return `/keywords/${slug}`;

        case "country":
        case "state":
        case "city":
            return `/our-presence/frontend/${slug}`;

        default:
            return null;
    }
};

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const allSlugs = await slugApi.getSlug();

    const matchedSlug = allSlugs?.data?.find(s => s.slug === slug);

    if (!matchedSlug) {
        return redirect("/");
    }

    const apiPath = getMetaApiByType(matchedSlug.type, slug);

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
    const { slug } = await params;
    const allSlugs = await slugApi.getSlug();

    const matchedSlug = allSlugs?.data?.find(s => s.slug === slug);

    if (!matchedSlug) {
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
            case "keyword":
                return <>
                    <Detail apiUrl={`/keywords/${slug}`} />
                </>;

            case "natureOfBusiness":
                return <>
                <PdList  subdomain={slug} />
                </>;

            case "country":
            case "state":
            case "city":
                return <>
                    <Detail subdomain={slug} apiUrl={`/our-presence/frontend/${slug}`} />
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
