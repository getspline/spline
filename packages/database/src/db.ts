import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { authRelations } from "./schema/auth/schema.js";
import { workspaceRelations } from "./schema/workspaces/schema.js";
import * as authSchema from "./schema/auth/schema.js";
import * as workspaceSchema from "./schema/workspaces/schema.js";

config({
    path: "../../.env",
    quiet: true,
});

export const db = drizzle(process.env.DATABASE_URL!, {
    relations: {
        ...authRelations,
        ...workspaceRelations,
    },
});

export const schema = {
    ...authSchema,
    ...workspaceSchema,
};
