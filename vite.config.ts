import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// User site (rfluid.github.io) is served from the root, so base is "/".
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
