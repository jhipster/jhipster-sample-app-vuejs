import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('BankAccount e2e test', () => {
  const bankAccountPageUrl = '/bank-account-my-suffix';
  const bankAccountPageUrlPattern = new RegExp('/bank-account-my-suffix(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const bankAccountSample = { name: 'Handcrafted', balance: 88577 };

  let bankAccount;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/bank-accounts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/bank-accounts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/bank-accounts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (bankAccount) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/bank-accounts/${bankAccount.id}`,
      }).then(() => {
        bankAccount = undefined;
      });
    }
  });

  it('BankAccounts menu should load BankAccounts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('bank-account-my-suffix');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('BankAccount').should('exist');
    cy.url().should('match', bankAccountPageUrlPattern);
  });

  describe('BankAccount page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(bankAccountPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create BankAccount page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/bank-account-my-suffix/new$'));
        cy.getEntityCreateUpdateHeading('BankAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankAccountPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/bank-accounts',
          body: bankAccountSample,
        }).then(({ body }) => {
          bankAccount = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/bank-accounts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [bankAccount],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(bankAccountPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details BankAccount page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('bankAccount');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankAccountPageUrlPattern);
      });

      it('edit button click should load edit BankAccount page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BankAccount');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankAccountPageUrlPattern);
      });

      it.skip('edit button click should load edit BankAccount page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('BankAccount');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankAccountPageUrlPattern);
      });

      it('last delete button click should delete instance of BankAccount', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('bankAccount').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', bankAccountPageUrlPattern);

        bankAccount = undefined;
      });
    });
  });

  describe('new BankAccount page', () => {
    beforeEach(() => {
      cy.visit(`${bankAccountPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('BankAccount');
    });

    it('should create an instance of BankAccount', () => {
      cy.get(`[data-cy="name"]`).type('experiences withdrawal').should('have.value', 'experiences withdrawal');

      cy.get(`[data-cy="bankNumber"]`).type('93119').should('have.value', '93119');

      cy.get(`[data-cy="agencyNumber"]`).type('50453').should('have.value', '50453');

      cy.get(`[data-cy="lastOperationDuration"]`).type('10187').should('have.value', '10187');

      cy.get(`[data-cy="meanOperationDuration"]`).type('82418').should('have.value', '82418');

      cy.get(`[data-cy="balance"]`).type('26784').should('have.value', '26784');

      cy.get(`[data-cy="openingDay"]`).type('2015-08-05').blur().should('have.value', '2015-08-05');

      cy.get(`[data-cy="lastOperationDate"]`).type('2015-08-04T13:03').blur().should('have.value', '2015-08-04T13:03');

      cy.get(`[data-cy="active"]`).should('not.be.checked');
      cy.get(`[data-cy="active"]`).click().should('be.checked');

      cy.get(`[data-cy="accountType"]`).select('CHECKING');

      cy.setFieldImageAsBytesOfEntity('attachment', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="description"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        bankAccount = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', bankAccountPageUrlPattern);
    });
  });
});
