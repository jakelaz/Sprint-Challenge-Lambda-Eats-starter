/// <reference types="cypress" />

context('Assertions', () => {
    beforeEach(() => {
      cy.visit('localhost:3001/pizza')
    })
    describe('Add Text to the Box', () => {
        it('It should add text to box', () => {
            cy.get('#newPizzaName')
                .type('Test Name') 
                .should('contain.value', 'Test Name')
        });
    });
    describe('Select Multiple Toppings', () => {
        it('It should select multiple toppings', () => {
            cy.get('.pepperoni')
                .click() 
                .should('have.class', 'active')
            cy.get('.dicedTomatoes')
                .click() 
                .should('have.class', 'active')         
            cy.get('.sausage')
                .click() 
                .should('have.class', 'active') 
            cy.get('.blackOlives')
                .click() 
                .should('have.class', 'active')                                            
        });
    });    
    describe('Submit Form', () => {
        it('It should enable submission when the required fields are complete', () => {
            cy.get('#addToOrderBtn')
                .should('be.disabled')  
            cy.get('#newPizzaName')
                .type('Test Name')
            cy.get('#newPizzaSize')
                .select('18" Round')
            cy.get('.pepperoni')
                .click() 
            cy.get('.dicedTomatoes')
                .click() 
            cy.get('.sausage')
                .click() 
            cy.get('.blackOlives')
                .click() 
            cy.get('#addToOrderBtn')
                .should('be.enabled')  
                .click()
            cy.get('#orderData')
                .should('contain','Test Name')
        });
    });      
});