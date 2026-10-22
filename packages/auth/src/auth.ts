import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
export { APIError, isAPIError } from "better-auth/api";
import { db, schema } from "@splinehq/database";
import { config } from "dotenv";
import { username } from "better-auth/plugins";
import { v7 as uuidv7 } from "uuid";

config({
    path: "../../.env",
    quiet: true,
});

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.BASE_URL,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [username()],
    advanced: {
        database: {
            generateId: () => uuidv7(),
        },
    },
});
