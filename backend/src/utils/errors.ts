import { isInt, isPositive } from "class-validator";
import { GraphQLError } from "graphql";

export function notFoundError(message: string) {
	return new GraphQLError(message, {
		extensions: {
			code: "NOT_FOUND",
		},
	});
}

export function badUserInputError(message: string, customCode?: string) {
	return new GraphQLError(message, {
		extensions: {
			code: customCode ?? "BAD_USER_INPUT",
		},
	});
}

export function checkIdFormat(id: string) {
	const formattedId = Number.parseInt(id, 10);
	if (
		Number.isNaN(formattedId) ||
		!isInt(formattedId) ||
		!isPositive(formattedId)
	) {
		throw badUserInputError(
			"The provided ID must be a string representing a positive integer.",
		);
	}
	return formattedId;
}
