import { z } from "zod";

export const ErrorCode = z.enum([
	"bad_request",
	"not_found",
	"internal_server_error",
	"unauthorized",
	"forbidden",
	"rate_limit_exceeded",
	"invite_expired",
	"invite_pending",
	"exceeded_limit",
	"conflict",
	"unprocessable_entity",
]);

const errorCodeToHttpStatus: Record<z.infer<typeof ErrorCode>, number> = {
	bad_request: 400,
	unauthorized: 401,
	forbidden: 403,
	exceeded_limit: 403,
	not_found: 404,
	conflict: 409,
	invite_pending: 409,
	invite_expired: 410,
	unprocessable_entity: 422,
	rate_limit_exceeded: 429,
	internal_server_error: 500,
};

export const httpStatusToErrorCode = Object.fromEntries(
	Object.entries(errorCodeToHttpStatus).map(([code, status]) => [status, code]),
) as Record<number, z.infer<typeof ErrorCode>>;

const ErrorSchema = z.object({
	error: z.object({
		code: ErrorCode.describe(
			"A short code indicating the error code returned.",
		),
		message: z.string().describe("A human readable error message."),
	}),
});

export type ErrorResponse = z.infer<typeof ErrorSchema>;
export type ErrorCodes = z.infer<typeof ErrorCode>;

export class AnomApiError extends Error {
	public readonly code: z.infer<typeof ErrorCode>;

	constructor({
		code,
		message,
	}: { code: z.infer<typeof ErrorCode>; message: string }) {
		super(message);
		this.code = code;
		this.name = "AnomApiError";
		this.message = message;
	}
}
