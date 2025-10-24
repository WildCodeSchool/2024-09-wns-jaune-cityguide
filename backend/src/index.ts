import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { CityResolver } from "./resolvers/CityResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { InterestPointResolver } from "./resolvers/InterestPointResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { PictureResolver } from "./resolvers/PictureResolver";
import { PasswordResolver } from "./resolvers/PasswordResolver";
import { seedDatabase } from "./data/seeder";
import { customAuthChecker } from "./middleware/authChecker";

const { env } = process;

if (!env.SERVICE_PORT) {
	throw new Error(
		`Variable "SERVICE_PORT" is not defined in environment variables`,
	);
}

const PORT = Number.parseInt(env.SERVICE_PORT, 10);

if (Number.isNaN(PORT) || PORT < 0 || PORT > 65535) {
	throw new Error(`Invalid port value: ${env.SERVICE_PORT}`);
}

const start = async () => {
	await dataSource
		.initialize()
		.then(() => console.log("Database connected"))
		.catch((err) => console.error("Error connecting to the database", err));

	await seedDatabase()
		.then(() => console.log("Database seeded"))
		.catch((err) => console.error("Error seeding the database", err));

	const schema = await buildSchema({
		resolvers: [
			CityResolver,
			CategoryResolver,
			InterestPointResolver,
			UserResolver,
			PictureResolver,
			PasswordResolver,
		],
		authChecker: customAuthChecker,
		validate: true,
	});

	const apiServer = new ApolloServer({ schema, introspection: true });

	await startStandaloneServer(apiServer, {
		listen: { port: PORT },
		context: async ({ req, res }) => {
			try {
				if (!process.env.TOKEN_SECRET_KEY) return { res };
				const token = req.headers.cookie?.split("token=")[1];
				if (!token) return { res };

				const tokenContent = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

				return {
					res,
					user: tokenContent,
				};
			} catch (error) {
				console.error("Error in Apollo Server context:", error);
				return { res };
			}
		},
	});

	console.log(`Backend started on port #${PORT}`);
};

start();
