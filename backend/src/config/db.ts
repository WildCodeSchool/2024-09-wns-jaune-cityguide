import { config } from "dotenv";
import { DataSource } from "typeorm";
import { City } from "../entities/City";


config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_SCHEMA } = process.env;


export const dataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_SCHEMA,
    synchronize: true,
    entities: [City],
});