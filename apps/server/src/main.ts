import { node } from "@elysia/node";
import { Elysia } from "elysia";
import { auth as authConfig } from "@splinehq/auth";

const app = new Elysia({ adapter: node() });

app.mount(authConfig.handler);

app.listen(3000, ({ hostname, port, error }) => {
    if (error) throw error;

    console.log(`Server is now listening on ${hostname}:${port}`);
});
