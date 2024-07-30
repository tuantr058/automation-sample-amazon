const { browser } = require('@wdio/globals')

module.exports = class HomePage {
    constructor() {
        this.changeAddressButton = '//*[@id="nav-main"]/div[1]/div/div/div[3]/span[2]/span/input',
        this.inputZipcodeBox = '//*[@id="GLUXZipUpdateInput"]',
        this.clickApplyButton = '//*[@id="GLUXZipUpdate"]/span/input',
        this.clickConfirmationButton = '//*[@id="a-popover-1"]/div/div[2]/span/span/input[@id="GLUXConfirmClose"]',
        this.currentLocation = '//*[@id="glow-ingress-line2"]',
        this.searchBox = '//*[@id="twotabsearchtextbox"]',
        this.submitButton = '//*[@id="nav-search-submit-button"]'
      }
    
      async goToHomePage() {
        // Navigate to Amazon homepage
        await browser.url('https://www.amazon.com')
      }
    
      async clickChangeLocation() {
        await $(this.changeAddressButton).waitForClickable({ timeout: 1000 });
        await $(this.changeAddressButton).click();
        await browser.pause(1000);
      }

      async changeLocationToTruckee(){
        await $(this.inputZipcodeBox).waitForDisplayed();
        await $(this.inputZipcodeBox).setValue('96162');
        await $(this.clickApplyButton).click();
        await browser.pause(2000);
        await $(this.clickConfirmationButton).waitForClickable();
        await $(this.clickConfirmationButton).click();
      }
    
      async getCurrentLocationText() {
        await browser.pause(1000);
        return await $(this.currentLocation).getText();
      }

      async searchForItem(item) {
        await $(this.searchBox).setValue(item);
        await browser.keys('Enter');
      }
    }