import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import axios from 'axios';

import ResetPasswordFinish from './reset-password-finish.vue';

type ResetPasswordFinishComponentType = InstanceType<typeof ResetPasswordFinish>;

const axiosStub = {
  get: vi.spyOn(axios, 'get'),
  post: vi.spyOn(axios, 'post'),
};

describe('Reset Component Finish', () => {
  let resetPasswordFinish: ResetPasswordFinishComponentType;

  beforeEach(() => {
    axiosStub.post.mockReset();
    const wrapper = shallowMount(ResetPasswordFinish, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    resetPasswordFinish = wrapper.vm;
  });

  it('should reset finish be a success', async () => {
    // Given
    axiosStub.post.mockResolvedValue(undefined);

    // When
    await resetPasswordFinish.finishReset();

    // Then
    expect(resetPasswordFinish.success).toBeTruthy();
  });

  it('should reset request fail as an error', async () => {
    // Given
    axiosStub.post.mockRejectedValue({
      response: {
        status: null,
        data: {
          type: null,
        },
      },
    });

    // When
    await resetPasswordFinish.finishReset();
    await resetPasswordFinish.$nextTick();

    // Then
    expect(resetPasswordFinish.success).toBeNull();
    expect(resetPasswordFinish.error).toEqual('ERROR');
  });
});
