import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { shallowMount } from '@vue/test-utils';
import axios from 'axios';

import AlertService from '@/shared/alert/alert.service';
import { Authority } from '@/shared/jhipster/constants';

import UserManagementView from './user-management-view.vue';

let route: Partial<RouteLocation>;

vi.mock('vue-router', () => ({
  useRoute: () => route,
}));

const axiosStub = {
  get: vi.spyOn(axios, 'get'),
};

describe('UserManagementView Component', () => {
  let alertService: AlertService;

  beforeEach(() => {
    route = {};
    alertService = new AlertService({
      i18n: { t: vi.fn() } as any,
      toast: {
        create: vi.fn(),
      } as any,
    });
  });

  describe('OnInit', () => {
    it('Should call load all on init', async () => {
      // GIVEN
      const userData = {
        id: 1,
        login: 'user',
        firstName: 'first',
        lastName: 'last',
        email: 'first@last.com',
        activated: true,
        langKey: 'en',
        authorities: [Authority.USER],
        createdBy: 'admin',
        createdDate: null,
        lastModifiedBy: null,
        lastModifiedDate: null,
        password: null,
      };
      axiosStub.get.mockResolvedValue({ data: userData });

      route = {
        params: {
          userId: `${123}`,
        },
      };

      const wrapper = shallowMount(UserManagementView, {
        global: {
          stubs: {
            'b-badge': true,
            'router-link': true,
            'font-awesome-icon': true,
          },
          provide: {
            alertService,
          },
        },
      });
      const userManagementView = wrapper.vm;

      // WHEN
      await userManagementView.$nextTick();

      // THEN
      expect(axiosStub.get).toHaveBeenCalledWith(`api/admin/users/${123}`);
      expect(userManagementView.user).toEqual(userData);
    });
  });
});
