import { node } from "@elysia/node";
import { Elysia } from "elysia";
import { auth as authConfig } from "@splinehq/auth";
import { loadModules } from "./loader.js";

const app = new Elysia({ adapter: node() });

app.mount(authConfig.handler);

const modules = await loadModules();

modules.forEach((mod) => {
    Object.entries(mod.versions).forEach(([version, plugin]) => {
        app.group(`/api/${version}/${mod.name}`, (group) => group.use(plugin));
    });
});

app.listen(3000, ({ hostname, port, error }) => {
    if (error) throw error;

    console.log(`Server is now listening on ${hostname}:${port}`);
});
