const { Given, When, Then } = require('@wdio/cucumber-framework');

const HomePage = require('../pageobjects/HomePage.js');
const AaaBatteriesPage = require('../pageobjects/AaaBatteriesPage.js');
const CartPage = require('../pageobjects/CartPage.js');
const SignInPage = require('../pageobjects/SignInPage.js');

const homePage = new HomePage();
const cartPage = new CartPage();
const aaaBatteriesPage = new AaaBatteriesPage();
const signInPage = new SignInPage();


Given(/^User navigates to Amazon homepage$/, async () => {
    await homePage.goToHomePage();
    //await browser.pause('20000');
});

When(/^User searchs for "AAA batteries" from the searchbox$/, async () => {
    await homePage.searchForItem('AAA Batteries');
});

When(/^User chooses to sort the items by their feature$/, async () => {
    await aaaBatteriesPage.sortItemsByFeature();
});

When(/^User adds first 5 items of the first row to the cart$/, async () => {
    await aaaBatteriesPage.addFirst5ItemsToCart();
});

When(/^User goes to cart$/, async () => {
    await cartPage.goToCartPage();
    await browser.pause(1000);
});

When(/^User changes the quantity of the first item to 1$/, async () => {
    await cartPage.setQuantityFirstItemTo2();
});

When(/^User changes the quantity of the second item to 3$/, async () => {
    await cartPage.setQuantitySecondItemTo3();
});

When(/^User deletes the first item$/, async () => {
    await cartPage.deleteFirstItem();
});

When(/^User proceeds to check out$/, async () => {
    await cartPage.clickProceedButton();
});

Then(/^User should be navigated to sign in page$/, async () => {
    await signInPage.getSignInText();
});