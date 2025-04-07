export function generateOTP(length: number = 6) {
	return Math.ceil(Math.random() * 900000)
		.toString()
		.padStart(length, "0"); // must always return 6 digits number
}
