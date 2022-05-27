/// <reference types="cypress" />

import selectors from '../../constants/selectors/selectors'
import variables from '../../constants/variables/variables'
import texts from '../../constants/texts/texts'

var carsAvailable;
var assertionList = [];
var screenReadList = [];
var temp;
var str;


describe('Bussiness Critical Scenarios', () => {

    context('Filtering based on brand and model chosen in homepage', () => {
        before(() => {
            cy.visit("/")
            cy.acceptCookies(selectors.cookieSettings, selectors.acceptCookies)
        })

        it('When User selects car brand from the dropdown', () => {
            cy.get(selectors.carMakeSelector).should('be.enabled')
            cy.get(selectors.carModelSelector).should('be.disabled')
            cy.get(selectors.carMakeSelector).click()
            cy.selectDropdown(selectors.carMakeSelectorOptionsList, selectors.carMakeoptions, variables.carMakeSelectedValue)

        })

        it('And User selects car model from the dropdown', () => {
            cy.get(selectors.carModelSelector).should('be.enabled')
            cy.get(selectors.carModelSelector).click()
            cy.selectDropdown(selectors.carModelSelectorOptionsList, selectors.carMakeoptions, variables.carModelSelectedValue)
            cy.wait(1000)
        })

        it('And User clicks on the search button', () => {
            cy.get(selectors.searchButton).getText().then((text) => {
                cy.log("The Text is :" + text)
                cy.readNumberfromScreen(text, texts.treffer).then(prev => {
                    carsAvailable = prev
                })
            })
            cy.get(selectors.searchButton).click()
        })

        specify('Then The page rendered should have car brand and model as filters applied', () => {
            cy.acceptCookies(selectors.cookieSettings, selectors.acceptCookies)
            cy.title().should('eq', texts.findCarsPageTitle)
            cy.get(selectors.findCarsPageFilterSection).should(($div) => {
                expect($div).to.contain(variables.carMakeSelectedValue)
                expect($div).to.contain(variables.carModelSelectedValue)
            })
        })

        it('And The count of cars shown while dropdown selection should match with count shown in rendered page having filters applied', () => {
            cy.get(selectors.findCarsPageFilterSection).contains(texts.carCountSentence).invoke('attr', 'class').then((id) => {
                cy.get('.' + id.replace(/ /g, ".")).getText().then((text) => {
                    cy.log("The Text is :" + text)
                    cy.readNumberfromScreen(text, variables.carMakeSelectedValue).then(prev => {
                        expect(prev).to.eql(carsAvailable)
                    })
                })
            })
        })

    }),

        context('Filtering based on providing user preferences in Auto finden page', () => {
            before(() => {
                cy.visit("/")
                cy.acceptCookies(selectors.cookieSettings, selectors.acceptCookies)
                assertionList = new Array()
                screenReadList = new Array()
            })

            it('When User clicks on Auto finden page', () => {
                cy.get(selectors.hompageHeader).contains('Auto finden').click({ force: true })
                cy.title().should('eq', texts.findCarsPageTitle)
            })

            it('And User clicks on Wunschauto finden button present in middle of the page', () => {
                cy.get(selectors.findCarsPageCarsSection).contains(texts.dreamCar).click({ force: true })
                cy.acceptCookies(selectors.cookieSettings, selectors.acceptCookies)
                cy.title().should('eq', texts.findDreamCarPageTitle)
            })

            it('And User selects the used car preferences in the page rendered and click continue', () => {
                cy.get(selectors.iframeSelector).invoke('attr', 'src').then((id) => {
                    cy.forceVisit(id)
                    cy.title().should('eq', texts.iframePageTitle)
                    cy.wildCardSubstitution(selectors.selectorCarStateWildCard, variables.replacementStr, variables.specLabelSelected).each($el => {
                        cy.get($el + selectors.selectorCarStatecheckbox).click()
                    })
                    cy.get(selectors.continuebuttonSelector).contains(texts.continuebutton).click()
                })
            })

            it('And User selects the price range preferences in the page rendered and click continue', () => {
                cy.get(selectors.dreamCarSpecSelector).contains(texts.middlePriced).click()
                cy.get(selectors.priceRangeSelector).should('contain', texts.priceRange)
                cy.get(selectors.continuebuttonSelector).contains(texts.continuebutton).click()
            })

            it('And User selects gear preferences in the page rendered and click continue', () => {
                cy.wildCardSubstitution(selectors.selectorCarStateWildCard, variables.replacementStr, variables.gearLabelSelected).each($el => {
                    cy.get($el + selectors.selectorCarStatecheckbox).click()
                })
                cy.get(selectors.continuebuttonSelector).contains(texts.continuebutton).click()
            })

            it('And User selects fuel preferences in the page rendered and click continue', () => {
                cy.wildCardSubstitution(selectors.selectorCarStateWildCard, variables.replacementStr, variables.fuelLabelSelected).each($el => {
                    cy.get($el + selectors.selectorCarStatecheckbox).click()
                })
                cy.get(selectors.continuebuttonSelector).contains(texts.continuebutton).click()
            })

            it('And User selects car type in the page rendered and click continue', () => {
                cy.wildCardSubstitution(selectors.selectorCarStateWildCard, variables.replacementStr, variables.carTypeLabelSelected).each($el => {
                    cy.get($el + selectors.selectorCarStatecheckbox).click()
                })
                cy.get(selectors.continuebuttonSelector).contains(texts.continuebutton).click()
            })

            it('And User selects aspect preferences in the page rendered and click continue', () => {
                cy.wildCardSubstitution(selectors.selectorCarStateWildCard, variables.replacementStr, variables.addOnsLabelSelected).each($el => {
                    cy.get($el + selectors.selectorCarStatecheckbox).click()
                })
                cy.get(selectors.continuebuttonSelector).contains(texts.continuebutton).click()
            })

            it('Then The page rendered should have all choices made as filters', () => {
                cy.get(selectors.dreamCarSpecSelector).should('contain', texts.lastPageText)
                temp = (variables.specLabelSelected) + "," + (variables.fuelLabelSelected) + "," + (variables.carTypeLabelSelected) + "," + (variables.priceRangeSelected)
                cy.splitArray(temp, ',').then((list) => {
                    assertionList = list
                })

                cy.get(selectors.dreamCarFilterPgSelector).then($ele => { 
                    str = [...$ele].map(el => el.innerText) 
                        console.log("dateStrings",str)
                    temp = str.map(a => a.split(/:|,/g))
                    console.log("post split",temp)
                    screenReadList  = Array.prototype.concat.apply([], temp);
                    console.log("post result",screenReadList)
                    screenReadList= screenReadList.map(s => s.trim());
                    console.log("post trim",screenReadList)
                    expect(screenReadList).to.contain.all.members(assertionList)
                  })
            })
        }),

        context('Capturing contact details of the user before payment - Negative Assertion', () => {
            before(() => {
                cy.visit("/")
                cy.acceptCookies(selectors.cookieSettings, selectors.acceptCookies)
                assertionList = new Array()
                screenReadList = new Array()
            })

            it('When User clicks on Auto finden page', () => {
                cy.get(selectors.hompageHeader).contains('Auto finden').click({ force: true })
                cy.title().should('eq', texts.findCarsPageTitle)
            })

            it('And User selects a car from the options shown', () => {
                cy.get(selectors.carSelector).first().click()
            })

            it('And User clicks on Anfrage starten button in the page rendered', () => {
                cy.get(selectors.requestSelector).contains(texts.startRequest).click({ force: true })
            })

            specify('And User fills only the the Vorname field', () => {
                cy.acceptCookies(selectors.cookieSettings, selectors.acceptCookies)
                cy.get(selectors.contactFormSelector).should('contain', texts.contactDetails)
                cy.get(selectors.contactFormSelector).getByLabel(texts.FirstName, selectors.labelIDselectorPattern).then((id) => {
                    cy.replaceStr(id, selectors.selectorRemoveVal, '').then((text) => {
                        cy.typeText('[' + selectors.labelIDselectorPattern + '="' + text + '"]', variables.firstNameTypeVal)
                    })
                })

            })

            it('And User clicks on continue to pay button without filling other mandatory contact details', () => {
                cy.get(selectors.contactSubmitButton).contains(variables.contactSubmitButtonText).click()
            })

            it('Then The fields marked mandatory should throw error when not filled', () => {
                cy.get(selectors.contactFormSelector).getLinks('label').each(($el) => {
                    cy.replaceStr($el.text(), '/*/', '').then((text) => {
                        cy.getByLabel(text, selectors.labelIDselectorPattern).then(($item) => {
                            cy.replaceStr($item, selectors.selectorRemoveVal, '').then((seltext) => {
                                cy.get('[' + selectors.labelIDselectorPattern + '="' + seltext + '"]').getText().then((text) => {
                                    if (text === '') {
                                        cy.get('[' + selectors.labelIDselectorPattern + '="' + seltext + '-error"]').getText().then(error => {
                                            screenReadList.push(error)
                                            expect(texts.errorList).to.contain.all.members(screenReadList)
                                        })
                                    }
                                })
                            })

                        })
                    })

                })


            })

        })

})


