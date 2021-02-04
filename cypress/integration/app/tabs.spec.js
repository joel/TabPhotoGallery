/// <reference types="cypress" />

context('Tabs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100')
  })

  it('go through tabs', () => {
    cy.visit('http://localhost:8100/tab1');
    cy.get('#tab-button-tab2').click();
    cy.get('#tab-button-tab3').click();
    // cy.get('#tab-button-tab2')
  })
})