import { config } from 'dotenv';
import { dataSource } from './config/db';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwt from 'jsonwebtoken';
import { CityResolver } from './resolvers/CityResolver';


config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

if (isNaN(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid port value: ${process.env.PORT}`);
};


const start = async () => {
    await dataSource.initialize();

    const schema = await buildSchema({
        resolvers: [CityResolver],
        //authChecker: authChecker,
    });

    const apiServer = new ApolloServer({ schema });

    await startStandaloneServer(apiServer, {
        listen: { port },
        /* context: async ({ req, res }) => {
            if (!process.env.TOKEN_SECRET_KEY) return { res };
            const token = req.headers.cookie?.split("token=")[1];

            if (!token) return { res };

            const tokenContent = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

            return {
                res,
                user: tokenContent,
            };
        }, */
    });

    console.log("Backend started on port#" + port);
};

start();