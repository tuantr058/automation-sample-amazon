Feature: Adding an item to cart on Amazon Today's Deals

  Scenario: User adds item to cart and handles additional offers
  
    Given User navigates to the Amazon Today's Deals page
    When User filters items by selecting "Discount 10% off or more"
    And User clicks to view details of the first item with tag "Limited time deal"
    And User changes the item quantity to 2
    And User clicks the "Add to cart" button
    Then User handles additional offers if present
    And User should see the item added to the cart