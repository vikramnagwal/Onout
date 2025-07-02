import Cookies from "js-cookie";
import { useEffect, useState } from "react";

/**
 * Custom hook to manage cookies in a React application.
 * 
 * @param key - The key of the cookie.
 * @param initialValue - The initial value of the cookie.
 * @param options - Optional cookie attributes (e.g., expires, path, domain).
 * @returns An array containing the current value and a function to update the cookie.
 */

export function useCookie<T>(key: string, initialValue: T, options?: Cookies.CookieAttributes) {
   const [storedValue, setStoredValue] = useState<T>(() => {
        const items = Cookies.get(key);
        return items ? JSON.parse(items) : initialValue;
   })

   useEffect(() => {
        const handleStorageChange = () => {
            const items = Cookies.get(key);
            if (items) {
              setStoredValue(JSON.parse(items));
            }
        }

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        }
   }, [key])

   const setValue = (value: T) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        Cookies.set(key, JSON.stringify(valueToStore), options);
   }
    
   return [storedValue, setValue] as const;
}
