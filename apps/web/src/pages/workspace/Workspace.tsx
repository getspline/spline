import { Navigate, useParams } from "react-router";

export function Workspace() {
    const params = useParams();

    if (!params.workspaceId) {
        return <Navigate to="/signin" replace />;
    }

    return <p>workspace woohoo</p>;
}
