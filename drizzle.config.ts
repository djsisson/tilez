import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd(), true);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  tablesFilter: ["tilez*"],
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
});
