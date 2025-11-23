import {  request,test as baseTest } from '@playwright/test';
import { ApiClient } from '../../Types/Fixtures/BaseFixtures/ApiClient';


export const test =baseTest.extend<ApiClient>({
    apiClient:async({},use)=>{
        const client =await request.newContext({
            baseURL:'https://www.saucedemo.com',
            extraHTTPHeaders:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${process.env.workerApiToken}`
            }
        })
        await use(client);
    }
})