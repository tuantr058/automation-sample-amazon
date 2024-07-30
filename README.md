Hello! Thank you for stopping by this repository. 

This project is an automation test suite built using WebdriverIO (WDIO), CucumberJS, Allure Reporter and JavaScript; running on Chrome browser. It was developed as a solution for this test scenario:
- Go to Amazon.com
- Go to Today’s Deals
- Filter the items by “Discount: 10% off or more” 
- View Deal for second item
- Add 2nd item with quantity = 2 into the cart
- Go back to main page
- Search for “AAA Batteries”
- Sort the items by “Feature”
- Add the first 5 items into the cart
- Go to your cart
- Edit the first item quantity - set to 1
- Edit the second item quantity – set to 3
- Delete the first item
- Click “Proceed to Checkout” 


# Table of Contents

- [Getting Started](#getting-started)
  + [Prerequisites](#prerequisites)
  + [Project Structure](#project-structure)
  + [Installation](#installation)
  + [Usage](#usage)
  + [Report](#report)
- [Testing Approach](#testing-approach)
  + [Step 1](#step-1)
  + [About Today's Deals page](#about-todays-deals-page)
    * [Step 2 and 3](#step-2--3)
    * [Step 4 and 5](#step-4--5)
  + [Step 9](#step-9)

## Getting Started
To ensure the test suite is runnable in a Unix environment, and supports cross-platform and cross-browser testing, the project is built with:
- [NodeJS](https://nodejs.org/en/download/package-manager)
- [WebdriverIO](https://webdriver.io/)
- [CucumberJS](https://www.npmjs.com/package/@wdio/cucumber-framework)
- [Allure Reporter](https://allurereport.org/docs/webdriverio/)

About browser, I choose ***Chrome*** with ***non-headless style*** for users to be able to observe how the test runs. You can change browser and testing style in `wdio.conf.js`:
```
export const config = {
    capabilities: [{
        browserName: 'chrome',  // Or 'firefox', 'msedge', 'safari', 'chromium'
        maxInstances: 1,
        'goog:chromeOptions': { // Or 'moz:firefoxOptions', 'ms:edgeOptions'
            args: ['--disable-gpu', '--start-maximized'] // Add 'headless' to apply headless testing style
        }
    }],
```
I have also added [Spec Reporter](https://webdriver.io/docs/spec-reporter/) - a WebdriverIO plugin to report in spec style - to the project for tester/developers to easily observe the log. Here is an example:
![spec-reporter](https://github.com/okeokeokekeo/automation-sample-amazon/assets/43362026/5185d98e-e825-4f81-baac-9ee6d1e69a10)

### Prerequisites
- Java Development Kit version ≥ 18. You can get it here: https://www.oracle.com/java/technologies/downloads/
- A stable internet connection.
- **_Optional_**: a VPN if Amazon litmits or blocks your access.

### Project Structure
```
automation-sample-amazon/
│
├── features/                               # Cucumber feature files
│
│   ├── pageobjects/                           # Page Object Model files
│       ├── AaaBatteriesPage.js                   # Contains actions and element selectors of "AAA Batteries" page
│       ├── CartPage.js                           # Contains actions and element selectors of "Cart" page
│       ├── HomePage.js                           # Contains actions and element selectors of "Home" page
│       ├── ItemPage.js                           # Contains actions and element selectors of "Item" page
│       ├── SignInPage.js                         # Contains actions and element selectors of "SignIn" page
│       └── TodayDealsPage.js                     # Contains actions and element selectors of "Today's Deals" page
│
│   ├── step-definitions/                      # Cucumber step definitions 
│       ├── AaaBatteriesPage.js                   # Defined testing steps for "AAA Batteries" scenario
│       ├── HomePage.js                           # Defined testing steps for "Homepage" scenario
│       └── TodayDealsPage.js                     # Defined testing steps for "Today's Deals" scenario
│
│   ├── ShoppingAmazon.feature                    # Main feature file
│   ├── AaaBatteriesPage.feature                  # Feature file for testing only tag `@pri2`
│   ├── HomePage.feature                          # Feature file for testing only tag `@pri0`
│   ├── TodayDealsPage.feature                    # Feature file for testing only tag `@pri1`
│
├── allure-reports/                            # Contains necessary files for Allure HTML report
│
├── allure-repsults/                           # Test steps results are imported into this folder
│         
├── wdio.conf.js                               # WebdriverIO configuration file
│
└── package.json                               # Project dependencies and scripts
```

### Installation
To set up this project locally, follow these steps:
- Clone the repository:
```
git clone https://github.com/okeokeokekeo/automation-sample-amazon.git
```
- Navigate to the project directory:
```ry
cd /path/to/project
```
- Install dependencies:
```
npm install
```

### Usage
- To run the tests, execute this command:
```
npm run test
```
- To generate then view Allure report after the test is finished, use the following command:
```
npm run allure:generate & npm run allure:serve
```
### Report
- To view status of the test suite, navigate to `Suites`. On this page, users can observe the request, respone, time consumtion... of each test step.
![reporter-suites](https://github.com/okeokeokekeo/automation-sample-amazon/assets/43362026/ac251466-ef05-4588-bdf5-6280954f1aeb)
- User can observe the percentage of passed/failed/... steps of the test suite on `Graph` page.
![reporter-graph](https://github.com/okeokeokekeo/automation-sample-amazon/assets/43362026/65333dd4-25b9-49ed-b8ef-aa1ee087f78b)

## Testing Approach
This section describes how I approach and build solutions for specific steps in the scenario, as they have the most impact on the test results.

### Step 1
This is the most important step and will block other steps if done incorrectly. 

**_Problem_**
- Amazon sets delivery location based on your IP location. In my case, the default location is Viet Nam.
- But most of the items are available only shipping in the US so there is a risk of choosing unvailable items. Therefore, step #5 cannot be performed and also the following steps will be blocked.
- The options presented in the delivery location dropdown shows only country outside the US.
- After changing location, Amazon reloads the page to apply new UI for the specific location. Sometimes, it takes more than 10s to reload.

**_Solution_**
- Use zip code to change the location to a state in the US. I set `96162`, which is presented Truckee town in California.
- Force refresh the page after location changed.
- 
### About Today's Deals page
The "Today's Deals" is a lazy-loaded webpage with items dynamically changing based on Amazon sale-off time. The page consists of 2 sections: `Sale-off for an event time` (green rectangle) and `Sale-off for most of the time` (orange rectangle).
![items-sections](https://github.com/okeokeokekeo/automation-sample-amazon/assets/43362026/0f4d0f9b-a3c0-4fee-836f-7189e6733233)

The left side of the page contains these filters: `Discount`, `Brands`, `Reviews`..., which will not load until user scroll down, make them visible to interact.

About items: 
- There are 2 kinds of items, one tagged `With Prime` and the other tagged `Limited time deal`.
- There are 3 types of items:
  + Clothes: need to select size before changing quantity and adding to cart
  + Electronic products: will ask users if they want warranty coverage before adding to cart
  + Construction tools: will ask users if they want additional accessories before adding to cart

#### Step 2 & 3
**_Problem_**
- The page prioritize loading `Sale-off for an event time` items first then `Sale-off for most of the time` items and the filters, making clicking the filter `Discount 10% off or more` right after accessing "Today's Deals" page returns the "Cannot find element" error message.
- Until user scroll down or wait for about 10-15 seconds, then the filters can be found.
- After applied filter `Discount Discount 10% off or more`, the page needs time to reload.

**_Solution_**
- After navigated to "Today's Deals" page, pause browser for 15 seconds. _Note:_ I set 15 seconds since it works most of the time with my internet connection.
- Pause browser for 6 seconds after applied the filter.

#### Step 4 & 5
**_Problem_**
- The `Sale-off for an event time` section only available for a specific range time and will dissapears when the time runs out. On the opposite, `Sale-off for most of the time` section always visible, it just change the item order.
- The first item after applied filter `Discount 10% off or more` is usually a `With Prime` item, followed by a `Limited time deal` item.
- `With Prime` items require Amazon account.
- Need different processing methods to handle each type of item.

**_Solution_**
- The first `Limited time deal` item is the second item of `Sale-off for most of the time` section → write a function to list all `Limited time deal` items then click to view detail the first item in the list.
- Write functions to handle each type of items:
  + Clothes: select the first choice of size from the dropdown.
  + Electronic products: select "No thanks".
  + Construction tools: select "No thanks".
 
### Step 9
The "AAA Batteries" page consists of 2 sections: `Sponsored batteries` (green rectangle) and `Results batteries` (orange rectangle).
![batteries-sections](https://github.com/okeokeokekeo/automation-sample-amazon/assets/43362026/f4f04e48-5324-4fb2-8812-6fdbeb80e58d)

**_Problem_**
- The xpath selector of needed items in `Results batteries` section has the same format. The only different is their index. For example: `//*[@id="a-autoid-3-announce"]` and `//*[@id="a-autoid-4-announce"]`
- The "Add to cart" button under item's name takes 1-3s to reload after clicking it.
- Should not add more than 1 item at the same time.

**_Solution_**
- Write a function to add items to cart continuously, one-by-one at a time.
