const { browser } = require('@wdio/globals')

module.exports = class TodayDealsPage {
    constructor() {
      this.discount10Percent = '//*[@id="DealsGridScrollAnchor"]/div[2]/div[5]/div//*[contains(text(), "10% off or more")]',
      this.limitedTimeDealXPath = '//*[@id="DealsGridScrollAnchor"]/div[3]/div//*[text()="Limited time deal"]'
  }
    async goToTodayDealsPage() {
        await browser.url('https://www.amazon.com/deals?ref_=nav_cs_gb');

        // Pause actions for page to load
        await browser.pause(15000);
      }

    async filter10PercentOffItems(){
      await $(this.discount10Percent).waitForDisplayed({timeout: 10000});
      await $(this.discount10Percent).isClickable();
      await $(this.discount10Percent).click();
      
      // Wait for page to apply the filter
      await browser.pause(6000);
    }

    // Create an array that contains xpath selector 
    // of all items which tagged "Limited time deal"
    // Then click the first item
    async viewFirstItemWithLimitedTimeDeal(){
      const limitedTimeDealItems = await $$(this.limitedTimeDealXPath);
      
      if (limitedTimeDealItems.length === 0) {
        throw new Error('No Limited time deal items found');
    }
      await limitedTimeDealItems[0].scrollIntoView();
      await limitedTimeDealItems[0].click();
    }
}
