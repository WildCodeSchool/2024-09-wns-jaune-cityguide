import "reflect-metadata";
import { ApolloServer, type BaseContext } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { CityResolver } from "../resolvers/CityResolver";
import { testDb } from "./jest.setup";

export async function createTestServer(): Promise<{
	server: ApolloServer<BaseContext>;
	contextValue: { db: typeof testDb };
}> {
	await testDb.initialize();
	const schema = await buildSchema({
		resolvers: [CityResolver],
		validate: false,
	});
	const server = new ApolloServer<BaseContext>({
		schema,
	});
	return { server, contextValue: { db: testDb } };
}
