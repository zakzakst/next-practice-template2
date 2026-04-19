import { defineConfig } from "orval";

export default defineConfig({
  auth: {
    input: "./openapi/auth.yaml",
    output: {
      target: "./src/orval/auth.ts",
      client: "swr",
      httpClient: "fetch",
      baseUrl: "/api",
    },
    hooks: {
      afterAllFilesWrite: "npm run lint:prettier",
    },
  },
  profile: {
    input: "./openapi/profile.yaml",
    output: {
      target: "./src/orval/profile.ts",
      client: "swr",
      httpClient: "fetch",
      baseUrl: "/api",
    },
    hooks: {
      afterAllFilesWrite: "npm run lint:prettier",
    },
  },
});
