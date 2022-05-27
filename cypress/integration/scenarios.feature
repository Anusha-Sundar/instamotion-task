Feature: Bussiness Critical Scenarios


    Background:
        Given User opens instamotion website

    Scenario: Filtering based on brand and model chosen in homepage
        When User selects car brand from the dropdown
        And User selects car model from the dropdown
        And User clicks on the search button
        Then The page rendered should have car brand and model as filters applied
        And The count of cars shown while dropdown selection should match with count shown in rendered page having filters applied

    Scenario: Filtering based on providing user preferences in Auto finden page
        When User clicks on Auto finden page
        And User clicks on Wunschauto finden button present in middle of the page
        And User selects the used car preferences in the page rendered and click continue
        And User selects the price range preferences in the page rendered and click continue
        And User selects gear preferences in the page rendered and click continue
        And User selects fuel preferences in the page rendered and click continue
        And User selects car type in the page rendered and click continue
        And User selects aspect preferences in the page rendered and click continue
        Then The page rendered should have all choices made as filters

    Scenario: Capturing contact details of the user before payment - Positive Assertion
        When User clicks on Auto finden page
        And User selects a car from the options shown
        And User clicks on Anfrage starten button in the page rendered
        Then User should be able to fill the contact details in the page rendered

    Scenario: Capturing contact details of the user before payment - Negative Assertion
        When User clicks on Auto finden page
        And User selects a car from the options shown
        And User clicks on Anfrage starten button in the page rendered
        And User fills only the the Vorname field
        And User clicks on continue to pay button without filling other mandatory contact details
        Then The fields marked mandatory should throw error when not filled

    Scenario: Suggest to modify filter or begin new search when filter on brand and model gives no options when chosen in homepage
        When User selects car brand from the dropdown
        And User selects car model from the dropdown
        And The search button shows Zero matches
        And User clicks on the search button
        Then The page rendered should suggest delete a filter or begin a new search
        And The count of cars shown in the page should be Zero
