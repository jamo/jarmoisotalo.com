import { cloudflare } from "@cloudflare/vite-plugin";
import vinext from "vinext";
import { defineConfig } from "vite";

const isDev = process.env.NODE_ENV !== "production" && !process.argv.includes("build");

export default defineConfig({
  plugins: [
    vinext(),
    ...(isDev
      ? []
      : [
          cloudflare({
            viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
          }),
        ]),
  ],
});
