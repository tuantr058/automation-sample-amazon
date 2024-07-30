const { browser } = require('@wdio/globals')

module.exports = class ItemPage {
    constructor() {
        // Items with no additional 
        this.quantityDropdown = '//*[@id="a-autoid-0-announce"]',
        this.quantityOf2 = '//*[@id="quantity_1"]',
        

        // Items with warranty attached, which will open after clicking "Add to cart" button
        this.warrantyAttachTitle = '//*[@id="attach-warranty-header"]',
        this.noWarrantyAttachButton = '//*[@id="attachSiNoCoverage-announce"]',

        // Items with recommened attached, which will open after clicking "Add to cart" button
        this.recommnendedItemsTitle = '//*[@id="a-popover-2"]',
        this.noRecommendedItemsButton = '//*[@id="abb-intl-pop-cta"]/span[3]/span',

        // Items such as clothes have to select size. After that, "Add to cart" button will appear
        this.sizeSelectedDropdown = '//*[@id="dropdown_selected_size_name"]',
        this.sizeSelected = '//*[@id="size_name_0"]',

        // Actions button
        this.addToCartButton = '//*[@id="add-to-cart-button"]',
        this.itemAddedToCart = '//*[@id="NATC_SMART_WAGON_CONF_MSG_SUCCESS"]/h1'
      }
    
      async changeItemQuantityTo2() {
        await $(this.quantityDropdown).click();
        await $(this.quantityOf2).click();
      }

      async clickAddToCartButton(){
        await $(this.addToCartButton).click();
      }
      
      async cancelWarrantyAttach(){
        const isAddToYourOrderDisplayed = await $(this.warrantyAttachTitle).isDisplayed();

        if (isAddToYourOrderDisplayed){
          await $(this.noWarrantyAttachButton).waitForDisplayed({ timeout: 2000 });
          await $(this.noWarrantyAttachButton).click();
        } 
      }

      async cancelAdditionalItems(){
        const isAdditionalItemsPopup = await $(this.recommnendedItemsTitle).isDisplayed();

        if (isAdditionalItemsPopup){
          await $(this.noRecommendedItemsButton).click();
        }
      }

      async selectItemSize(){
        const isSelectSizeDropdownDisplayed = await $(this.sizeSelectedDropdown).isDisplayed();

        if (isSelectSizeDropdownDisplayed){
          await $(this.sizeSelectedDropdown).click();
          await $(this.sizeSelected).click();
          // Wait for browser to reload "Add to cart" button
          await browser.pause(3000);
        }
      }

      async verifyItemAddedToCart() {
        return await $(this.itemAddedToCart).isDisplayed();
      }
    }