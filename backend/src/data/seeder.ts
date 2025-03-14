import { dataSource } from "../config/db";
import fs from "node:fs";

import { City } from "../entities/City";
import { Category } from "../entities/Category";
import { InterestPoint } from "../entities/InterestPoint";
import { Picture } from "../entities/Picture";

export async function seedDatabase() {
	console.log("🔎 Checking database content...");

	const pictureRepository = dataSource.getRepository(Picture);
	const categoryRepository = dataSource.getRepository(Category);
	const cityRepository = dataSource.getRepository(City);
	const interestPointRepository = dataSource.getRepository(InterestPoint);

	const picturesCount = await pictureRepository.count();
	if (picturesCount > 0) {
		console.log("Table 'Picture' already seeded. Deleting data...");
		pictureRepository.delete({});
		console.log("Table cleared.");
		return;
	}
	console.log("Table 'Picture' is empty.");

	const interestPointsCount = await interestPointRepository.count();
	if (interestPointsCount > 0) {
		console.log("Table 'InterestPoint' already seeded. Deleting data...");
		interestPointRepository.delete({});
		console.log("Table cleared.");
		return;
	}
	console.log("Table 'InterestPoint' is empty. Ready for seeding!");

	const categoriesCount = await categoryRepository.count();
	if (categoriesCount > 0) {
		console.log("Table 'Category' already seeded. Deleting data...");
		categoryRepository.delete({});
		console.log("Table cleared.");
		return;
	}
	console.log("Table 'Category' is empty. Ready for seeding!");

	const citiesCount = await cityRepository.count();
	if (citiesCount > 0) {
		console.log("Table 'City' already seeded. Deleting data...");
		cityRepository.delete({});
		console.log("Table cleared.");
		return;
	}
	console.log("Table 'City' is empty. Ready for seeding!");

	console.log("🌱 Seeding begins...");

	console.log("⤵️ Inserting categories...");
	const categories: Category[] = JSON.parse(
		fs.readFileSync("src/data/categories.json", "utf8"),
	);

	for (const category of categories) {
		const savedCategory = await categoryRepository.save(category);
		if (!savedCategory) {
			throw new Error(`Failed to insert category: ${category.name}`);
		}
		// console.log("Category inserted:", savedCategory);
	}
	console.log("✅ Categories inserted successfully!");

	console.log("⤵️ Inserting cities...");
	const cities: City[] = JSON.parse(
		fs.readFileSync("src/data/cities.json", "utf8"),
	);
	for (const city of cities) {
		const savedCity = await cityRepository.save(city);
		if (!savedCity) {
			throw new Error(`Failed to insert city: ${city.name}`);
		}
		// console.log("City inserted:", savedCity);
	}
	console.log("✅ Cities inserted successfully!");

	console.log("⤵️ Inserting interest points...");
	const interestPoints: InterestPoint[] = JSON.parse(
		fs.readFileSync("src/data/interestPoints.json", "utf8"),
	);

	for (const interestPoint of interestPoints) {
		const city = await cityRepository.findOneBy({
			name: interestPoint.city.name,
		});
		if (!city) {
			throw new Error(`City not found: ${interestPoint.city}`);
		}

		const category = await categoryRepository.findOne({
			where: { name: interestPoint.category.name },
		});
		if (!category) {
			throw new Error(`Category not found: ${interestPoint.category}`);
		}

		if (city && category) {
			const savedInterestPoint = await interestPointRepository.save([
				{
					name: interestPoint.name,
					description: interestPoint.description,
					address: interestPoint.address,
					latitude: interestPoint.latitude,
					longitude: interestPoint.longitude,
					link_url: interestPoint.link_url,
					city: city,
					category: category,
				},
			]);
			// console.log("Interest point inserted:", savedInterestPoint);
			if (!savedInterestPoint) {
				throw new Error(
					`Failed to insert interest point: ${interestPoint.name}`,
				);
			}
		}
	}
	console.log("✅ Interest points inserted successfully!");
	console.log("🌱 Seeding complete!");
}
