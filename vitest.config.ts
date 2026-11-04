import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./QA/unit/setup.ts"],
    include: ["QA/unit/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    globals: true,
  },
});
