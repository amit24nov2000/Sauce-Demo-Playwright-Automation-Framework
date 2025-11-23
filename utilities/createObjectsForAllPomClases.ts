import {Page} from '@playwright/test';
import { testing } from '../Pages/testing';
import test from 'node:test';
import { inventryPage } from '../Pages/inventry.page';

export class CreateObjectForAllPomClases{
    readonly inventryPage: inventryPage;
    constructor(page:Page){
        this.inventryPage=new inventryPage(page);
    }
}