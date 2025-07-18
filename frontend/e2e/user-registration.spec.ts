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

		await page.getByTestId("input-firstname").fill(userData.firstname);
		await page.getByTestId("input-lastname").fill(userData.lastname);
		await page.getByTestId("input-email").fill(userData.email);
		await page.getByTestId("input-password").fill(userData.password);
		await page
			.getByTestId("input-confirmPassword")
			.fill(userData.confirmPassword);

		await page.getByRole("combobox").selectOption({ value: userData.cityId });

		await page.getByTestId("register-button").click();

		await expect(page.getByTestId("popup-message")).toBeVisible();
		await expect(page.getByTestId("popup-message")).toHaveText(
			/votre compte a été créé avec succès/i,
		);

		await expect(page).toHaveURL(/.*\/map/);
	});
});
