import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/DepBibleTest',
  fullyParallel: true,
  retries: 3,
  workers: 1,
  reporter: [['html']],
  timeout: 240000,
  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.kingbillycasino.com'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
