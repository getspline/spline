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
            return status(401, {
                success: false,
                error: {
                    code: "NO_SESSION_AVAILABLE",
                    message: "No session was found using the request's headers and cookies",
                },
            });
        }

        let result;

        try {
            [result] = await db
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

            if (!result) {
                return status(401, {
                    success: false,
                    error: {
                        code: "WORKSPACE_NOT_FOUND",
                        message:
                            "Workspace wasn't found or the user isn't a member of said workspace",
                    },
                });
            }
        } catch (e) {
            console.error(e);
            return status(500, {
                success: false,
                error: {
                    code: "INTERNAL_DATABASE_ERROR",
                    message: "An internal database error occured, it isn't your fault!",
                },
            });
        }

        return result?.workspace ?? null;
    } catch (e) {
        status(500);
        return e;
    }
});
