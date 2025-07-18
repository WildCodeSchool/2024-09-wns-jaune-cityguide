import { test, expect } from "@playwright/test";

const userData = {
	firstname: "Alice",
	lastname: "Dupont",
	email: `alice@${Date.now()}.com`,
	password: "password123",
	confirmPassword: "password123",
	cityId: "1",
};

test.describe("User registration", () => {
	test("User can register and is redirected to the map with a success message", async ({
		page,
	}) => {
		await page.goto("/inscription");

		await page
			.getByRole("textbox", { name: "Prénom", exact: true })
			.fill(userData.firstname);
		await page
			.getByRole("textbox", { name: "Nom", exact: true })
			.fill(userData.lastname);
		await page
			.getByRole("textbox", { name: "Email", exact: true })
			.fill(userData.email);
		await page
			.getByRole("textbox", { name: "Mot de passe", exact: true })
			.fill(userData.password);
		await page
			.getByRole("textbox", { name: "Confirmer mot de passe", exact: true })
			.fill(userData.confirmPassword);

		await page.getByRole("combobox").selectOption({ value: userData.cityId });

		await page.getByRole("button", { name: "M'inscrire" }).click();

		await expect(page.getByTestId("popup-message")).toBeVisible();
		await expect(page.getByTestId("popup-message")).toHaveText(
			/votre compte a été créé avec succès/i,
		);

		await expect(page).toHaveURL(/.*\/map/);
	});
});
