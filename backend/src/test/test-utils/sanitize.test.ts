import { sanitizeObjectStrings } from "../../utils/sanitize";
import { badUserInputError } from "../../utils/errors";

describe("sanitizeObjectStrings", () => {
	it("should throw a custom GraphQL Error if unsafe HTML empties the field", () => {
		expect(() =>
			sanitizeObjectStrings({ name: "<script>alert('XSS')</script>" }, [
				"name",
			]),
		).toThrow(
			badUserInputError(
				`Le champ "name" contient du contenu invalide. Opération interrompue.`,
			),
		);
	});

	it("should keep safe string intact", () => {
		const result = sanitizeObjectStrings({ name: "Safe text" }, ["name"]);
		expect(result.name).toBe("Safe text");
	});

	it("should modify but not empty a partially unsafe string", () => {
		const result = sanitizeObjectStrings({ name: "Hello <b>world</b>!" }, [
			"name",
		]);
		expect(result.name).toBe("Hello world!");
	});
});
