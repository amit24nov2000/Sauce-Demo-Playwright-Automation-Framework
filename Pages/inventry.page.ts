import { test,Page, Locator } from "@playwright/test";

export class inventryPage{
    readonly addToCart:Locator;
    readonly swagLabsHeading:Locator;
    constructor(private page:Page){
        this.addToCart=page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.swagLabsHeading=page.getByText(`Swag Labs`);
    }

    async gotoSauceDemoWebsite(){
        await this.page.goto(`https://www.saucedemo.com/inventory.html`);
        await this.swagLabsHeading.waitFor({state:'visible'});
    }

    
}