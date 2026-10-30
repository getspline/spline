import { Input } from "./components/Input";
import "./SignUp.css";
import { IconKeyFilled, IconMailFilled, IconUserFilled } from "@tabler/icons-react";

export function SignUp() {
    return (
        <div className="root">
            <div className="form">
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
                ></Input>
                <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    autoComplete="current-password"
                    label="Password"
                    startIcon={<IconKeyFilled width={18} height={18} />}
                    className="surface--inset shadow"
                ></Input>
                <button id="signUp" className="surface--raised shadow primary">
                    Sign Up!
                </button>
            </div>
            <div className="image"></div>
        </div>
    );
}
