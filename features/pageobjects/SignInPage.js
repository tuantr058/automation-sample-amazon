const { browser } = require('@wdio/globals')

module.exports = class SignInPage {
    constructor(){
        this.signInText = '//*[@id="authportal-main-section"]/div[2]/div[2]/div[1]//*[contains(text(), "Sign in")]'
    }

    async getSignInText(){
        await $(this.signInText).waitForDisplayed({ timeout: 2000});
        return await $(this.signInText).getText();
    }
}
