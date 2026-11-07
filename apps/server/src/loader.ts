import { Elysia } from "elysia";
import fs from "node:fs/promises";

export async function loadModules() {
    const modules: {
        name: string;
        versions: Array<() => Elysia>;
    }[] = [];
    const moduleFolders = await fs.readdir("./src/modules");

    await Promise.all(
        moduleFolders.map(async (folder) => {
            try {
                const { default: index } = await import(`./modules/${folder}/index.js`);

                const name = index.name;
                const versions = index.versions;

                modules.push({ name, versions });
            } catch (e) {
                console.error(e);
            }
        }),
    );

    return modules;
}
