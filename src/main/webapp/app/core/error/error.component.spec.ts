import { vitest } from 'vitest';
import { type Ref, ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { type RouteLocation } from 'vue-router';

import Error from './error.vue';

import LoginService from '@/account/login.service';

type ErrorComponentType = InstanceType<typeof Error>;

let route: Partial<RouteLocation>;

vitest.mock('vue-router', () => ({
  useRoute: () => route,
}));

const customErrorMsg = 'An error occurred.';

describe('Error component', () => {
  let error: ErrorComponentType;
  let loginService: LoginService;
  let authenticated: Ref<boolean>;

  beforeEach(() => {
    route = {};
    authenticated = ref(false);
    loginService = new LoginService({ emit: vitest.fn() });
    vitest.spyOn(loginService, 'openLogin');
  });

  it('should have retrieve custom error on routing', () => {
    route = {
      path: '/custom-error',
      name: 'CustomMessage',
      meta: { errorMessage: customErrorMsg },
    };
    const wrapper = shallowMount(Error, {
      global: {
        provide: {
          loginService,
          authenticated,
        },
      },
    });
    error = wrapper.vm;

    expect(error.errorMessage).toBe(customErrorMsg);
    expect(error.error403).toBeFalsy();
    expect(error.error404).toBeFalsy();
    expect(loginService.openLogin).toHaveBeenCalledTimes(0);
  });

  it('should have set forbidden error on routing', () => {
    route = {
      meta: { error403: true },
    };
    const wrapper = shallowMount(Error, {
      global: {
        provide: {
          loginService,
          authenticated,
        },
      },
    });
    error = wrapper.vm;

    expect(error.errorMessage).toBeNull();
    expect(error.error403).toBeTruthy();
    expect(error.error404).toBeFalsy();
    expect(loginService.openLogin).toHaveBeenCalled();
  });

  it('should have set not found error on routing', () => {
    route = {
      meta: { error404: true },
    };
    const wrapper = shallowMount(Error, {
      global: {
        provide: {
          loginService,
          authenticated,
        },
      },
    });
    error = wrapper.vm;

    expect(error.errorMessage).toBeNull();
    expect(error.error403).toBeFalsy();
    expect(error.error404).toBeTruthy();
    expect(loginService.openLogin).toHaveBeenCalledTimes(0);
  });

  it('should have set default on no error', () => {
    const wrapper = shallowMount(Error, {
      global: {
        provide: {
          loginService,
          authenticated,
        },
      },
    });
    error = wrapper.vm;

    expect(error.errorMessage).toBeNull();
    expect(error.error403).toBeFalsy();
    expect(error.error404).toBeFalsy();
    expect(loginService.openLogin).toHaveBeenCalledTimes(0);
  });
});
