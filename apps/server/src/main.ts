import { node } from "@elysia/node";
import auth from "./auth/auth.js";
import { Elysia } from "elysia";
import { auth as authConfig } from "@splinehq/auth";

const app = new Elysia({ adapter: node() });

app.mount(authConfig.handler);

type SignUpBody = {
    email: string;
    username: string;
    password: string;
};

type SignInBody = {
    emailOrUsername: string;
    password: string;
};

app.post("/api/v1/auth/signup", async ({ body, status }) => {
    const { email, username, password } = body as SignUpBody;

    let data: any;

    try {
        data = await auth.signUp(email, username, password);
    } catch (e) {
        console.error("Sign up threw an error!");
        console.error(e);
        status(500);
        return {
            success: false,
            error: "Something unexpected happened during sign up.",
        };
    }

    if (!data.success) {
        switch (data.error.code) {
            case "INVALID_REQUEST":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_REQUEST",
                        message: "No username, email, or password was/were provided",
                    },
                };
            case "INVALID_EMAIL":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_EMAIL",
                        message: "Email does not match a normal email format",
                    },
                };
            case "INVALID_USERNAME":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_USERNAME",
                        message: "Username contains blocked characters",
                    },
                };
            case "INVALID_PASSWORD":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_PASSWORD",
                        message: "Password does not meet security requirements",
                        more: data.error.more,
                    },
                };
            default:
                console.error(data.error.code);
                status(500);
                return {
                    success: false,
                    error: {
                        code: "UNKNOWN_ERROR",
                        message: "Something weird happened, we don't know what either",
                    },
                };
        }
    }

    return data;
});

app.post("/api/v1/auth/signin", async ({ body, status }) => {
    const { emailOrUsername, password } = body as SignInBody;

    let data;

    try {
        data = await auth.signIn(emailOrUsername, password);
    } catch (e) {
        console.error("Sign in threw an error!");
        console.error(e);
        status(500);
        return {
            success: false,
            error: "Something unexpected happened during sign in.",
        };
    }

    if (!data.success) {
        switch (data.error.code) {
            case "INVALID_REQUEST":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_REQUEST",
                        message: "No username, email, or password was/were provided",
                    },
                };
            case "INVALID_EMAIL":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_EMAIL",
                        message: "Email does not match a normal email format",
                    },
                };
            case "INVALID_USERNAME":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_USERNAME",
                        message: "Username contains blocked characters",
                    },
                };
            case "INVALID_PASSWORD":
                status(400);
                return {
                    success: false,
                    error: {
                        code: "INVALID_PASSWORD",
                        message: "Password does not meet security requirements",
                        more: data.error.more,
                    },
                };
            default:
                status(500);
                return {
                    success: false,
                    error: {
                        code: "UNKNOWN_ERROR",
                        message: "Something weird happened, we don't know what either",
                    },
                };
        }
    }

    return data;
});

app.listen(3000, ({ hostname, port, error }) => {
    if (error) throw error;

    console.log(`Server is now listening on ${hostname}:${port}`);
});
