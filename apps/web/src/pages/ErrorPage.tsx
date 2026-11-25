import { isRouteErrorResponse, useRouteError } from "react-router";
import styles from "./ErrorPage.module.css";

export function ErrorPage() {
    const error = useRouteError();

    let title = "Something went wrong";
    let description = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            title = "Page not found";
            description = "The page you're looking for doesn't exist.";
        } else if (error.status === 403) {
            title = "Access denied";
            description = "You don't have permission to access this page.";
        }
    }

    return (
        <main className={styles.main}>
            <h1>{title}</h1>
            <p>{description}</p>
            <button
                onClick={() => window.location.assign("/")}
                className={`${styles.button} primary`}
            >
                Go home
            </button>
        </main>
    );
}
