export const encryptMessages = async (text: string) => {   
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode("1234567890123456"),
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );
    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        data
    );
    const encryptedArray = new Uint8Array(encrypted);
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const encryptedMessage = `${ivBase64}:${encryptedBase64}`;
    return encryptedMessage; 
}

export const decryptMessages = async (encryptedMessage: string) => {
    const [ivBase64, encryptedBase64] = encryptedMessage.split(":");
    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
    const encryptedArray = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode("1234567890123456"),
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );
    const decrypted = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encryptedArray
    );
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
}