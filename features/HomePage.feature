Feature: Change location on Amazon homepage

  Scenario: User changes location to Truckee - California

    Given User navigates to the Amazon website
    When User clicks on "Change location" on the toaster
    And User inputs "96162" to the Zipcode box to change delivery location to Truckee
    Then User should see the location changes to "Truckee 96162"