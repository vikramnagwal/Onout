
export const getSearchParams = (url: string) => {
  let params = {} as Record<string, string>;
  new URL(url).searchParams.forEach(function (val, key) {
    params[key] = val;
  });

  return params; // returns an object with key-value pairs
};