import { AppLayout } from "./pages/app/AppLayout";
import { Home } from "./pages/app/Home";
import { createBrowserRouter } from "react-router";
import { ErrorPage } from "./pages/ErrorPage";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { Workspace } from "./pages/workspace/Workspace";

function Landing() {
    return <h1>Spline</h1>;
}

export const router = createBrowserRouter([
    {
        Component: Landing,
        path: "/",
        ErrorBoundary: ErrorPage,
    },
    {
        path: "/app",
        Component: AppLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "w/:workspaceId",
                Component: Workspace,
            },
        ],
    },
    {
        path: "/signin",
        Component: SignIn,
    },
    {
        path: "/signup",
        Component: SignUp,
    },
]);
