import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { authRelations } from "./schema/auth/schema.js";

config({
    path: "../../.env",
    quiet: true,
});

export const db = drizzle(process.env.DATABASE_URL!, { relations: authRelations });

export * as schema from "./schema/auth/schema.js";
