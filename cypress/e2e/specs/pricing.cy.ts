/// <reference types="cypress" />

// This file will contain tests for the Pricing page. Feel free to add as many as you want.

describe('Pricing page', () => {
    context('Plans', () => {
        beforeEach(() => {
            cy.visit('https://www.smartlook.com/pricing/?currencyCode=CZK')
            // Accepting all cookies in pop up window
            cy.get('#onetrust-accept-btn-handler').should('contain', 'Accept All Cookies').click()
            // Check iframe
            cy.get('#pricing-page-iframe', { timeout: 20000 }).should('be.visible')
        })

        // I found that iframe with id = "pricing-page-iframe" is recursive in cypress chrome browser
        // I tried to find elements inside the frame but it's not possible and this code doesn't work
        it('Check plans labels', () => {
            cy.get("iframe[id='pricing-page-iframe']")
              .its('0.contentDocument.body')
              .should('be.visible')
              .then(cy.wrap)
              .xpath("//*[@id='__next']/div/main/div[2]/div/div[1]/div[1]/div[1]/h5")
              .should('contain', 'Free plan')
        })
        // So I will describe the testing process by words




        // First task: Check prices of packages
        
        // Tree plans should be present on pricing page
        // Each of them contains its own price
        // Prices are the same as on the top content as on the comparing table below




        // Second task: Test that 'Build a plan' button works and the modal is behaving as expected - prices and limits

        // 'Build a plan' button should opened the modal
        // The modal contains monthly session options, Billing period area, info area and Continue, Close buttons
        // Choose any monthly session option, session limit and subtotal sum in billing period should be changed according a logic
        // It's possible to change billing period from monthly to annualy or choose a currency (USD, EUR, CZK) where CZK is set by default
        // Click on 'Continue' button
        // Billing period area should stayed the same
        // There are three additional features displayed 
        // Click on 'Add' button for any of them
        // Billing period area should be changed by adding Add-ons field and subtotal sum should be increased accordingly
        // Click on 'Start your free trial' button
        // Redirect to https://app.smartlook.com/sign/up

        // I will test also 'Close', 'Remove' and 'Back' buttons. 
        // Also will play with options of billing period and monthly session options
        // Check that by clicking on each sentence in info area it will display needed information.
    })
})
