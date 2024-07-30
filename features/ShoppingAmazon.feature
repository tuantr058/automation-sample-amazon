Feature: Shopping on Amazon

  @pri0
  Scenario: User changes location to Truckee - California

    Given User navigates to the Amazon website
    When User clicks on "Change location" on the toaster
    And User inputs "96162" to the Zipcode box to change delivery location to Truckee
    Then User should see the location changes to "Truckee 96162"

  @pri1
  Scenario: User adds item to cart and handles additional offers
    Given User navigates to the Amazon Today's Deals page
    When User filters items by selecting "Discount 10% off or more"
    And User clicks to view details of the first item with tag "Limited time deal"
    And User changes the item quantity to 2
    And User clicks the "Add to cart" button
    Then User handles additional offers if present
    And User should see the item added to the cart
    
  @pri2
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