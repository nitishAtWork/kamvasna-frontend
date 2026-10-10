const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch(apiEndpoint) {
  const res = await fetch(`${BASE_URL_API}${apiEndpoint}`, {
    cache: "no-store", // same as client (always fresh)
  });

  if (!res.ok) {
    throw new Error("API Fetch Error");
  }

  const result = await res.json();
  return result?.data || [];
}
