import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  server: {
    port: 3000,
    https: true,
    host: true,
  },
  plugins: [react(), basicSsl()],
  base:
    process.env.NODE_ENV === "production" ? "/shikantazapp/" : undefined,
});
