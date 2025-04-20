import Cookies from "js-cookie";
import { useEffect, useState } from "react";


// key: string, initialValue: T, options?: CookieAttributes
//  ex: key: "user", initialValue: { name: "John Doe" }, options: { expires: 7 }
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

        // cleanup function to remove event listener
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
