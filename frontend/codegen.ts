import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '../.env.prod' : '../.env.dev';
dotenv.config({ path: envFile });

const config: CodegenConfig = {
    overwrite: true,
    schema: `${process.env.BASE_URL}/api`,
    documents: "./src/libs/graphql/operations.ts",
    generates: {
        "./src/libs/graphql/generated/graphql-types.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo"
            ],
            config: {
                withHooks: true,
            },
        },
    },
};

export default config;