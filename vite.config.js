import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/professional-portfolio-builder/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
