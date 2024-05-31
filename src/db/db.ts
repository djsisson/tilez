import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./migrations/schema";
import * as relations from "./migrations/relations";

export const db = drizzle(sql, {
  schema: { ...schema, ...relations },
  logger: true,
});
