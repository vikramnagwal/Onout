
export const getSearchParams = (request: Request) => {
        // const params = new URL(request.url).searchParams;
        let params: Record<string, string> = {};
        new URL(request.url).searchParams.forEach((value, key) => params[key] = value);
        return params
}