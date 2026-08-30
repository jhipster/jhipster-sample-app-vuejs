import {
  errorLoginSelector,
  passwordLoginSelector,
  submitLoginSelector,
  titleLoginSelector,
  usernameLoginSelector,
} from '../../support/commands';

describe('login page', () => {
  let username: string;
  let password: string;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.visit('');
    cy.clickOnLoginItem();
    // The login modal moves focus to the username field once its enter transition ends;
    // typing before that lands part of the input in the wrong field.
    cy.get(usernameLoginSelector).should('have.focus');
  });

  beforeEach(() => {
    cy.intercept('POST', '/api/authenticate').as('authenticate');
  });

  it('greets with signin', () => {
    cy.get(titleLoginSelector).should('be.visible');
  });

  it('requires username', () => {
    cy.get(passwordLoginSelector).should('be.visible').type('a-password');
    cy.get(submitLoginSelector).click();
    cy.wait('@authenticate').then(({ response }) => expect(response?.statusCode).to.equal(400));
    // login page should stay open when login fails
    cy.get(titleLoginSelector).should('be.visible');
  });

  it('requires password', () => {
    cy.get(usernameLoginSelector).should('be.visible').type('a-login');
    cy.get(submitLoginSelector).click();
    cy.wait('@authenticate').then(({ response }) => expect(response?.statusCode).to.equal(400));
    cy.get(errorLoginSelector).should('be.visible');
  });

  it('errors when password is incorrect', () => {
    cy.get(usernameLoginSelector).should('be.visible').type(username);
    cy.get(passwordLoginSelector).should('be.visible').type('bad-password');
    cy.get(submitLoginSelector).click();
    cy.wait('@authenticate').then(({ response }) => expect(response?.statusCode).to.equal(401));
    cy.get(errorLoginSelector).should('be.visible');
  });

  it('go to home page when successfully logs in', () => {
    cy.get(usernameLoginSelector).should('be.visible').type(username);
    cy.get(passwordLoginSelector).should('be.visible').type(password);
    cy.get(submitLoginSelector).click();
    cy.wait('@authenticate').then(({ response }) => expect(response?.statusCode).to.equal(200));
    cy.hash().should('eq', '');
  });
});
