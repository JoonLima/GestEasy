describe('GestEasy', ()=> {
  
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.acessarPaginaLogin();
  })

  context('Testes relacionados ao login no sistema.', () => {
    it('TC001 - Deve retornar mensagem caso tente login sem informar e-mail e senha', () => {
      cy.get('[data-test="button-entrar"]').should('be.visible').click();
      cy.get('[data-test="campo-email-obrigatorio"]').should('be.visible').and('contain', 'O e-mail é obrigatório');
      cy.get('[data-test="campo-senha-obrigatoria"]').should('be.visible').and('contain', 'A senha é obrigatória');
    });

    it('TC002 - Deve retornar mensagem caso tente login informando somente o e-mail', () => {
      cy.get('[data-test="input-email"]').should('be.visible').type(Cypress.env('usuario'));
      cy.get('[data-test="button-entrar"]').should('be.visible').click();
      cy.get('[data-test="campo-senha-obrigatoria"]').should('be.visible').and('contain', 'A senha é obrigatória');
    });

    it('TC003 - Deve retornar mensagem caso tente login informando somente a senha', () => {
      cy.get('[data-test="input-senha"]').should('be.visible').type(Cypress.env('senha'));
      cy.get('[data-test="button-entrar"]').should('be.visible').click();
      cy.get('[data-test="campo-email-obrigatorio"]').should('be.visible').and('contain', 'O e-mail é obrigatório');
    });

    it('TC004 - Deve retornar mensagem caso utilize um e-mail invalido.', () => {
      cy.get('[data-test="input-email"]').should('be.visible').type('abcd');
      cy.get('[data-test="campo-email-invalido"]').should('be.visible').and('contain', 'Email inválido');
    });

    it('TC005 - Deve retornar mensagem caso seja passada a senha incorreta.', () => {
      cy.get('[data-test="input-email"]').should('be.visible').type(Cypress.env('usuario'));
      cy.get('[data-test="input-senha"]').should('be.visible').type('777777');
      cy.get('[data-test="button-entrar"]').should('be.visible').click();
      cy.get('#swal2-title').should('be.visible').and('contain', 'E-mail ou senha inválidos');
      cy.get('.swal2-confirm').click();
      cy.limparCamposLogin();
    });

    it('TC006 - Deve retornar mensagem caso seja passado o e-mail incorreto.', () => {
      cy.get('[data-test="input-email"]').should('be.visible').type('fake@fake.com');
      cy.get('[data-test="input-senha"]').should('be.visible').type(Cypress.env('senha'));
      cy.get('[data-test="button-entrar"]').should('be.visible').click();
      cy.get('#swal2-title').should('be.visible').and('contain', 'E-mail ou senha inválidos');
      cy.get('.swal2-confirm').click();
      cy.limparCamposLogin();
    });

    it('TC007 - Deve realizar o login corretamente.', () => {
      cy.get('[data-test="input-email"]').should('be.visible').type(Cypress.env('usuario'));
      cy.get('[data-test="input-senha"]').should('be.visible').type(Cypress.env('senha'));
      cy.get('[data-test="button-entrar"]').should('be.visible').click();
      cy.get('[data-test="card-total-produtos"]').should('be.visible');
    });

  })
})