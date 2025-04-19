export const getIp = async (req: Request) => {
    let headers = {
        "x-forwarded-for": req.headers.get("x-forwarded-for"),
        "x-real-ip": req.headers.get("x-real-ip"),
        "cf-connecting-ip": req.headers.get("cf-connecting-ip"),
        "x-client-ip": req.headers.get("x-client-ip"),
        "x-cluster-client-ip": req.headers.get("x-cluster-client-ip"),
    }

    return headers["x-forwarded-for"] || headers["x-real-ip"] || headers["cf-connecting-ip"] || headers["x-client-ip"] || headers["x-cluster-client-ip"] || "no ip";
}

export const getMessageSource = async(request: Request) => {
  const browser =  request.headers.get("sec-ch-ua")?.split(';')[0].replace(/"/g, "") || "unknown"
  return browser
}