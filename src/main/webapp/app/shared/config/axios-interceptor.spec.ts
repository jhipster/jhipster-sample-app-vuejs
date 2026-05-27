import { beforeEach, describe, expect, it, vi } from 'vitest';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { AUTHENTICATION_TOKEN_KEY } from '@/shared/jhipster/constants';

import * as setupAxiosConfig from './axios-interceptor';

const mock = new MockAdapter(axios);

describe('Axios interceptor', () => {
  beforeEach(() => {
    axios.interceptors.request.clear();
    axios.interceptors.response.clear();
  });

  it('should use localStorage to provide bearer', () => {
    localStorage.setItem(AUTHENTICATION_TOKEN_KEY, 'auth');
    const result = setupAxiosConfig.onRequestSuccess(() => console.log('A problem occurred'));

    expect(result.headers.Authorization).toBe('Bearer auth');
    expect(result.url.indexOf(SERVER_API_URL)).toBeGreaterThan(-1);
  });

  it('should use sessionStorage to provide bearer', () => {
    sessionStorage.setItem(AUTHENTICATION_TOKEN_KEY, 'auth');
    const result = setupAxiosConfig.onRequestSuccess(() => console.log('A problem occurred'));

    expect(result.headers.Authorization).toBe('Bearer auth');
    expect(result.url.indexOf(SERVER_API_URL)).toBeGreaterThan(-1);
  });
});

describe('Axios errors interceptor', () => {
  it('should use callback on 401, 403 errors', async () => {
    const callback = vi.fn();

    setupAxiosConfig.setupAxiosInterceptors(callback, () => {});

    try {
      mock.onGet().reply(401);
      await axios('/api/test');
    } catch {
      expect(callback).toHaveBeenCalled();
    }
  });
  it('should use callback 50x errors', async () => {
    const callback = vi.fn();

    setupAxiosConfig.setupAxiosInterceptors(() => {}, callback);

    try {
      mock.onGet().reply(500);
      await axios('/api/test');
    } catch {
      expect(callback).toHaveBeenCalled();
    }
  });
  it('should not use callback for errors different 50x, 401, 403', async () => {
    const callback = vi.fn();

    setupAxiosConfig.setupAxiosInterceptors(() => {}, callback);

    try {
      mock.onGet().reply(402);
      await axios('/api/test');
    } catch {
      expect(callback).not.toHaveBeenCalled();
    }
  });
});
