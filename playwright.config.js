// @ts-check

import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 1,
  timeout: 120000,
  workers: 1,
  reporter: process.env.CI ? [['line'], ['html', { open: 'never' }]] : 'html',
  expect: {timeout: 10000,},

  use: {
    browserName: 'chromium',

    ...(process.env.CI
      ? {
          channel: 'chrome',
        }
      : {}),

    viewport: process.env.CI
      ? {
          width: 1366,
          height: 768,
        }
      : null,

    trace: process.env.CI ? 'retain-on-failure' : 'on',

    screenshot: 'only-on-failure',

    video: process.env.CI ? 'off' : 'retain-on-failure',

    launchOptions: process.env.CI
      ? undefined
      : {
          args: ['--start-maximized'],
        },
  },

  projects: [
    {
      name: 'rja-auth-setup',
      testMatch: 'setup/auth.setup.js',
      metadata: { portalName: 'rja' },
    },

    {
      name: 'rja',
      testMatch: 'rja/**/*.spec.js',
      dependencies: ['rja-auth-setup'],
      use: { storageState: 'auth/rja-auth.json' },
    },

    {
      name: 'ivd-auth-setup',
      testMatch: 'setup/auth.setup.js',
      metadata: { portalName: 'ivd' },
    },

    {
      name: 'ivd',
      testMatch: 'ivd/**/*.spec.js',
      dependencies: ['ivd-auth-setup'],
      use: { storageState: 'auth/ivd-auth.json' },
    },

    {
      name: 'ptp-auth-setup',
      testMatch: 'setup/auth.setup.js',
      metadata: { portalName: 'ptp' },
    },

    {
      name: 'ptp',
      testMatch: 'ptp/**/*.spec.js',
      dependencies: ['ptp-auth-setup'],
      use: { storageState: 'auth/ptp-auth.json' },
    },

    {
      name: 'b2b-auth-setup',
      testMatch: 'setup/auth.setup.js',
      metadata: { portalName: 'b2b' },
    },

    {
      name: 'b2b',
      testMatch: 'b2b/**/*.spec.js',
      dependencies: ['b2b-auth-setup'],
      use: { storageState: 'auth/b2b-auth.json' },
    },

    {
      name: 'pap-auth-setup',
      testMatch: 'setup/auth.setup.js',
      metadata: { portalName: 'pap' },
    },

    {
      name: 'pap',
      testMatch: 'pap/**/*.spec.js',
      dependencies: ['pap-auth-setup'],
      use: { storageState: 'auth/pap-auth.json' },
    },

    {
      name: 'soi-auth-setup',
      testMatch: 'setup/auth.setup.js',
      metadata: { portalName: 'soi' },
    },

    {
      name: 'b2c',
      testMatch: 'b2c/**/*.spec.js',
    },

    {
      name: 'sa',
      testMatch: 'sa/**/*.spec.js',
    },

    {
      name: 'soi',
      testMatch: 'soi/**/*.spec.js',
      dependencies: ['soi-auth-setup'],
      use: { storageState: 'auth/soi-auth.json' },
    },
  ],
});
