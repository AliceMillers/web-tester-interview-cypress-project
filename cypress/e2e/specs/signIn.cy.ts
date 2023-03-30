/// <reference types="cypress" />

// This file will contain tests for the Sign In form. Feel free to add as many as you want.
// You dont have to test successful sign in as an account is needed for it. Other scenarios are recommended to test.

describe('Sign-in page', () => {
    context('Visability of elements on sign-in page', () => {
        beforeEach(() => {
            cy.visit('https://app.alfa.smartlook.cloud/sign/in')
        })
    
        it('Presence all elements on page', () => {
            cy.get('h1').should('contain', 'Log in to your account')
            cy.get('#sign-google-login-button').should('exist')
            cy.get('#sign-facebook-login').should('exist')
            cy.get('#sign-sso-login-button').should('exist')
            cy.get('#sign-in-input-email--content').should('exist')
            cy.get('#sign-in-input-password--content').should('exist')
            cy.get('#sign-in-button').should('exist')
            cy.get('#sign-in_sign-up-link').should('exist')
            cy.get('#sign-in_forgot-password-link').should('exist')
            cy.get('h4').should('contain', 'Trusted by 2800+ brands')
            cy.get('#google-policy').should('exist')
            cy.get('#google-tos').should('exist')
        })

        it('Check labels for buttons and inputs', () => {
            cy.get('#sign-google-login-button > div > div > span').should('contain', 'Log in with Google')
            cy.get('#sign-facebook-login > div').should('contain', 'Log in with Facebook')
            cy.get('#sign-sso-login-button > div').should('contain', 'Log in with SSO')
            cy.get('#sign-in-input-email--label').should('contain', 'Email')
            cy.get('#sign-in-input-password--label').should('contain', 'Password')
            cy.get('#sign-in-button > div').should('contain', 'Log in')
        })
    })

    context('Input sign-in form test cases', () => {
        beforeEach(() => {
            cy.visit('https://app.alfa.smartlook.cloud/sign/in')
        })
    
        it('Input correct credentials without login', () => {
            cy.get('#sign-in-input-email--content').type('test@email.com')
            cy.get('#sign-in-input-email--inner').should('have.value', 'test@email.com')
            cy.get('#sign-in-input-password--content').type('testPassword')
            cy.get('#sign-in-input-password--inner').should('have.value', 'testPassword')
            
        })

        it('Non-existing user', () => {
            cy.get('#sign-in-input-email--content').type('test@email.com')
            cy.get('#sign-in-input-password--content').type('testPassword')
            cy.get('#sign-in-button').click()
            cy.get('span')
              .should('contain', 'Incorrect login or password. If you recently signed up, please check your email for your invitation link.')
        })

        it('Correct email and empty password', () => {
            cy.get('#sign-in-input-email--content').type('test@email.com')
            cy.get('#sign-in-button').click()
            cy.get('#sign-in-input-password')
               .next()
               .should('have.text', 'Your password must be at least 6 characters long')
        })

        it('Correct email and invalid password format', () => {
            cy.get('#sign-in-input-email--content').type('test@email.com')
            cy.get('#sign-in-input-password--content').type('test')
            cy.get('#sign-in-button').click()
            cy.get('#sign-in-input-password')
               .next()
               .should('have.text', 'Your password must be at least 6 characters long')
        })

        it('Correct password and empty email', () => {
            cy.get('#sign-in-input-password--content').type('test')
            cy.get('#sign-in-button').click()
            cy.get('#sign-in-input-password')
               .next()
               .should('have.text', 'Your password must be at least 6 characters long')
        })

        // Suggestion - use a new validation message which specifies correct format
        it('Correct password and invalid email format', () => {
            cy.get('#sign-in-input-email--content').type('test')
            cy.get('#sign-in-input-password--content').type('test')
            cy.get('#sign-in-button').click()
            cy.get('#sign-in-input-email')
               .next()
               .should('have.text', 'Please fill in your email address')
        })
    
        // Suggestion - display validation messages for empty email and password together when user click on Log in button
        it('Empty credentials', () => {
            cy.get('#sign-in-button').click()
            cy.get('#sign-in-input-email')
               .next()
               .should('have.text', 'Please fill in your email address')
        })
    })

    context('Show/hide password options', () => {
        beforeEach(() => {
            cy.visit('https://app.alfa.smartlook.cloud/sign/in')
        })

        it('Check option to hide/show password', () => {
            //password is hidden
            cy.get('#sign-in-input-password--inner')
              .type('testPassword')
              .should('have.attr', 'type', 'password')

            //click on show password image
            cy.get('#sign-in-input-password--content').click(320, 30)

            //password is shown
            cy.get('#sign-in-input-password--inner')
              .should('have.attr', 'type', 'text')
        })
    })

    context('Other login variants', () => {
        beforeEach(() => {
            cy.visit('https://app.alfa.smartlook.cloud/sign/in')
        })

        it('Google login', () => {
            cy.get('#sign-google-login-button').click()
            // test popup
        })

        it('Facebook login', () => {
            cy.get('#sign-facebook-login').click()
            // test popup
        })

        it('SSO login', () => {
            cy.get('#sign-sso-login-button').click()
            cy.url().should('eq', 'https://app.alfa.smartlook.cloud/sign/sso')
        })
    })

    context('Links on sign-in page', () => {
        beforeEach(() => {
            cy.visit('https://app.alfa.smartlook.cloud/sign/in')
        })
    
        it('Link: Sign-up', () => {
            cy.get('#sign-in_sign-up-link').click()
            cy.url().should('eq', 'https://app.alfa.smartlook.cloud/sign/up')
        })

        it('Link: I forgot my password', () => {
            cy.get('#sign-in_forgot-password-link').click()
            cy.url().should('eq', 'https://app.alfa.smartlook.cloud/sign/reset-password')
        })

        it('Link: Google privacy policy', () => {
            cy.get('#google-policy').should('have.attr', 'href', 'https://policies.google.com/privacy')
        })

        it('Link: Terms of service', () => {
            cy.get('#google-tos').should('have.attr', 'href', 'https://policies.google.com/terms')
        })
    })
})
