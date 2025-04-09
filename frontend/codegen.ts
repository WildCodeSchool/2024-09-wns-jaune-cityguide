import type { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
    overwrite: true,
    schema: `http://localhost:${process.env.GATEWAY_PORT || '7000'}/api`,
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