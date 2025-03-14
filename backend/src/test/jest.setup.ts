import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../entities/Category";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export const testDb = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_TEST_PORT) || 5434,
  username: process.env.DB_TEST_USER || "test_user",
  password: process.env.DB_TEST_PASSWORD || "test_password",
  database: process.env.DB_TEST_NAME || "cityguide_test",
  synchronize: true,
  dropSchema: true,
  entities: [Category],
});
