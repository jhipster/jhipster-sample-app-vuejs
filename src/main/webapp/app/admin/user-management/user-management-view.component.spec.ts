import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import sinon from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import { Authority } from '@/shared/jhipster/constants';

import UserManagementView from './user-management-view.vue';

let route: Partial<RouteLocation>;

vitest.mock('vue-router', () => ({
  useRoute: () => route,
}));

const axiosStub = {
  get: sinon.stub(axios, 'get'),
};

describe('UserManagementView Component', () => {
  let alertService: AlertService;

  beforeEach(() => {
    route = {};
    alertService = new AlertService({
      i18n: { t: vitest.fn() } as any,
      toast: {
        show: vitest.fn(),
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
      axiosStub.get.resolves({ data: userData });

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
      expect(axiosStub.get.calledWith(`api/admin/users/${123}`)).toBeTruthy();
      expect(userManagementView.user).toEqual(userData);
    });
  });
});
