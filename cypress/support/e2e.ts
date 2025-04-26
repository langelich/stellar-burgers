// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import ingredients from "../fixtures/ingredients.json";

export const addIngredients = (itemId: string) => {
    const ing = ingredients.data.find(item => item._id === itemId);
    cy.get(`[data-cy=${itemId}] > button`).contains('Добавить').click();
    cy.get('.constructor-element__row').contains(`${ing?.name}`);
}