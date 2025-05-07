import { vitest } from 'vitest';
import { type Ref, ref } from 'vue';
import { type ComponentMountingOptions, shallowMount } from '@vue/test-utils';
import { type RouteLocation } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

import Error from './error.vue';
import { useLoginModal } from '@/account/login-modal';

type ErrorComponentType = InstanceType<typeof Error>;

let route: Partial<RouteLocation>;

vitest.mock('vue-router', () => ({
  useRoute: () => route,
}));

const customErrorMsg = 'An error occurred.';

describe('Error component', () => {
  let error: ErrorComponentType;
  let login: ReturnType<typeof useLoginModal>;
  let authenticated: Ref<boolean>;
  let mountOptions: ComponentMountingOptions<ErrorComponentType>;

  beforeEach(() => {
    route = {};
    authenticated = ref(false);
    mountOptions = {
      global: {
        plugins: [createTestingPinia()],
        provide: {
          authenticated,
        },
      },
    };
  });

  it('should have retrieve custom error on routing', () => {
    route = {
      path: '/custom-error',
      name: 'CustomMessage',
      meta: { errorMessage: customErrorMsg },
    };
    const wrapper = shallowMount(Error, mountOptions);
    error = wrapper.vm;
    login = useLoginModal();

    expect(error.errorMessage).toBe(customErrorMsg);
    expect(error.error403).toBeFalsy();
    expect(error.error404).toBeFalsy();
    expect(login.showLogin).not.toHaveBeenCalled();
  });

  it('should have set forbidden error on routing', () => {
    route = {
      meta: { error403: true },
    };
    const wrapper = shallowMount(Error, mountOptions);
    error = wrapper.vm;
    login = useLoginModal();

    expect(error.errorMessage).toBeNull();
    expect(error.error403).toBeTruthy();
    expect(error.error404).toBeFalsy();
    expect(login.showLogin).toHaveBeenCalled();
  });

  it('should have set not found error on routing', () => {
    route = {
      meta: { error404: true },
    };
    const wrapper = shallowMount(Error, mountOptions);
    error = wrapper.vm;
    login = useLoginModal();

    expect(error.errorMessage).toBeNull();
    expect(error.error403).toBeFalsy();
    expect(error.error404).toBeTruthy();
    expect(login.showLogin).not.toHaveBeenCalled();
  });

  it('should have set default on no error', () => {
    const wrapper = shallowMount(Error, mountOptions);
    error = wrapper.vm;
    login = useLoginModal();

    expect(error.errorMessage).toBeNull();
    expect(error.error403).toBeFalsy();
    expect(error.error404).toBeFalsy();
    expect(login.showLogin).not.toHaveBeenCalled();
  });
});
