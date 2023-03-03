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
});
