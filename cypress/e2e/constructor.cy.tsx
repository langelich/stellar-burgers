import { addIngredients } from "../support/e2e.ts";
import ingredients from "../fixtures/ingredients.json";
import order from "../fixtures/order.json";
import {BUTTON_MAKE_ORDER, CLOSE_BUTTON, MODAL} from "./constants.ts";

describe('check page burger-constructor', () => {
    beforeEach(() => {
        cy.intercept('/api/ingredients', (req) => {
            req.reply(res => {
                res.body.data = ingredients.data             
            })
        });
        cy.visit('/'); 
    })

    it('add ingredients', () => {
        addIngredients('643d69a5c3f7b9001cfa093c');
        addIngredients('643d69a5c3f7b9001cfa093e');
        addIngredients('643d69a5c3f7b9001cfa0942');
    });

    it('open & close modal (click on button)', () => {     
        const ing = ingredients.data.find(item => item._id === '643d69a5c3f7b9001cfa093d');

        cy.get(`[data-cy='643d69a5c3f7b9001cfa093d']`).click();
        cy.get(`${MODAL}`).children().find('h3').contains(`${ing?.name}`);
        cy.get(`${MODAL}`).children().find(`${CLOSE_BUTTON}`).click();
        cy.get(`${MODAL}`).children().should('not.exist');
    })

    it('open & close modal (click on overlay)', () => {
        const ing = ingredients.data.find(item => item._id === '643d69a5c3f7b9001cfa093e');

        cy.get(`[data-cy='643d69a5c3f7b9001cfa093e']`).click();
        cy.get(`${MODAL}`).children().find('h3').contains(`${ing?.name}`);
        cy.get('[data-cy="close-overlay"]').click({force: true});
        cy.get(`${MODAL}`).children().should('not.exist');
    })
})

describe('make order', () => {
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();

        cy.setCookie('accessToken', 'accessToken');
        window.localStorage.setItem('refreshToken', 'refreshToken');

        cy.intercept('/api/ingredients', (req) => {
            req.reply(res => {
                res.body.data = ingredients.data             
            })
        });

        cy.visit('/'); 

        cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'}).as('getUser');
        cy.wait('@getUser');

        cy.intercept('POST', 'orders', (req) => {
            req.reply(res => {
                res.body = order  
            })
        }).as('makeOrder')
    })

    it('make order', () => {
        addIngredients('643d69a5c3f7b9001cfa093c');
        addIngredients('643d69a5c3f7b9001cfa093e');
        addIngredients('643d69a5c3f7b9001cfa0942');

        cy.get(`${BUTTON_MAKE_ORDER}`).contains('Оформить заказ').click();
        cy.wait('@makeOrder');

        cy.get(`${MODAL}`).children().find('h2').contains(order.order.number);
        cy.get(`${MODAL}`).children().find(`${CLOSE_BUTTON}`).click();
        cy.get(`${MODAL}`).children().should('not.exist');
        cy.get(`${BUTTON_MAKE_ORDER}`).contains('Оформить заказ').should('have.attr', 'disabled');
    });
});