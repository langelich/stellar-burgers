import { addIngredients } from "../support/e2e.ts";
import ingredients from "../fixtures/ingredients.json";
import order from "../fixtures/order.json";

describe('check page burger-constructor', () => {
    beforeEach(() => {
        cy.intercept('/api/ingredients', (req) => {
            req.reply(res => {
                res.body.data = ingredients.data             
            })
        });
        cy.visit('http://localhost:4000/'); 
    })

    it('add ingredients', () => {
        addIngredients('643d69a5c3f7b9001cfa093c');
        addIngredients('643d69a5c3f7b9001cfa093e');
        addIngredients('643d69a5c3f7b9001cfa0942');
    });

    it('open & close modal (click on button)', () => {     
        const ing = ingredients.data.find(item => item._id === '643d69a5c3f7b9001cfa093d');

        cy.get(`[data-cy='643d69a5c3f7b9001cfa093d'] > a`).click();
        cy.get('#modals').children().find('h3').contains(`${ing?.name}`);
        cy.get('#modals').children().find('button').click();
        cy.get('#modals').children().should('not.exist');
    })

    it('open & close modal (click on overlay)', () => {
        const ing = ingredients.data.find(item => item._id === '643d69a5c3f7b9001cfa093e');

        cy.get(`[data-cy='643d69a5c3f7b9001cfa093e'] > a`).click();
        cy.get('#modals').children().find('h3').contains(`${ing?.name}`);
        cy.get('#modals div').last().click({force: true});
        cy.get('#modals').children().should('not.exist');
    })
})

describe('make order', () => {
    afterEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
    });

    beforeEach(() => {
        cy.setCookie('accessToken', 'accessToken');
        window.localStorage.setItem('refreshToken', 'refreshToken');

        cy.intercept('/api/ingredients', (req) => {
            req.reply(res => {
                res.body.data = ingredients.data             
            })
        });

        cy.visit('http://localhost:4000/'); 

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

        cy.get('button').contains('Оформить заказ').click();
        cy.wait('@makeOrder');

        cy.get('#modals').children().find('h2').contains(order.order.number);
        cy.get('#modals').children().find('button').click();
        cy.get('#modals').children().should('not.exist');
        cy.get('button').contains('Оформить заказ').should('have.attr', 'disabled');
    });
});