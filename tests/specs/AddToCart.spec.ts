import { test } from '../../Fixtures/Index';

test('Choose multiple items',async({page,productsPage,productsToAdd})=>{
    await productsPage.gotoSauceDemoWebsite();
    await productsPage.addToCartItems(productsToAdd);
    await productsPage.verifyShoppingCartBadgeCount(productsToAdd.length);
    await productsPage.removeProductsFromCart(productsToAdd);   
})

test('Choose multiple items using API and Remove those items',async({page,productsPage,productsToAdd,checkoutPage})=>{
    await productsPage.gotoSauceDemoWebsite();
    await productsPage.addToCartItems(productsToAdd);
    await productsPage.verifyShoppingCartBadgeCount(productsToAdd.length);
    await productsPage.clickOnCartButton();
    await checkoutPage.performCheckoutOperation();
    await checkoutPage.fillInformationBox();
    await checkoutPage.clickContinue();
    await checkoutPage.finishOperation();
    await checkoutPage.verifyFinalStatement();
})

