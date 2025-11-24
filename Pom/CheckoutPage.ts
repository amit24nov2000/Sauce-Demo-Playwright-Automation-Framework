import { Locator, Page } from "@playwright/test";

export class CheckoutPage{
    readonly checkoutButton : Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton:Locator;
    readonly finishButton:Locator;
    readonly verifyOrderFinalStatement: Locator;
    
   constructor(private page:Page){
        this.checkoutButton=page.locator(`//*[@data-test="checkout"]`);
        this.firstName=page.getByPlaceholder(`First Name`);
        this.lastName=page.getByPlaceholder(`Last Name`);
        this.postalCode=page.getByPlaceholder(`Zip/Postal Code`);
        this.continueButton=page.locator(`//*[@data-test="continue"]`);
        this.finishButton=page.locator(`//*[@data-test="finish"]`);
        this.verifyOrderFinalStatement=page.getByText(`Thank you for your order!`)

    }

    async performCheckoutOperation(){
        await this.checkoutButton.waitFor({state:'visible'});
        await this.checkoutButton.click();      
    }

    async fillInformationBox(){
        await this.firstName.waitFor({state:'visible'});
        await this.firstName.fill('test');
        await this.lastName.fill('test');
        await this.postalCode.fill('123456');
    }

    async clickContinue(){
        await this.continueButton.click();
    }

    async finishOperation(){
        await this.finishButton.click();
    }

    async verifyFinalStatement(){
        await this.verifyOrderFinalStatement.waitFor({state:'visible'});   
    }
    
}