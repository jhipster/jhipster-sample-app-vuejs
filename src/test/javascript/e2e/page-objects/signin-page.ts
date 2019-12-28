import { $, ElementFinder } from 'protractor';

import AlertPage from './alert-page';

export default class SignInPage extends AlertPage {
  loginForm: ElementFinder = $('#login-page');
  username: ElementFinder = this.loginForm.$('#username');
  password: ElementFinder = this.loginForm.$('#password');
  loginButton: ElementFinder = this.loginForm.$('button[type=submit]');
  title: ElementFinder = this.loginForm.$('#login-title');
  closeButton: ElementFinder = this.loginForm.$('.close');

  async getTitle() {
    return this.title.getAttribute('id');
  }

  async login(username: string, password: string) {
    await this.username.sendKeys(username);
    await this.password.sendKeys(password);
    await this.loginButton.click();
  }
}
