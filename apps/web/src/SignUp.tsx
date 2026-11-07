import { Input } from "./components/Input";
import auth from "./lib/api/auth";
import "./SignUp.css";
import { IconKeyFilled, IconMailFilled, IconUserFilled } from "@tabler/icons-react";

type SignUpDetails = {
    username: string;
    email: string;
    password: string;
};

export function SignUp() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        if (!form.reportValidity()) return;

        const data: SignUpDetails = Object.fromEntries(new FormData(form)) as SignUpDetails;

        try {
            await auth.signUp(data.username, data.email, data.password);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="root">
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="header">Create an Account</h3>
                <Input
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Enter a username"
                    autoComplete="username"
                    label="Username"
                    startIcon={<IconUserFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter an email"
                    autoComplete="email"
                    label="Email"
                    startIcon={<IconMailFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    autoComplete="new-password"
                    label="Password"
                    startIcon={<IconKeyFilled width={18} height={18} />}
                    className="surface--inset shadow"
                    required={true}
                ></Input>
                <button id="signUp" className="surface--raised shadow primary" type="submit">
                    Sign Up!
                </button>
            </form>
        </div>
    );
}
