import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../../page-objects/alert-page';

export default class OperationUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('jhipsterApp.testRootOperation.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  dateInput: ElementFinder = element(by.css('input#operation-date'));

  descriptionInput: ElementFinder = element(by.css('input#operation-description'));

  amountInput: ElementFinder = element(by.css('input#operation-amount'));

  bankAccountSelect = element(by.css('select#operation-bankAccount'));

  labelSelect = element(by.css('select#operation-label'));
}
