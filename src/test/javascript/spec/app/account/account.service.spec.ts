import { createLocalVue } from '@vue/test-utils';
import router from '@/router';
import axios from 'axios';
import AccountService from '@/account/account.service';
import TranslationService from '@/locale/translation.service';

import * as config from '@/shared/config/config';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

const localVue = createLocalVue();
let i18n;

let store;

describe('Account Service test suite', () => {
  let accountService: AccountService;

  beforeEach(() => {
    mockedAxios.get.mockReset();
    store = config.initVueXStore(localVue);
    i18n = config.initI18N(localVue);
  });

  it('should init service and do not retrieve account', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: { 'display-ribbon-on-profiles': 'dev', activeProfiles: ['dev', 'test'] } }));

    accountService = await new AccountService(store, new TranslationService(store, i18n), router);

    expect(store.getters.logon).toBe(false);
    expect(accountService.authenticated).toBe(false);
    expect(store.getters.account).toBe(null);
    expect(mockedAxios.get).toHaveBeenCalledWith('management/info');
    expect(store.getters.activeProfiles[0]).toBe('dev');
    expect(store.getters.activeProfiles[1]).toBe('test');
    expect(store.getters.ribbonOnProfiles).toBe('dev');
  });

  it('should init service and retrieve account if already logged in before but no account found', async () => {
    localStorage.setItem('jhi-authenticationToken', 'token');

    mockedAxios.get.mockReturnValue(Promise.resolve({}));
    accountService = await new AccountService(store, new TranslationService(store, i18n), router);

    expect((<any>router).history.current.fullPath).toBe('/');
    expect(store.getters.logon).toBe(false);
    expect(accountService.authenticated).toBe(false);
    expect(store.getters.account).toBe(null);
    expect(mockedAxios.get).toHaveBeenCalledWith('api/account');
    expect(mockedAxios.get).toHaveBeenCalledWith('management/info');
    expect(mockedAxios.get).toHaveBeenCalledWith('i18n/en.json');
  });

  it('should init service and retrieve account if already logged in before but exception occured and should be logged out', async () => {
    localStorage.setItem('jhi-authenticationToken', 'token');

    mockedAxios.get = jest.fn(apiName => (apiName === 'api/account' ? Promise.reject() : Promise.resolve({})));
    accountService = await new AccountService(store, new TranslationService(store, i18n), router);

    expect((<any>router).history.current.fullPath).toBe('/');
    expect(accountService.authenticated).toBe(false);
    expect(store.getters.account).toBe(null);
    expect(mockedAxios.get).toHaveBeenCalledWith('api/account');
    expect(mockedAxios.get).toHaveBeenCalledWith('management/info');
  });

  it('should init service and check for authority', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: { authorities: ['USER'] } }));
    accountService = await new AccountService(store, new TranslationService(store, i18n), router);

    expect(accountService.hasAnyAuthority('USER')).toBe(true);
  });

  it('should init service and not return any authorities', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({ data: { authorities: ['USER'] } }));
    accountService = await new AccountService(store, new TranslationService(store, i18n), router);

    expect(accountService.hasAnyAuthority('ADMIN')).toBe(false);
  });

  it('should init service as not authentified and not return any authorities', async () => {
    mockedAxios.get = jest.fn(apiName => (apiName === 'api/account' ? Promise.reject() : Promise.resolve({})));
    accountService = await new AccountService(store, new TranslationService(store, i18n), router);

    expect(accountService.hasAnyAuthority('ADMIN')).toBe(false);
  });
});
