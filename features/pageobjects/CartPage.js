const { browser } = require('@wdio/globals')

module.exports = class CartPage {
    constructor() {
        this.proceedButton = '//*[@id="sc-buy-box-ptc-button"]/span/input', 
        this.quantityDropdownOfFirstItem = '//*[@id="a-autoid-1-announce"]',
        this.quantityDropdownOfSecondItem = '//*[@id="a-autoid-4-announce"]',
        this.quantity0OfFirstItem = '//*[@id="quantity_0"]',
        this.quantity1OfFirstItem = '//*[@id="quantity_1"]',
        this.quantity3OfSecondItem = '//*[@id="quantity_3"]'
    }

    async goToCartPage(){
        await browser.url('https://www.amazon.com/gp/cart/view.html?ref_=nav_cart');
    }

    async setQuantityFirstItemTo2() {
        await $(this.quantityDropdownOfFirstItem).click();
        await $(this.quantity1OfFirstItem).click();
        await browser.refresh();
    }

    async setQuantitySecondItemTo3() {
        await $(this.quantityDropdownOfSecondItem).click();
        await $(this.quantity3OfSecondItem).click();
        await browser.refresh();
    }

    async deleteFirstItem() {
        await $(this.quantityDropdownOfFirstItem).click();
        await $(this.quantity0OfFirstItem).click();
        await browser.refresh();
    }

    async clickProceedButton() {
        await $(this.proceedButton).click();
    }
}
