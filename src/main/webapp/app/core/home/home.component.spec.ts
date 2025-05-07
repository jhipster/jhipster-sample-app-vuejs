import { beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Home from './home.vue';
import { useLoginModal } from '@/account/login-modal';

type HomeComponentType = InstanceType<typeof Home>;

describe('Home', () => {
  let home: HomeComponentType;
  let authenticated;
  let currentUsername;
  let login: ReturnType<typeof useLoginModal>;

  beforeEach(() => {
    authenticated = ref(false);
    currentUsername = ref('');
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'router-link': true,
        },
        provide: {
          authenticated,
          currentUsername,
        },
      },
    });
    home = wrapper.vm;
    login = useLoginModal();
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
    home.showLogin();
    expect(login.showLogin).toHaveBeenCalled();
  });
});
