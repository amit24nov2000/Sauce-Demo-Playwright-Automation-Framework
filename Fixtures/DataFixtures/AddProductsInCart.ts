import { test as baseTest } from '@playwright/test';
import { AddProductsInCart } from '../../Types/Fixtures/DataFixtures/AddProductsInCart';
import fs from 'fs';

export const test = baseTest.extend<AddProductsInCart>({
    productsToAdd: async ({}, use) => {
      let productsToAdd:AddProductsInCart=await JSON.parse(fs.readFileSync('storage/JsonPayloads/AddProductsInCart.json','utf8')) ;
      await use(productsToAdd.productsToAdd);
    },
  });