import { mergeTests } from "@playwright/test";
import { test as apiClient } from './BaseFixtures/ApiClient';
import { test as pomObjects } from './BaseFixtures/PomObjects';
import { test as addProductsInCart } from './DataFixtures/AddProductsInCart';

export const test = mergeTests(apiClient,pomObjects,addProductsInCart);