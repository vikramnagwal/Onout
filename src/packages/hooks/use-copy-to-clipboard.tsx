import { useCallback, useEffect, useRef, useState } from "react";

export const useCopyToClipboard = (timeout: number = 3000): [boolean, (value: string | ClipboardItem) => Promise<void>] => {
    const timer = useRef<ReturnType<typeof setTimeout> | null >(null);
    const [copied, setCopied] = useState<boolean>(false);

    function clearTimer() {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    }

    const copyToClipboard = useCallback(async (value: string | ClipboardItem) => {
        clearTimer();
        try {
            if (typeof value === "string") {
                await navigator.clipboard.writeText(value);
            } else {
                await navigator.clipboard.write([value]);
            }

            if (Number.isFinite(timeout) && timeout >= 0) {
                timer.current = setTimeout(() => {
                    setCopied(false);
                }, timeout);
            }
            setCopied(true);
        } catch (error) {
            console.error("Failed to copy to clipboard", error);
        }
    }, [timeout]);

    useEffect(() => {
        return () => clearTimer();
    }, []);

    return [copied, copyToClipboard];
}