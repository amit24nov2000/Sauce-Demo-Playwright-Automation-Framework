import { expect, Locator, Page } from "@playwright/test"

export class LoginPage{
    readonly userNameInputField:Locator;
    readonly passwordInputField:Locator;
    readonly loginButton:Locator;
    constructor(private page:Page){
        this.userNameInputField=this.page.getByPlaceholder('Username');
        this.passwordInputField=this.page.getByPlaceholder('Password');
        this.loginButton= this.page.locator(`//*[@name="login-button"]`);
    }
    async Login(userName:string, password:string){
        try{
            await this.userNameInputField.fill(userName);
            await this.passwordInputField.fill(password);
            await this.loginButton.click();
            await expect(this.loginButton).toBeHidden();
        }
        catch(error){
            console.log("Not able to login"+error);
            throw error;
        }
    }
}