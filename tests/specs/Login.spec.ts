import { test } from "../../Fixtures/BaseFixtures/PomObjects";

test('Login Test', async ({ page ,loginPage}) => {
  await page.goto('https://www.saucedemo.com/');
  await loginPage.Login('standard_user','secret_sauce');
  await page.context().storageState({path:'storage/auth.json'});
  
});
