import {test as base} from '@playwright/test';
import { CreateObjectForAllPomClases } from './createObjectsForAllPomClases';

type MyFixtures = {
  AllObjects: CreateObjectForAllPomClases;
};

export const test = base.extend<MyFixtures>({
  AllObjects: async ({page}, use) => {
    const AllObjects = new CreateObjectForAllPomClases(page);
    await use(AllObjects);
  },
});