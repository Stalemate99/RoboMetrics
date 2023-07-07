import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  ...(process.env.NODE_ENV === "development"
    ? {
        define: {
          global: {},
        },
      }
    : {}),
  resolve: {
    alias: {
      ...(process.env.NODE_ENV !== "development"
        ? {
            "./runtimeConfig": "./runtimeConfig.browser", //fix production build
          }
        : {}),
    },
  },
  plugins: [react()],
});
