/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import BankAccountComponentsPage, { BankAccountDeleteDialog } from './bank-account-my-suffix.page-object';
import BankAccountUpdatePage from './bank-account-my-suffix-update.page-object';
import BankAccountDetailsPage from './bank-account-my-suffix-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../../util/utils';

import path from 'path';

const expect = chai.expect;

describe('BankAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: BankAccountUpdatePage;
  let detailsPage: BankAccountDetailsPage;
  let listPage: BankAccountComponentsPage;
  let deleteDialog: BankAccountDeleteDialog;
  const fileToUpload = '../../../../../../main/webapp/content/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);
  let beforeRecordsCount = 0;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login(username, password);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load BankAccounts', async () => {
    await navBarPage.getEntityPage('bank-account-my-suffix');
    listPage = new BankAccountComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create BankAccount page', async () => {
      await listPage.createButton.click();
      updatePage = new BankAccountUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(
        /jhipsterSampleApplicationVueApp.testRootBankAccount.home.createOrEditLabel/
      );
    });

    it('should create and save BankAccounts', async () => {
      await updatePage.nameInput.sendKeys('name');

      await updatePage.bankNumberInput.sendKeys('5');

      await updatePage.agencyNumberInput.sendKeys('5');

      await updatePage.lastOperationDurationInput.sendKeys('5');

      await updatePage.meanOperationDurationInput.sendKeys('5');

      await updatePage.balanceInput.sendKeys('5');

      await updatePage.openingDayInput.sendKeys('2001-01-01');

      await updatePage.lastOperationDateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');

      await updatePage.activeInput.click();

      await selectLastOption(updatePage.accountTypeSelect);

      await waitUntilDisplayed(updatePage.attachmentInput);
      await updatePage.attachmentInput.sendKeys(absolutePath);

      await waitUntilDisplayed(updatePage.descriptionInput);
      await updatePage.descriptionInput.sendKeys('description');

      // await selectLastOption(updatePage.userSelect);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.last());
        await click(deleteButton);

        deleteDialog = new BankAccountDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/jhipsterSampleApplicationVueApp.testRootBankAccount.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details BankAccount page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new BankAccountDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit BankAccount page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.nameInput.clear();
        await updatePage.nameInput.sendKeys('modified');

        await clear(updatePage.bankNumberInput);
        await updatePage.bankNumberInput.sendKeys('6');

        await clear(updatePage.agencyNumberInput);
        await updatePage.agencyNumberInput.sendKeys('6');

        await clear(updatePage.lastOperationDurationInput);
        await updatePage.lastOperationDurationInput.sendKeys('6');

        await clear(updatePage.meanOperationDurationInput);
        await updatePage.meanOperationDurationInput.sendKeys('6');

        await clear(updatePage.balanceInput);
        await updatePage.balanceInput.sendKeys('6');

        await updatePage.openingDayInput.clear();
        await updatePage.openingDayInput.sendKeys('2019-01-01');

        await updatePage.lastOperationDateInput.clear();
        await updatePage.lastOperationDateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');

        await updatePage.activeInput.click();

        await updatePage.descriptionInput.clear();
        await updatePage.descriptionInput.sendKeys('updateddescription');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
