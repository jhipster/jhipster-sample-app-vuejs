import { vitest } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import Home from './home.vue';

type HomeComponentType = InstanceType<typeof Home>;

describe('Home', () => {
  let home: HomeComponentType;
  let authenticated;
  let currentUsername;
  const loginService = { openLogin: vitest.fn() };

  beforeEach(() => {
    authenticated = ref(false);
    currentUsername = ref('');
    const wrapper = shallowMount(Home, {
      global: {
        stubs: {
          'router-link': true,
        },
        provide: {
          loginService,
          authenticated,
          currentUsername,
        },
      },
    });
    home = wrapper.vm;
  });

  it('should not have user data set', () => {
    expect(home.authenticated).toBeFalsy();
    expect(home.username).toBe('');
  });

  it('should have user data set after authentication', () => {
    authenticated.value = true;
    currentUsername.value = 'test';

    expect(home.authenticated).toBeTruthy();
    expect(home.username).toBe('test');
  });

  it('should use login service', () => {
    home.openLogin();

    expect(loginService.openLogin).toHaveBeenCalled();
  });
});
