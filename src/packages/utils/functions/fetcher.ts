interface SWRError extends Error {
    info: any;
    status: number;
}

export async function fetcher<JSON = any>(url: string, options?: RequestInit): Promise<JSON> {
    const res = await fetch(url, options);

    if (!res.ok) {
        const message = (await res.json())?.error?.message || "An error occurred while fetching the data.";
        const error = new Error(message) as SWRError;
        error.info = await res.json();
        error.status = res.status;

        throw error;
    }

    return res.json();
}