import {test as setup, expect} from '@playwright/test';

setup('Loging and Save storage state',async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator(`//*[@type="submit"]`).click();
    await page.waitForURL(`https://www.saucedemo.com/inventory.html`);
    await page.context().storageState({path:'storage/auth.json'});
})