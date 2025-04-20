import { headers } from "next/headers";

export const getIP = async () => {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = (await headers()).get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return (await headers()).get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
};

export const getMessageSource = async(request: Request) => {
  const browser =  request.headers.get("sec-ch-ua")?.split(';')[0].replace(/"/g, "") || "unknown"
  return browser
}