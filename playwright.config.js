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

    viewport: null,

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
      metadata: { portalName: "rja" },
    },

    {
      name: "rja",
      testMatch: "rja/**/*.spec.js",
      dependencies: ["rja-auth-setup"],
      use: { storageState: "auth/rja-auth.json" },
    },

    {
      name: "compliance-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "compliance" },
    },

    {
      name: "compliance",
      testMatch: "compliance/**/*.spec.js",
      dependencies: ["compliance-auth-setup"],
      use: { storageState: "auth/compliance-auth.json" },
    },

    {
      name: "ivd-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "ivd" },
    },

    {
      name: "ivd",
      testMatch: "ivd/**/*.spec.js",
      dependencies: ["ivd-auth-setup"],
      use: { storageState: "auth/ivd-auth.json" },
    },

    {
      name: "sa-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "sa" },
    },

    {
      name: "sa",
      testMatch: "sa/**/*.spec.js",
      dependencies: ["sa-auth-setup"],
      use: { storageState: "auth/sa-auth.json" },
    },

    {
      name: "sap-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "sap" },
    },

    {
      name: "sap",
      testMatch: "sap/**/*.spec.js",
      dependencies: ["sap-auth-setup"],
      use: { storageState: "auth/sap-auth.json" },
    },

    {
      name: "pricing-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "pricing" },
    },

    {
      name: "pricing",
      testMatch: "pricing/**/*.spec.js",
      dependencies: ["pricing-auth-setup"],
      use: { storageState: "auth/pricing-auth.json" },
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
      name: "b2b-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "b2b" },
    },

    {
      name: "b2b",
      testMatch: "b2b/**/*.spec.js",
      dependencies: ["b2b-auth-setup"],
      use: { storageState: "auth/b2b-auth.json" },
    },

    {
      name: "soi-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "soi" },
    },

    {
      name: "soi",
      testMatch: "soi/**/*.spec.js",
      dependencies: ["soi-auth-setup"],
      use: { storageState: "auth/soi-auth.json" },
    },

    {
      name: "pap-auth-setup",
      testMatch: "setup/auth.setup.js",
      metadata: { portalName: "pap" },
    },

    {
      name: "pap",
      testMatch: "pap/**/*.spec.js",
      dependencies: ["pap-auth-setup"],
      use: { storageState: "auth/pap-auth.json" },
    },

    {
      name: "b2c",
      testMatch: "b2c/**/*.spec.js",
    },
  ],
});
