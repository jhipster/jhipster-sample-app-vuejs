import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import Activate from '@/account/activate/activate.vue';
import ActivateClass from '@/account/activate/activate.component';
import ActivateService from '@/account/activate/activate.service';
import LoginService from '@/account/login.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('Activate Component', () => {
  let wrapper: Wrapper<ActivateClass>;
  let activate: ActivateClass;

  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.get.mockReturnValue(Promise.resolve({}));

    wrapper = shallowMount<ActivateClass>(Activate, {
      i18n,
      localVue,
      provide: {
        activateService: () => new ActivateService(),
        loginService: () => new LoginService(),
      },
    });
    activate = wrapper.vm;
  });

  it('should display error when activation fails using route', async () => {
    mockedAxios.get.mockReturnValue(Promise.reject({}));
    activate.beforeRouteEnter({ query: { key: 'invalid-key' } }, null, cb => cb(activate));
    await activate.$nextTick();

    expect(activate.error).toBeTruthy();
    expect(activate.success).toBeFalsy();
  });

  it('should display error when activation fails', async () => {
    mockedAxios.get.mockReturnValue(Promise.reject({}));
    activate.init('invalid-key');
    await activate.$nextTick();

    expect(activate.error).toBeTruthy();
    expect(activate.success).toBeFalsy();
  });

  it('should display success when activation succeeds', async () => {
    mockedAxios.get.mockReturnValue(Promise.resolve({}));

    activate.init('valid-key');
    await activate.$nextTick();

    expect(activate.error).toBeFalsy();
    expect(activate.success).toBeTruthy();
  });
});
