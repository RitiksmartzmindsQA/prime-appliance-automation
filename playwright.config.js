// @ts-check

import { defineConfig } from "@playwright/test";
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

  },

  projects: [
    {
      name: "rja-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "rja" },
    },

    {
      name: "rja",
      testMatch: "rja/**/*.spec.js",
      dependencies: ["rja-auth-setup"],
      use: { storageState: "auth/rja-auth.json" },
    },

    {
      name: "ptp-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "ptp" },
    },

    {
      name: "ptp",
      testMatch: "ptp/**/*.spec.js",
      dependencies: ["ptp-auth-setup"],
      use: { storageState: "auth/ptp-auth.json" },
    },

    {
      name: "b2c",
      testMatch: "b2c/**/*.spec.js",
    },
  ],
});
