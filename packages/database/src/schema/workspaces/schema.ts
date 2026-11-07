import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "../auth/schema.js";
import { defineRelationsPart } from "drizzle-orm";

export const workspaces = pgTable("workspaces", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    created_at: timestamp("created_at").defaultNow(),
});

export const workspaceMembers = pgTable("workspace_members", {
    workspace_id: text("workspace_id")
        .notNull()
        .references(() => workspaces.id),
    is_owner: boolean("is_owner").default(false),
    member_id: text("member_id")
        .notNull()
        .references(() => user.id),
});

export const workspaceRelations = defineRelationsPart(
    { workspaces, workspaceMembers, user },
    (r) => ({
        workspaces: {
            members: r.many.workspaceMembers({
                from: r.workspaces.id,
                to: r.workspaceMembers.workspace_id,
            }),
        },
        workspaceMembers: {
            workspace: r.one.workspaces({
                from: r.workspaceMembers.workspace_id,
                to: r.workspaces.id,
            }),
            member: r.one.user({
                from: r.workspaceMembers.member_id,
                to: r.user.id,
            }),
        },
    }),
);
