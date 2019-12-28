import { browser, $, ElementFinder } from 'protractor';

import SignInPage from './signin-page';
import RegisterPage from './register-page';
import PasswordPage from './password-page';
import SettingsPage from './settings-page';
import { AuditsPage, ConfigurationsPage, HealthPage, LogsPage, MetricsPage, UserManagementPage } from './administration-page';
import { click, isVisible, waitUntilDisplayed, waitUntilHidden } from '../util/utils';

export default class NavBarPage {
  selector: ElementFinder = $('#app-header');
  adminMenu: ElementFinder = this.selector.$('#admin-menu');
  accountMenu: ElementFinder = this.selector.$('#account-menu');
  entityMenu: ElementFinder = this.selector.$('#entity-menu');

  async clickOnTabMenu(item: string) {
    await click(this.selector.$(`.dropdown-menu ${item}`));
  }

  async clickOnAccountMenu() {
    await click(this.accountMenu);
  }

  async clickOnAccountMenuItem(item: string) {
    await this.clickOnAccountMenu();
    await click(this.selector.$(`.dropdown-item[href="/account/${item}"]`));
  }

  async getPasswordPage() {
    await this.clickOnAccountMenuItem('password');

    const passwordPage = new PasswordPage();
    await waitUntilDisplayed(passwordPage.title);
    return passwordPage;
  }

  async getSettingsPage() {
    await this.clickOnAccountMenuItem('settings');

    const settingsPage = new SettingsPage();
    await waitUntilDisplayed(settingsPage.title);
    return settingsPage;
  }

  async getRegisterPage() {
    await this.clickOnAccountMenu();
    await this.clickOnTabMenu('#register');
    const registerPage = new RegisterPage();
    await waitUntilDisplayed(registerPage.title);
    return registerPage;
  }

  async getSignInPage() {
    await this.clickOnAccountMenu();
    await this.clickOnTabMenu('#login');
    const signInPage = new SignInPage();
    await waitUntilDisplayed(signInPage.title);
    return signInPage;
  }

  async clickOnAdminMenuItem(item: string) {
    await click(this.adminMenu);
    await click(this.selector.$(`.dropdown-item[href="/admin/${item}"]`));
  }

  async clickOnEntityMenu() {
    await click(this.entityMenu);
  }

  async clickOnEntity(entityName: string) {
    await click(this.selector.$(`.dropdown-item[href="/${entityName}"]`));
  }

  async getEntityPage(entityName: string) {
    await this.clickOnEntityMenu();
    await this.clickOnEntity(entityName);
  }

  async login(username: string, password: string) {
    await this.clickOnAccountMenu();
    const alreadyLoggedIn = await isVisible(this.selector.$(`.dropdown-menu #logout`));

    // close account menu
    await this.clickOnAccountMenu();
    if (!alreadyLoggedIn) {
      const signInPage = await this.getSignInPage();
      await signInPage.login(username, password);
      await waitUntilHidden(signInPage.loginForm);
      await waitUntilDisplayed(this.entityMenu);
    }
  }

  async autoSignOut() {
    // avoid interference due to dialogs
    await browser.get('/');
    await this.clickOnAccountMenu();
    await this.clickOnTabMenu('#logout');
    await waitUntilHidden(this.entityMenu);
  }

  async getUserManagementPage() {
    await this.clickOnAdminMenuItem('user-management');
    const userManagementPage = new UserManagementPage();
    await waitUntilDisplayed(userManagementPage.title);
    return userManagementPage;
  }

  async getMetricsPage() {
    await this.clickOnAdminMenuItem('jhi-metrics');
    const metricsPage = new MetricsPage();
    await waitUntilDisplayed(metricsPage.title);
    return metricsPage;
  }

  async getHealthPage() {
    await this.clickOnAdminMenuItem('jhi-health');
    const healthPage = new HealthPage();
    await waitUntilDisplayed(healthPage.title);
    return healthPage;
  }

  async getConfigurationsPage() {
    await this.clickOnAdminMenuItem('jhi-configuration');
    const configurationsPage = new ConfigurationsPage();
    await waitUntilDisplayed(configurationsPage.title);
    return configurationsPage;
  }

  async getAuditsPage() {
    await this.clickOnAdminMenuItem('audits');
    const auditsPage = new AuditsPage();
    await waitUntilDisplayed(auditsPage.title);
    return auditsPage;
  }

  async getLogsPage() {
    await this.clickOnAdminMenuItem('logs');
    const logsPage = new LogsPage();
    await waitUntilDisplayed(logsPage.title);
    return logsPage;
  }
}
