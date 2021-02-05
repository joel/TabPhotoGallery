/// <reference types="cypress" />
// tests.spec.js

const sizes = ['iphone-x', 'ipad-mini', 'samsung-note9'];

describe('Mobile tests', () => {
  sizes.forEach((size) => {
    context(`${size} resolution`, () => {
      beforeEach(() => {
        // run these tests as if in a mobile browser
        // and ensure our responsive UI is correct
        cy.viewport(size);
      });

      it('go through the tabs', () => {
        cy.visit('/tab1');
        cy.get('#tab-button-tab2').click();
        cy.get('#tab-button-tab3').click();
        cy.get('#tab-button-tab1');
      });

      it('Take A Picture', () => {
        cy.visit('/tab2');
        cy.get('#take-picture-action')
          .should('be.visible')
          .click({ force: true });

        // cy.get('#pwa-camera-modal-instance.hydrated').click('bottom');
      });
    });
  });
});
