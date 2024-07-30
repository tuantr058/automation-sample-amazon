const { Given, When, Then } = require('@wdio/cucumber-framework')
const HomePage = require('../pageobjects/HomePage.js');
const assert = require('assert');

const homePage = new HomePage();

Given(/^User navigates to the Amazon website$/, async () => {
    await homePage.goToHomePage();

    // Amazon has a mechanism of detecting automation scripts
    // To access its home page, inputting captcha is required
    // The time pause should be changed based on user's internet connection statibility
    await browser.pause(20000); 
});

When(/^User clicks on "Change location" on the toaster$/, async () => {
    await homePage.clickChangeLocation();
});

When(/^User inputs "96162" to the Zipcode box to change delivery location to Truckee$/, async () => {
    await homePage.changeLocationToTruckee();
})

Then(/^User should see the location changes to "Truckee 96162"$/, async () => {
    await browser.refresh();
    const currentLocation = await homePage.getCurrentLocationText();
    console.log(`Current location text: ${currentLocation}`);
    assert.ok(currentLocation.includes('Truckee 96162'), 'currentLocation does not contain "Truckee 96162"');
});