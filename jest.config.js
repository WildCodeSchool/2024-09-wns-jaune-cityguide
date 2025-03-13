{
  import("ts-jest/dist/types").InitialOptionsTsJest;
}
export const preset = "ts-jest";
export const testEnvironment = "node";
export const testMatch = ["/tests//*.test.ts"];
export const moduleFileExtensions = ["ts", "js"];
export const transform = {
  "^.+.ts$": "ts-jest",
};
export const globals = {
  "ts-jest": {
    tsconfig: "tsconfig.json",
  },
};
export const setupFilesAfterEnv = ["<rootDir>/backend/tests/jest.setup.ts"];
