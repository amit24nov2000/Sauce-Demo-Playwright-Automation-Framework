import {test as baseTest} from '@playwright/test';
import { PomObjects } from '../../Types/Fixtures/BaseFixtures/PomObjects';
import { LoginPage } from '../../Pom/LoginPage';
import { ProductsPage } from '../../Pom/ProductsPage';
import { CheckoutPage } from '../../Pom/CheckoutPage';


export const test =baseTest.extend<PomObjects>({
   loginPage: async ({page},use)=>{
    await use(new LoginPage(page));
   },
   productsPage: async ({page},use)=>{
    await use(new ProductsPage(page));
   },
   checkoutPage: async ({page},use)=>{
    await use(new CheckoutPage(page));
   }
})