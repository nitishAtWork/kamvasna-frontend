import {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
} from "@/app/lib/token";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL;

/*
 * Shared refresh promise.
 *
 * If multiple requests need a refresh at
 * the same time, only ONE /auth/refresh
 * request will be sent.
 */
let refreshPromise = null;

async function refreshAccessToken() {
    /*
     * A refresh is already running.
     *
     * Reuse the same promise instead of
     * sending another refresh request.
     */
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = fetch(
        `${API_URL}/auth/refresh`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type":
                    "application/json",
            },
        }
    )
        .then(async (response) => {
            const result =
                await response.json();

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                        "Session expired."
                );
            }

            const token =
                result.data?.accessToken;

            if (!token) {
                throw new Error(
                    "Access token was not returned."
                );
            }

            setAccessToken(token);

            return token;
        })
        .finally(() => {
            /*
             * Allow another refresh after
             * this one has completed.
             */
            refreshPromise = null;
        });

    return refreshPromise;
}

/*
 * Public refresh function.
 *
 * AuthContext should use this through
 * apiRequest("/auth/refresh").
 */
async function handleRefreshRequest() {
    const token =
        await refreshAccessToken();

    return {
        success: true,
        data: {
            accessToken: token,
        },
    };
}

async function makeRequest(
    endpoint,
    options = {}
) {
    const {
        method = "GET",
        body,
        headers = {},
        ...rest
    } = options;

    const token =
        getAccessToken();

    const requestHeaders = {
        ...headers,
    };

    if (token) {
        requestHeaders.Authorization =
            `Bearer ${token}`;
    }

    const config = {
        method,
        credentials: "include",
        headers: requestHeaders,
        ...rest,
    };

    if (
        body &&
        !(body instanceof FormData)
    ) {
        config.headers[
            "Content-Type"
        ] = "application/json";

        config.body =
            JSON.stringify(body);
    } else if (
        body instanceof FormData
    ) {
        config.body = body;
    }

    return fetch(
        `${API_URL}${endpoint}`,
        config
    );
}

async function parseResponse(
    response
) {
    let result;

    try {
        result =
            await response.json();
    } catch {
        result = {
            success: false,
            message:
                "Invalid server response.",
        };
    }

    return result;
}

export async function apiRequest(
    endpoint,
    options = {},
    retry = true
) {
    /*
     * IMPORTANT:
     *
     * All explicit /auth/refresh calls
     * now use the shared refresh promise.
     *
     * This prevents two refresh requests
     * from being sent at the same time.
     */
    if (endpoint === "/auth/refresh") {
        try {
            return await handleRefreshRequest();
        } catch (error) {
            clearAccessToken();

            throw error;
        }
    }

    let response =
        await makeRequest(
            endpoint,
            options
        );

    /*
     * Access token expired.
     */
    if (
        response.status === 401 &&
        retry
    ) {
        try {
            /*
             * Use the SAME refresh promise.
             *
             * If another refresh is already
             * happening, this waits for it.
             */
            await refreshAccessToken();

            /*
             * Retry original request with
             * the newly stored access token.
             */
            response =
                await makeRequest(
                    endpoint,
                    options
                );
        } catch {
            clearAccessToken();
        }
    }

    const result =
        await parseResponse(
            response
        );

    if (
        !response.ok ||
        result.success === false
    ) {
        const error = new Error(
            result.message ||
                "Something went wrong."
        );

        error.status =
            response.status;

        error.errors =
            result.errors || [];

        throw error;
    }

    return result;
}