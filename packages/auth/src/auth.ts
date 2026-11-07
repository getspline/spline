import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
export { APIError, isAPIError } from "better-auth/api";
import { db, schema } from "@splinehq/database";
import { config } from "dotenv";
import { bearer, openAPI, username } from "better-auth/plugins";
import { v7 as uuidv7 } from "uuid";
import { createAuthMiddleware } from "better-auth/api";
import { workspaceMembers, workspaces } from "@splinehq/database/src/schema/workspaces/schema.js";

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
    plugins: [username(), openAPI(), bearer()],
    advanced: {
        database: {
            generateId: () => uuidv7(),
        },
        cookies: {
            session_token: {
                name: "spline_auth_token",
            },
        },
    },
    basePath: "/api/v1/auth",
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (!ctx.path.includes("sign-up")) return;
            const newSession = ctx.context.newSession;
            const [workspace] = await db
                .insert(workspaces)
                .values({
                    id: uuidv7(),
                    name: `${newSession?.user.name}'s workspace`,
                })
                .returning();
            await db.insert(workspaceMembers).values({
                member_id: newSession?.user.id as string,
                workspace_id: workspace!.id,
                is_owner: true,
            });
        }),
    },
});
