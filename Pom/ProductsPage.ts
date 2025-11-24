import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage{
   readonly addToCart:Locator;
    readonly swagLabsHeading:Locator;
    readonly cartButton:Locator;
    readonly shoppingCartBadge: Locator;
    readonly removeButton: Locator;
    constructor(private page:Page){
        this.addToCart=page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.swagLabsHeading=page.getByText(`Swag Labs`);
        this.cartButton=page.locator(`//*[@data-test="shopping-cart-link"]`);
        this.shoppingCartBadge=page.locator(`//*[@data-test="shopping-cart-badge"]`);
        this.removeButton=page.locator(`//*[@data-test="remove-sauce-labs-backpack]"`)
    }

    async gotoSauceDemoWebsite(){
        await this.page.goto(`https://www.saucedemo.com/inventory.html`);
        await this.swagLabsHeading.waitFor({state:'visible'});
    }

    async addToCartItems(itemList:string[]){
        
        for (const product of itemList) {
            let item=product.toLowerCase();
            console.log(`//*[@data-test="add-to-cart-${item}"]`)
            const button = this.page.locator(`//*[@data-test="add-to-cart-${item}"]`);
            if (await button.isVisible()) {
                await button.click();
            } else {
                console.warn(`Add to cart button not found for item: ${item}`);
            }
        }
    }
    async verifyShoppingCartBadgeCount(count:number){
        await expect(this.shoppingCartBadge).toHaveText(`${count}`);
    }
    async clickOnCartButton(){
        await this.cartButton.click();
    }    

    async removeProductsFromCart(items:string[]){
        //*[@data-test="remove-sauce-labs-backpack"]
        for (const product of items) {
            let item=product.toLowerCase();
            console.log(`//*[@data-test="add-to-cart-${item}"]`)
            const button = this.page.locator(` //*[@data-test="remove-${item}"]`);
            if (await button.isVisible()) {
                await button.click();
            } else {
                console.warn(`Remove button not found for item: ${item}`);
            }
        }

    }
}