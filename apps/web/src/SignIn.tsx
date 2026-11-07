import { Input } from "./components/Input";
import auth from "./lib/api/auth";
import "./SignIn.css";
import { IconKeyFilled, IconUserFilled } from "@tabler/icons-react";

type SignInDetails = {
    usernameOrEmail: string;
    password: string;
};

export function SignIn() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        if (!form.reportValidity()) return;

        const data: SignInDetails = Object.fromEntries(new FormData(form)) as SignInDetails;

        try {
            if (data.usernameOrEmail.includes("@")) {
                await auth.signInEmail(data.usernameOrEmail, data.password);
            } else {
                await auth.signInUsername(data.usernameOrEmail, data.password);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="root">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="header">Sign In</h3>
                <Input
                    name="usernameOrEmail"
                    id="usernameOrEmail"
                    type="text"
                    placeholder="Enter your username or email"
                    autoComplete="username"
                    label="Username or email"
                    startIcon={<IconUserFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    label="Password"
                    startIcon={<IconKeyFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <p id="redirect">
                    Don't have an account? <a href="/signup">Sign up instead.</a>
                </p>
                <button id="signIn" className="surface--raised shadow primary" type="submit">
                    Sign In!
                </button>
            </form>
        </div>
    );
}
