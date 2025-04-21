import ingredients from "../../fixtures/ingredients.json";

describe('тесты для страницы конструктора бургера', () => {
    beforeEach(() => {
        // cy.intercept('GET', '/auth/user', { fixture: 'user.json' });
        cy.visit('http://localhost:4000/'); 
    })

    it('оформление заказа', () => {
        let ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa093c');
        cy.get(`[data-cy='643d69a5c3f7b9001cfa093c'] > button`).contains('Добавить').click();

        ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa093e');
        cy.get(`[data-cy='643d69a5c3f7b9001cfa093e'] > button`).contains('Добавить').click()

        ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa0942');
        cy.get(`[data-cy='643d69a5c3f7b9001cfa0942'] > button`).contains('Добавить').click()

        cy.get('button').contains('Оформить заказ').click();
        // cy.get('form').contains('E-mail')
        // cy.fixture('user.json')
        // cy.intercept('GET', '/auth/user', { fixture: 'user.json' });

    });

    // it('', () => {     
       
    // })

    // it('', () => {
        
    // })
    
});