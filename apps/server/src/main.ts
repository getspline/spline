import Fastify from "fastify";
import auth from "./auth/auth.js";

const fastify = Fastify();

type SignUpBody = {
    email: string;
    username: string;
    password: string;
};

type SignInBody = {
    emailOrUsername: string;
    password: string;
};

fastify.post("/api/v1/auth/signup", async (req, res) => {
    const body: SignUpBody = req.body as SignUpBody;
    const { email, username, password } = body;

    let data;

    try {
        data = await auth.signUp(email, username, password);
    } catch (e) {
        console.error("Sign up threw an error!");
        console.error(e);
        res.code(500).send({
            success: false,
            error: "Something unexpected happened during sign up.",
        });
    }

    if (!data.success) {
        switch (data.error.code) {
            case "INVALID_REQUEST":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_REQUEST",
                        message: "No username, email, or password was/were provided",
                    },
                });
            case "INVALID_EMAIL":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_EMAIL",
                        message: "Email does not match a normal email format",
                    },
                });
            case "INVALID_USERNAME":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_USERNAME",
                        message: "Username contains blocked characters",
                    },
                });
            case "INVALID_PASSWORD":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_PASSWORD",
                        message: "Password does not meet security requirements",
                        more: data.error.more,
                    },
                });
            default:
                console.error(data.error.code);
                res.code(500).send({
                    success: false,
                    error: {
                        code: "UNKNOWN_ERROR",
                        message: "Something weird happened, we don't know what either",
                    },
                });
        }
    }

    res.send(data);
});

fastify.post("/api/v1/auth/signin", async (req, res) => {
    const body: SignInBody = req.body as SignInBody;
    const { emailOrUsername, password } = body;

    let data;

    try {
        data = await auth.signIn(emailOrUsername, password);
    } catch (e) {
        console.error("Sign in threw an error!");
        console.error(e);
        res.code(500).send({
            success: false,
            error: "Something unexpected happened during sign in.",
        });
    }

    if (!data.success) {
        switch (data.code) {
            case "INVALID_REQUEST":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_REQUEST",
                        message: "No username, email, or password was/were provided",
                    },
                });
            case "INVALID_EMAIL":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_EMAIL",
                        message: "Email does not match a normal email format",
                    },
                });
            case "INVALID_USERNAME":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_USERNAME",
                        message: "Username contains blocked characters",
                    },
                });
            case "INVALID_PASSWORD":
                res.code(400).send({
                    success: false,
                    error: {
                        code: "INVALID_PASSWORD",
                        message: "Password does not meet security requirements",
                        more: data.error.more,
                    },
                });
            default:
                res.code(500).send({
                    success: false,
                    error: {
                        code: "UNKNOWN_ERROR",
                        message: "Something weird happened, we don't know what either",
                    },
                });
        }
    }

    res.send(data);
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) throw err;

    console.log(`Server is now listening on ${address}`);
});
