import { vitest } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import sinon from 'sinon';

import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';
import UserManagement from '../../../......mainwebappapp/admin/user-management/user-management.vue';

type UserManagementComponentType = InstanceType<typeof UserManagement>;

const axiosStub = {
  delete: sinon.stub(axios, 'delete'),
  get: sinon.stub(axios, 'get'),
  put: sinon.stub(axios, 'put'),
};

describe('UserManagement Component', () => {
  let userManagement: UserManagementComponentType;
  let alertService: AlertService;

  beforeEach(() => {
    axiosStub.put.reset();
    axiosStub.get.reset();
    axiosStub.get.resolves({ headers: {} });

    alertService = new AlertService({
      i18n: { t: vitest.fn() } as any,
      bvToast: {
        toast: vitest.fn(),
      } as any,
    });

    const wrapper = shallowMount(UserManagement, {
      global: {
        stubs: {
          bPagination: true,
          jhiItemCount: true,
          bModal: true,
          'router-link': true,
          'jhi-sort-indicator': true,
          'font-awesome-icon': true,
          'b-button': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          currentUsername: ref(''),
        },
      },
    });
    userManagement = wrapper.vm;
  });

  describe('OnInit', () => {
    it('Should call load all on init', async () => {
      // WHEN
      userManagement.loadAll();
      await userManagement.$nextTick();

      // THEN
      expect(axiosStub.get.calledWith(`api/admin/users?sort=id,asc&page=0&size=20`)).toBeTruthy();
    });
  });

  describe('setActive', () => {
    it('Should update user and call load all', async () => {
      // GIVEN
      axiosStub.put.resolves({});

      // WHEN
      userManagement.setActive({ id: 123 }, true);
      await userManagement.$nextTick();

      // THEN
      expect(axiosStub.put.calledWith(`api/admin/users`, { id: 123, activated: true })).toBeTruthy();
      expect(axiosStub.get.calledWith(`api/admin/users?sort=id,asc&page=0&size=20`)).toBeTruthy();
    });
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      axiosStub.delete.resolves({
        headers: {
          'x-jhipstersampleapplicationvueapp-alert': '',
          'x-jhipstersampleapplicationvueapp-params': '',
        },
      });

      // WHEN
      userManagement.prepareRemove({ login: 123 });
      userManagement.deleteUser();
      await userManagement.$nextTick();

      // THEN
      expect(axiosStub.delete.calledWith('api/admin/users/' + 123)).toBeTruthy();
      expect(axiosStub.get.calledWith(`api/admin/users?sort=id,asc&page=0&size=20`)).toBeTruthy();
    });
  });

  describe('change order', () => {
    it('should change order and invert reverse', () => {
      // WHEN
      userManagement.changeOrder('dummy-order');

      // THEN
      expect(userManagement.propOrder).toEqual('dummy-order');
      expect(userManagement.reverse).toBe(true);
    });
  });
});
