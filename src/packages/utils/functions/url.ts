
export const getSearchParams = (request: Request, query: string) => {
        const parsedUrl = new URL(request.url).searchParams;
        const params = parsedUrl.get(query);
       if (!params) {
            throw new Error(`Missing query parameter: ${query}`);
        }
        return params;
};