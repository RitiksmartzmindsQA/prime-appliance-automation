// @ts-check

import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",

  use: {

    browserName: "chromium",

    viewport: {
      width: 1920,
      height: 1080,
    },

    trace: "on",

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    launchOptions: {

      args: ["--start-maximized"],

    },

  },

  projects: [
    {
      name: "rja-auth-setup",
      testMatch: "setup/auth.setup.js",
    },
    {
      name: "rja",
      testMatch: "rja/**/*.spec.js",
      dependencies: ["rja-auth-setup"],
      use: {
        storageState: "auth/rja-auth.json",
      },
    },
    {
      name: "b2c",
      testMatch: "b2c/**/*.spec.js",
    },
  ],
});
