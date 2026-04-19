import { defineConfig } from "orval";

export default defineConfig({
  auth: {
    input: "./openapi/auth.yaml",
    output: {
      target: "./orval/auth.ts",
      client: "swr",
      baseUrl: "/api",
    },
    hooks: {
      afterAllFilesWrite: "npm run lint:prettier",
    },
  },
  profile: {
    input: "./openapi/profile.yaml",
    output: {
      target: "./orval/profile.ts",
      client: "swr",
      baseUrl: "/api",
    },
    hooks: {
      afterAllFilesWrite: "npm run lint:prettier",
    },
  },
});
