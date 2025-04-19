import { DOMAIN } from "../constants/domain";

export const isValidUrl = (url: string) => {
    const validUrl = new URL(url);
    return validUrl.protocol === "http:" || validUrl.protocol === "https:";
}

export const getDomainfromUrl = (url: string) => {
    const validUrl = isValidUrl(url);
    const fullDomain = validUrl ? new URL(url).hostname : url;
    // remove www. from domain
    const domain = fullDomain.replace(/^www\./, "");
    return domain;
}


export const createDomainfromId = (uid: string) => {
    const domain = `${DOMAIN}/${uid}`;
    return domain;
}

console.log("Domain: ", getDomainfromUrl("https://www.google.com"));