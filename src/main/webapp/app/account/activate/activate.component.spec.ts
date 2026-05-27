import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createTestingPinia } from '@pinia/testing';
import { type ComponentMountingOptions, shallowMount } from '@vue/test-utils';
import axios from 'axios';

import Activate from './activate.vue';

type ActivateComponentType = InstanceType<typeof Activate>;

const route = { query: { key: 'key' } };

vi.mock('vue-router', () => ({
  useRoute: () => route,
}));

const axiosStub = {
  get: vi.spyOn(axios, 'get'),
  post: vi.spyOn(axios, 'post'),
};

describe('Activate Component', () => {
  let activate: ActivateComponentType;
  let mountOptions: ComponentMountingOptions<ActivateComponentType>;

  beforeEach(() => {
    mountOptions = {
      global: {
        plugins: [createTestingPinia()],
      },
    };
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should display error when activation fails', async () => {
    axiosStub.get.mockRejectedValue({});

    const wrapper = shallowMount(Activate, mountOptions);
    activate = wrapper.vm;
    await activate.$nextTick();

    expect(activate.error).toBeTruthy();
    expect(activate.success).toBeFalsy();
  });

  it('should display success when activation succeeds', async () => {
    axiosStub.get.mockResolvedValue({});

    const wrapper = shallowMount(Activate, mountOptions);
    activate = wrapper.vm;
    await activate.$nextTick();

    expect(activate.error).toBeFalsy();
    expect(activate.success).toBeTruthy();
  });
});
