import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
    esbuild: {
        target: "esnext",
    },
    plugins: [react(), tsconfigPaths()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
