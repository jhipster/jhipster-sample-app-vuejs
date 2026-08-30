import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { type MountingOptions, shallowMount } from '@vue/test-utils';
import axios from 'axios';

import AlertService from '@/shared/alert/alert.service';
import { MESSAGE_ALERT_HEADER_NAME, MESSAGE_PARAM_HEADER_NAME } from '@/shared/jhipster/constants';

import UserManagementEdit from './user-management-edit.vue';

type UserManagementEditComponentType = InstanceType<typeof UserManagementEdit>;

let route: Partial<RouteLocation>;
const routerGoMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

describe('UserManagementEdit Component', () => {
  const axiosStub = {
    get: vi.spyOn(axios, 'get'),
    post: vi.spyOn(axios, 'post'),
    put: vi.spyOn(axios, 'put'),
  };
  let mountOptions: MountingOptions<UserManagementEditComponentType>['global'];
  let alertService: AlertService;

  beforeEach(() => {
    route = {};
    alertService = new AlertService({
      i18n: { t: vi.fn() } as any,
      toast: {
        create: vi.fn(),
      } as any,
    });

    mountOptions = {
      stubs: {
        'font-awesome-icon': true,
      },
      provide: {
        alertService,
      },
    };

    axiosStub.get.mockReset();
    axiosStub.post.mockReset();
    axiosStub.put.mockReset();
  });

  describe('init', () => {
    it('Should load user', async () => {
      // GIVEN
      axiosStub.get.mockImplementation((url?: string) => {
        if (url === `api/admin/users/${123}`) return Promise.resolve({});
        if (url === 'api/authorities') return Promise.resolve({ data: [] });
        return Promise.resolve({});
      });
      route = {
        params: {
          userId: `${123}`,
        },
      };
      const wrapper = shallowMount(UserManagementEdit, { global: mountOptions });
      const userManagementEdit: UserManagementEditComponentType = wrapper.vm;

      // WHEN
      await userManagementEdit.$nextTick();

      // THEN
      expect(axiosStub.get).toHaveBeenCalledWith('api/authorities');
      expect(axiosStub.get).toHaveBeenCalledWith(`api/admin/users/${123}`);
    });
    it('Should open create user', async () => {
      // GIVEN
      axiosStub.get.mockImplementation((url?: string) => {
        if (url === 'api/authorities') return Promise.resolve({ data: [] });
        return Promise.resolve({});
      });
      route = {
        params: {},
      };
      const wrapper = shallowMount(UserManagementEdit, { global: mountOptions });
      const userManagementEdit: UserManagementEditComponentType = wrapper.vm;

      // WHEN
      await userManagementEdit.$nextTick();

      // THEN
      expect(axiosStub.get).toHaveBeenCalledWith('api/authorities');
      expect(axiosStub.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing user', async () => {
      // GIVEN
      axiosStub.put.mockResolvedValue({
        headers: {
          [MESSAGE_ALERT_HEADER_NAME]: '',
          [MESSAGE_PARAM_HEADER_NAME]: '',
        },
      });
      axiosStub.get.mockImplementation((url?: string) => {
        if (url === `api/admin/users/${123}`) return Promise.resolve({ data: { id: 123, authorities: [] } });
        if (url === 'api/authorities') return Promise.resolve({ data: [] });
        return Promise.resolve({});
      });
      route = {
        params: {
          userId: `${123}`,
        },
      };
      const wrapper = shallowMount(UserManagementEdit, { global: mountOptions });
      const userManagementEdit: UserManagementEditComponentType = wrapper.vm;
      await userManagementEdit.$nextTick();

      // WHEN
      userManagementEdit.save();
      await userManagementEdit.$nextTick();

      // THEN
      expect(axiosStub.put).toHaveBeenCalledWith('api/admin/users', { id: 123, authorities: [] });
      expect(userManagementEdit.isSaving).toEqual(false);
    });

    it('Should call create service on save for new user', async () => {
      // GIVEN
      axiosStub.post.mockResolvedValue({
        headers: {
          [MESSAGE_ALERT_HEADER_NAME]: '',
          [MESSAGE_PARAM_HEADER_NAME]: '',
        },
      });
      axiosStub.get.mockImplementation((url?: string) => {
        if (url === 'api/authorities') return Promise.resolve({ data: [] });
        return Promise.resolve({});
      });
      route = {
        params: {},
      };
      const wrapper = shallowMount(UserManagementEdit, { global: mountOptions });
      const userManagementEdit: UserManagementEditComponentType = wrapper.vm;
      await userManagementEdit.$nextTick();
      userManagementEdit.userAccount = { authorities: [] };

      // WHEN
      userManagementEdit.save();
      await userManagementEdit.$nextTick();

      // THEN
      expect(axiosStub.post).toHaveBeenCalledWith('api/admin/users', {
        authorities: [],
      });
      expect(userManagementEdit.isSaving).toEqual(false);
    });
  });
});
