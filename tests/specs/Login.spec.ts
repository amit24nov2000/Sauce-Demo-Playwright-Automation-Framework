import { test } from "../../Fixtures/BaseFixtures/PomObjects";

test('Login Test', async ({ page ,loginPage}) => {
  await page.goto('/');
  await loginPage.Login('standard_user','secret_sauce');
  await page.context().storageState({path:'storage/auth.json'})
  
});
