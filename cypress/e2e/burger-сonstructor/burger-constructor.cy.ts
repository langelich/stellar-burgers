import ingredients from "../../fixtures/ingredients.json";

describe('тесты для страницы конструктора бургера', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.visit('http://localhost:4000/'); 
    })

    it('добавление ингредиентов в конструктор', () => {
        let ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa093c');
        cy.get(`[data-cy='643d69a5c3f7b9001cfa093c'] > button`).contains('Добавить').click();
        cy.get('.constructor-element__row').contains(`${ing?.name}`);

        ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa093e');
        cy.get(`[data-cy='643d69a5c3f7b9001cfa093e'] > button`).contains('Добавить').click()
        cy.get('.constructor-element__row').contains(`${ing?.name}`);

        ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa0942');
        cy.get(`[data-cy='643d69a5c3f7b9001cfa0942'] > button`).contains('Добавить').click()
        cy.get('.constructor-element__row').contains(`${ing?.name}`);
    });

    it('тест на открытие МО и закрытие по кнопке', () => {     
        const ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa093d');

        cy.get(`[data-cy='643d69a5c3f7b9001cfa093d'] > a`).click();
        cy.get('#modals').children().find('h3').contains(`${ing?.name}`);

        cy.get('#modals').children().find('button').click();
        cy.get('#modals').children().should('not.exist');
    })

    it('тест на открытие МО и закрытие по клику на оверлей', () => {
        const ing = ingredients.find(item => item._id === '643d69a5c3f7b9001cfa093e');

        cy.get(`[data-cy='643d69a5c3f7b9001cfa093e'] > a`).click();
        cy.get('#modals').children().find('h3').contains(`${ing?.name}`);
        
        cy.get('#modals div').last().click({force: true});
        cy.get('#modals').children().should('not.exist');
    })
});