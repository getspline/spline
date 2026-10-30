async function signUp(username: string, email: string, password: string) {
    const req = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    const data = await req.json();

    if (!req.ok) {
        throw new Error(data.error ?? "Failed to sign up");
    }

    return data;
}

export default {
    signUp,
};
