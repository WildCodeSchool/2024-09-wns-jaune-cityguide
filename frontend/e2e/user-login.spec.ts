import { test, expect } from "@playwright/test";

const userData = {
	email: "test@email.com",
	password: "Test!123",
};

test.describe("User login", () => {
	test("User can login and is redirected to the map with a success message", async ({
		page,
	}) => {
		await page.goto("/login");

		await page.getByTestId("input-email").fill(userData.email);
		await page.getByTestId("input-password").fill(userData.password);

		await page.getByTestId("login-button").click();

		await expect(page.getByTestId("popup-message")).toBeVisible();
		await expect(page.getByTestId("popup-message")).toHaveText(
			/Connexion réussie/i,
		);

		await expect(page).toHaveURL(/.*\/map/);
	});
});
