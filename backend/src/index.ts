import { config } from "dotenv";
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

config();

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

if (isNaN(port) || port < 0 || port > 65535) {
	throw new Error(`Invalid port value: ${process.env.PORT}`);
}

const start = async () => {
	await dataSource
		.initialize()
		.then(() => console.log("Database connected"))
		.catch((err) => console.error("Error connecting to the database", err));
	// await seedDatabase()
	// 	.then(() => console.log("Database seeded"))
	// 	.catch((err) => console.error("Error seeding the database", err));

	const schema = await buildSchema({
		resolvers: [
			CityResolver,
			CategoryResolver,
			InterestPointResolver,
			UserResolver,
			PictureResolver,
			PasswordResolver,
		],
		//authChecker: authChecker,
	});

	const apiServer = new ApolloServer({ schema, introspection: true });

	await startStandaloneServer(apiServer, {
		listen: { port },
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
				console.error("Erreur dans le contexte Apollo :", error);
				return { res }; // Retourner un contexte minimal pour éviter le blocage
			}
		},
	});

	console.log("Backend started on port#" + port);
};

start();
