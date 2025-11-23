import { test } from '../../utilities/fixture';
import { expect } from '@playwright/test';

test('has title', async ({ page, AllObjects}) => {
  
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Expect a title "to contain" a substring.
  await page.waitForTimeout(5000);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
