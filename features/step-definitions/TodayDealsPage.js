const { Given, When, Then } = require('@wdio/cucumber-framework')
const TodayDealsPage = require('../pageobjects/TodayDealsPage.js');
const ItemPage = require('../pageobjects/ItemPage.js');

const todayDealsPage = new TodayDealsPage();
const itemPage = new ItemPage();

Given(/^User navigates to the Amazon Today's Deals page$/, async () => {
    await todayDealsPage.goToTodayDealsPage();
});

When(/^User filters items by selecting "Discount 10% off or more"$/, async () => {
    await todayDealsPage.filter10PercentOffItems();
});

When(/^User clicks to view details of the first item with tag "Limited time deal"$/, async () => {
    await todayDealsPage.viewFirstItemWithLimitedTimeDeal();
});

When(/^User changes the item quantity to 2$/, async () => {
    await itemPage.selectItemSize();
    await itemPage.changeItemQuantityTo2();
});

When(/^User clicks the "Add to cart" button$/, async () => {
    await itemPage.clickAddToCartButton();
});

Then(/^User handles additional offers if present$/, async () => {
    await itemPage.cancelWarrantyAttach();
});


Then(/^User should see the item added to the cart$/, async () => {
    await itemPage.verifyItemAddedToCart();
});