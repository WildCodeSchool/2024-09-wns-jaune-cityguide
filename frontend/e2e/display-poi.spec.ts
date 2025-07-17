import { test, expect } from "@playwright/test";

test.describe("Display the details of a selected interest point", () => {
	test("The user can search for a city and display the associated interest points", async ({
		page,
	}) => {
		await page.goto("/");

		await page.getByRole("button", { name: "Voir la carte" }).click();
		await expect(page).toHaveURL(/\/map$/);

		const searchInput = page.getByPlaceholder("Rechercher une ville...");
		await searchInput.fill("lyon");

		await page.waitForSelector('[data-testid="city-option-lyon"]');
		await page.getByTestId("city-option-lyon").click();

		await page.waitForSelector(".custom-poi-marker");

		const poiMarkers = await page.$$(".custom-poi-marker");
		expect(poiMarkers.length).toBeGreaterThan(0);

		await poiMarkers[0].click();

		await expect(page.getByText("Adresse", { exact: false })).toBeVisible();
	});
});
