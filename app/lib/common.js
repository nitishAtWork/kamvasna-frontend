const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;

const FETCH_OPTIONS = {
    cache: "no-cache",
};

export async function getSiteInfo() {
    const res = await fetch(`${BASE_URL_API}/website`, FETCH_OPTIONS);
    const data = await res.json();
    return data?.data || {};
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL_API}/products/frontend`, FETCH_OPTIONS);
  const data = await res.json();
  return data?.data?.products || [];
}
