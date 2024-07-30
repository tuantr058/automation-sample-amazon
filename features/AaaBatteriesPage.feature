Feature: User buys AAA batteries

  Scenario: User buys AAA batteries

    Given User navigates to Amazon homepage
    When User searchs for "AAA batteries" from the searchbox
    And User chooses to sort the items by their feature
    And User adds first 5 items of the first row to the cart
    And User goes to cart
    And User changes the quantity of the first item to 1
    And User changes the quantity of the second item to 3
    And User deletes the first item
    And User proceeds to check out
    Then User should be navigated to sign in page