const { browser } = require('@wdio/globals')

module.exports = class AaaBatteriesPage {
    constructor() {
      this.sortDropdown = '//*[@id="a-autoid-0-announce"]'; 
      this.sortedByFeature = '//*[@id="s-result-sort-select_0"]';
      this.toasterItemAdded = '//*[@id="search"]/div[1]/div[1]/div/span[1]/div[1]/div[3]/div/div/div/div/span/div/div/div[3]/div[6]/div/div/div[1]/div/strong[contains(text(), "Item Added")]';
  }

    async sortItemsByFeature(){
      await $(this.sortDropdown).click();
      await $(this.sortedByFeature).click();
      await browser.refresh();
    }

    async addFirst5ItemsToCart(){
      for (let i = 3; i <= 7; i++) {

        const addToCartButton = `//*[@id="a-autoid-${i}-announce"]`;

        try {
          // Wait for the element to exist
          await $(addToCartButton).waitForExist({ timeout: 5000 });
          
          // Scroll into view
          await $(addToCartButton).scrollIntoView();
  
          // Click the button
          await $(addToCartButton).click();
  
          // Wait for the toaster message to be displayed
          await $(this.toasterItemAdded).waitForDisplayed({ timeout: 5000 });
          
          // Pause for a short duration
          await browser.pause(1500);
        } catch (error) {
          console.error(`Error interacting with the element: ${addToCartButton}`, error);
        }
      }
    }
}
