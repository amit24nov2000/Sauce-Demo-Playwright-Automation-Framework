import {Page} from '@playwright/test';
import { testing } from '../Pages/testing';
import test from 'node:test';

export class CreateObjectForAllPomClases{
    readonly obj1: testing;
    constructor(page:Page){
        this.obj1=new testing(page);
    }
}