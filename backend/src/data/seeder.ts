import { dataSource } from "../config/db";
import fs from "node:fs";
import * as argon from "argon2";

import { City } from "../entities/City";
import { Category } from "../entities/Category";
import { InterestPoint } from "../entities/InterestPoint";
import { Picture } from "../entities/Picture";
import { User, type UserRole } from "../entities/User";

type InterestPointSeedType = {
	name: string;
	description: string;
	address: string;
	latitude: number;
	longitude: number;
	link_url: string;
	category: string;
	city: string;
};

type PictureSeedType = {
	name: string;
	description: string;
	url: string;
	interestPoint: string;
};

type UserSeedType = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	city: string;
	role: UserRole;
};

export async function seedDatabase() {
	console.log("🔎 Checking database content...");

	const categoryRepository = dataSource.getRepository(Category);
	const cityRepository = dataSource.getRepository(City);
	const interestPointRepository = dataSource.getRepository(InterestPoint);
	const pictureRepository = dataSource.getRepository(Picture);
	const userRepository = dataSource.getRepository(User);

	const categoriesCount = await categoryRepository.count();
	const citiesCount = await cityRepository.count();
	const interestPointsCount = await interestPointRepository.count();
	const picturesCount = await pictureRepository.count();
	const usersCount = await userRepository.count();
	if (
		categoriesCount > 0 ||
		citiesCount > 0 ||
		interestPointsCount > 0 ||
		picturesCount > 0 ||
		usersCount > 0
	) {
		console.log("⛔️ Database already seeded, skipping...");
		return;
	}

	console.log("🧹 Cleaning database...");
	// Fix error 'Empty criteria(s) are not allowed for the delete method': https://github.com/typeorm/typeorm/issues/11455
	await pictureRepository.createQueryBuilder().delete().execute();
	await interestPointRepository.createQueryBuilder().delete().execute();
	await categoryRepository.createQueryBuilder().delete().execute();
	await cityRepository.createQueryBuilder().delete().execute();
	await userRepository.createQueryBuilder().delete().execute();

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
	}
	console.log("✅ Cities inserted successfully!");

	console.log("⤵️ Inserting interest points...");
	const interestPoints: InterestPointSeedType[] = JSON.parse(
		fs.readFileSync("src/data/interestPoints.json", "utf8"),
	);

	for (const interestPoint of interestPoints) {
		const city = await cityRepository.findOneBy({
			name: interestPoint.city,
		});
		if (!city) {
			throw new Error(`City not found: ${interestPoint.city}`);
		}

		const category = await categoryRepository.findOneBy({
			name: interestPoint.category,
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
					city,
					category,
				},
			]);
			if (!savedInterestPoint) {
				throw new Error(
					`Failed to insert interest point: ${interestPoint.name}`,
				);
			}
		}
	}
	console.log("✅ Interest points inserted successfully!");

	console.log("⤵️ Inserting pictures...");
	const pictures: PictureSeedType[] = JSON.parse(
		fs.readFileSync("src/data/pictures.json", "utf8"),
	);

	for (const picture of pictures) {
		const interestPoint = await interestPointRepository.findOneBy({
			name: picture.interestPoint,
		});
		if (!interestPoint)
			throw new Error(`Interest point not found: ${picture.interestPoint}`);

		const savedPicture = await pictureRepository.save([
			{
				name: picture.name,
				description: picture.description,
				url: picture.url,
				interestPoint,
			},
		]);
	}
	console.log("✅ Pictures inserted successfully!");

	console.log("⤵️ Inserting users...");
	// const userRepository = dataSource.getRepository(User);

	const users: UserSeedType[] = JSON.parse(
		fs.readFileSync("src/data/users.json", "utf8"),
	);

	for (const user of users) {
		const city = await cityRepository.findOneBy({ name: user.city });
		if (!city) {
			throw new Error(
				`City not found for user: ${user.firstname} ${user.lastname}`,
			);
		}

		const hashedPassword = await argon.hash(user.password);

		const newUser = await userRepository.save([
			{
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				hashedPassword: hashedPassword,
				city: city,
				role: user.role,
			},
		]);
	}
	console.log("✅ Users inserted successfully!");

	console.log("🌱 Seeding complete!");
}
