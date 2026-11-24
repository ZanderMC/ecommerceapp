import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./QA",
  workers: 1,
  reporter: [["html", { outputFolder: "QA/evidence/playwright-report" }], ["list"]],
  use: {
    baseURL: "http://127.0.0.1:3001",
    trace: "on",
    screenshot: "on",
    video: "on",
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      NEXT_E2E: "1",
      NEXT_PUBLIC_APP_URL: "http://127.0.0.1:3001",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
