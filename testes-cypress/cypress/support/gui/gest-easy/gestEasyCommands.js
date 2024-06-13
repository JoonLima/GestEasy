Cypress.Commands.add('acessarPaginaLogin', () => {
  cy.visit(Cypress.env('url'));
});

Cypress.Commands.add('limparCamposLogin', () => {
  cy.get('[data-test="input-senha"]').clear();
  cy.get('[data-test="input-email"]').clear();
});