import { APIRequestContext, expect } from "@playwright/test";

export class ApiUtils{
    constructor(private apiClient:APIRequestContext){
        this.apiClient=apiClient;
    }
    async addProductsInCart(){
       let parsedResponse;
       try{
         let response= await this.apiClient.post('/cart/add',{
            data:{
                productId:1
            }
        });
        parsedResponse=await response.json();
        expect(response.ok()).toBeTruthy();
       }
       catch(error){
        console.log("Not able to add products in cart"+"\n"+parsedResponse);
        throw error;
       }

    }
}