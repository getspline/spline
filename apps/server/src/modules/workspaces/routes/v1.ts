import { Elysia } from "elysia";
import { db } from "@splinehq/database";
import { workspaceMembers, workspaces } from "@splinehq/database/src/schema/workspaces/schema.js";
import { and, eq } from "drizzle-orm";
import { auth } from "@splinehq/auth";

export const v1 = new Elysia();

v1.get("/:workspaceId", async ({ params: { workspaceId }, status, headers }) => {
    try {
        const session = await auth.api.getSession({
            headers,
        });

        if (!session) {
            status(401);
            return {
                success: false,
                error: {
                    code: "NO_SESSION_AVAILABLE",
                    message: "No session was found using the request's headers and cookies",
                },
            };
        }

        const [result] = await db
            .select({ workspace: workspaces })
            .from(workspaces)
            .innerJoin(
                workspaceMembers,
                and(
                    eq(workspaceMembers.workspace_id, workspaces.id),
                    eq(workspaceMembers.member_id, session.user.id),
                ),
            )
            .where(eq(workspaces.id, workspaceId))
            .limit(1);

        return result?.workspace ?? null;
    } catch (e) {
        status(500);
        return e;
    }
});
