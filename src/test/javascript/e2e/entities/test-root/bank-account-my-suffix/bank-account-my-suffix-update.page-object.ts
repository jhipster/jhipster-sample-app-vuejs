import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../../page-objects/alert-page';

export default class BankAccountUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('jhipsterApp.testRootBankAccount.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#bank-account-my-suffix-name'));

  bankNumberInput: ElementFinder = element(by.css('input#bank-account-my-suffix-bankNumber'));

  agencyNumberInput: ElementFinder = element(by.css('input#bank-account-my-suffix-agencyNumber'));

  lastOperationDurationInput: ElementFinder = element(by.css('input#bank-account-my-suffix-lastOperationDuration'));

  meanOperationDurationInput: ElementFinder = element(by.css('input#bank-account-my-suffix-meanOperationDuration'));

  balanceInput: ElementFinder = element(by.css('input#bank-account-my-suffix-balance'));

  openingDayInput: ElementFinder = element(by.css('input#bank-account-my-suffix-openingDay'));

  lastOperationDateInput: ElementFinder = element(by.css('input#bank-account-my-suffix-lastOperationDate'));

  activeInput: ElementFinder = element(by.css('input#bank-account-my-suffix-active'));

  accountTypeSelect = element(by.css('select#bank-account-my-suffix-accountType'));

  attachmentInput: ElementFinder = element(by.css('input#file_attachment'));

  descriptionInput: ElementFinder = element(by.css('textarea#bank-account-my-suffix-description'));

  userSelect = element(by.css('select#bank-account-my-suffix-user'));
}
