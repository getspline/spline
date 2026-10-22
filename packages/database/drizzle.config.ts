import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
    path: "../../.env",
    quiet: true,
});

export default defineConfig({
    out: "./drizzle",
    schema: "./src/schema/**/*.ts",
    dialect: "postgresql",
    schemaFilter: ["public"],
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
