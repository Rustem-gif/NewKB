import { test as base, expect } from '@playwright/test';
import KingBilly from '../PageManager/KingBilly';

type TestFixtures = {
  kingBilly: KingBilly;
};

export const test = base.extend<TestFixtures>({
  kingBilly: async ({ page }, use) => {
    const kingBilly = new KingBilly(page);
    await use(kingBilly);
  },
});

export { expect } from '@playwright/test';
