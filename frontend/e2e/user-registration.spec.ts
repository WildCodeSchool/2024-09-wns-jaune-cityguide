import { test, expect } from "@playwright/test";

test.describe("User registration", () => {
	test("User can register and is redirected to the map with a success message", async ({
		page,
	}) => {
		await page.goto("/inscription");

		await page
			.getByRole("textbox", { name: "Prénom", exact: true })
			.fill("Alice");
		await page
			.getByRole("textbox", { name: "Nom", exact: true })
			.fill("Dupont");
		await page
			.getByRole("textbox", { name: "Email", exact: true })
			.fill(`alice@${Date.now()}.com`);
		await page
			.getByRole("textbox", { name: "Mot de passe", exact: true })
			.fill("password123");
		await page
			.getByRole("textbox", { name: "Confirmer mot de passe", exact: true })
			.fill("password123");

		await page.getByRole("combobox").selectOption({ value: "1" });

		await page.getByRole("button", { name: "M'inscrire" }).click();

		await expect(page.getByTestId("popup-message")).toBeVisible();
		await expect(page.getByTestId("popup-message")).toHaveText(
			/votre compte a été créé avec succès/i,
		);

		await expect(page).toHaveURL(/.*\/map/);
	});
});
