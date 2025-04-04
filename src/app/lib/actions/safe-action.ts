import { logger } from "@/packages/utils/functions/logger";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    handleServerError: (e) => {
        logger.error("Server action error", e);

        if (e instanceof Error) {
            return e.message;
        }

        return "An unknown server action error occurred";
    }
})
