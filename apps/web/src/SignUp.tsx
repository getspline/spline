import "./SignUp.css";

export function SignUp() {
    return (
        <div className="form">
            <h3>Welcome to Spline!</h3>
            <label htmlFor="username">Username</label>
            <input type="text" name="email" id="username" placeholder="Make it cool and unique!" />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Don't worry, we won't send spam."
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Keeping your account safe."
            />

            <button>Sign Up!</button>
        </div>
    );
}
