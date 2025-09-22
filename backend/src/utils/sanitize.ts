import DOMPurify from "isomorphic-dompurify";
import { badUserInputError } from "./errors";

export function sanitizeString(input: string, context?: string): string {
	const sanitized = DOMPurify.sanitize(input, {
		ALLOWED_TAGS: [],
		ALLOWED_ATTR: [],
	}).trim();

	if (input !== sanitized) {
		console.warn(
			`[sanitizeString] Content cleaned in ${context ?? "unknown field"} :`,
			{ before: input, after: sanitized },
		);
	}
	return sanitized;
}

export function sanitizeObjectStrings<T>(
	obj: T,
	keysToSanitize: (keyof T)[],
): T {
	const sanitized = { ...obj };

	for (const key of keysToSanitize) {
		const value = sanitized[key];
		if (typeof value === "string") {
			const cleaned = sanitizeString(value);

			if (cleaned.length === 0 && value.trim().length > 0) {
				console.warn(
					`[SECURITY WARNING] Field "${String(key)}" has been emptied during sanitization.`,
				);
				console.warn(`Initial content: "${value}"`);
				throw badUserInputError(
					`Field "${String(key)}" contains invalid content. Operation interrupted.`,
					"INVALID_INPUT",
				);
			}
			if (cleaned !== value) {
				console.warn(
					`[SECURITY NOTICE] Field "${String(key)}" has been modified by sanitization.`,
				);
				console.warn(`Before: "${value}"`);
				console.warn(`After: "${cleaned}"`);
			}

			sanitized[key] = cleaned as T[keyof T];
		}
	}

	return sanitized;
}
