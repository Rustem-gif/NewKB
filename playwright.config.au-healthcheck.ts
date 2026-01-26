import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/AUHealth',
  /* Run tests in files in parallel */
  fullyParallel: true,

  timeout: 240000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    [
      'playwright-qase-reporter',
      {
        // debug: true,
        mode: 'testops',
        logging: true,
        testops: {
          api: {
            token: '2b3e65ab1ee17f1440a13c94b9d1da5429f590fdbcc8d080ddc41268ae50305b',
          },
          project: 'HC',
          uploadAttachments: true,
          run: {
            complete: true,
            title: process.env.TEST_RUN_TITLE || 'KB Automated Run',
          },
        },
      },
    ],
  ],

  use: {
    headless: true,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    baseURL: 'https://kingbillywin29.com',

    proxy: {
      username:
        'geonode_Zr3aVjywHC-type-residential-country-au-state-queensland-city-brisbane-asn-1221',
      password: 'bebe29a2-c13b-4aa5-8c20-eb3dd10a8afd',
      server: 'proxy.geonode.io:9000',
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'au-healthcheck',
      testDir: './tests/AUHealth',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'au-healthcheck-fast',
      testDir: './tests/AUHealth',
      use: { ...devices['Desktop Chrome'] },
      grep: /@fast/,
    },
  ],
});
