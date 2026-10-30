import { auth, isAPIError, type APIError } from "@splinehq/auth";

type Result<T, E = AppError> = { success: true; data: T } | { success: false; error: E };

type AppError = {
    code: string;
    message: string;
    more?: any;
};

type User = {
    token: string | null;
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        username?: string | null | undefined;
        displayUsername?: string | null | undefined;
    };
};

const CREDENTIAL_ERROR_CODES = new Set([
    "INVALID_EMAIL_OR_PASSWORD",
    "INVALID_USERNAME_OR_PASSWORD",
]);

const ERROR_MESSAGES: Record<string, string> = {
    EMAIL_NOT_VERIFIED: "Verify your email before signing in",
    PASSWORD_TOO_LONG: "Password is too long",
    INVALID_USERNAME: "Username is invalid",
    USERNAME_TOO_SHORT: "Username is too short",
    USERNAME_TOO_LONG: "Username is too long",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "That email is already registered",
    USERNAME_IS_ALREADY_TAKEN: "That username is taken",
};

const REGEX_QUERIES: Record<string, RegExp> = {
    UPPERCASE_LETTER: /[A-Z]/,
    SPECIAL_CHARACTER: /[^a-zA-Z0-9]/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    USERNAME: /^[a-zA-Z0-9_.]{3,32}$/,
};

function toAppError(error: APIError): AppError {
    const code = error.body?.code;

    if (code && CREDENTIAL_ERROR_CODES.has(code)) {
        return {
            code: "INVALID_CREDENTIALS",
            message: "Invalid email/username or password",
        };
    }

    if (code) {
        return {
            code,
            message: ERROR_MESSAGES[code] ?? error.body?.message ?? error.message,
        };
    }

    if (error.status === "UNPROCESSABLE_ENTITY") {
        return {
            code: "INVALID_EMAIL",
            message: "Email does not match a normal email format",
        };
    }

    return { code: "UNKNOWN_ERROR", message: error.message };
}

function validatePassword(password: string): AppError | null {
    if (!password) {
        return {
            code: "PASSWORD_DOESNT_EXIST",
            message: "Password doesn't exist",
        };
    }

    const problems: string[] = [];

    if (password.length < 8) {
        problems.push("Password is too short");
    }

    if (!REGEX_QUERIES.UPPERCASE_LETTER!.test(password)) {
        problems.push("Password must contain at least one uppercase letter");
    }

    if (!REGEX_QUERIES.SPECIAL_CHARACTER!.test(password)) {
        problems.push("Password must contain at least one special character");
    }

    if (problems.length > 0) {
        return {
            code: "PASSWORD_HAS_PROBLEMS",
            message: "Password has multiple problems, check more for them.",
            more: problems,
        };
    }

    return null;
}

async function signUp(email: string, username: string, password: string): Promise<Result<User>> {
    if (!email || !username || !password) {
        return {
            success: false,
            error: {
                code: "INVALID_REQUEST",
                message: "No username, email, or password was/were provided",
            },
        };
    }

    username = username.trim();
    email = email.trim();

    if (!REGEX_QUERIES.EMAIL!.test(email)) {
        return {
            success: false,
            error: {
                code: "INVALID_EMAIL",
                message: "Email does not match a normal email format",
            },
        };
    }

    if (!REGEX_QUERIES.USERNAME!.test(username)) {
        return {
            success: false,
            error: {
                code: "INVALID_USERNAME",
                message: "Username contains blocked characters",
            },
        };
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
        return {
            success: false,
            error: {
                code: "INVALID_PASSWORD",
                message: "Password does not meet security requirements",
                more: passwordError.more,
            },
        };
    }

    try {
        const data = await auth.api.signUpEmail({
            body: {
                email,
                name: username,
                password,
                username,
                displayUsername: username,
            },
        });

        return { success: true, data };
    } catch (error) {
        if (!isAPIError(error)) throw error;
        return { success: false, error: toAppError(error) };
    }
}

async function signIn(emailOrUsername: string, password: string): Promise<Result<User>> {
    const identifier = emailOrUsername?.trim() ?? "";

    if (!identifier || !password) {
        return {
            success: false,
            error: {
                code: "INVALID_REQUEST",
                message: "No email/username or password was provided",
            },
        };
    }

    try {
        const data = identifier.includes("@")
            ? await auth.api.signInEmail({ body: { email: identifier, password } })
            : await auth.api.signInUsername({ body: { username: identifier, password } });

        return { success: true, data };
    } catch (error) {
        if (!isAPIError(error)) throw error;
        return { success: false, error: toAppError(error) };
    }
}

export default { signUp, signIn };
