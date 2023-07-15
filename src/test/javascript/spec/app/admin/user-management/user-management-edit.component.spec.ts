import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import axios from 'axios';
import sinon from 'sinon';
import { RouteLocation } from 'vue-router';

import AlertService from '../../../......mainwebappapp/shared/alert/alert.service';
import UserManagementEdit from '../../../......mainwebappapp/admin/user-management/user-management-edit.vue';

type UserManagementEditComponentType = InstanceType<typeof UserManagementEdit>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

describe('UserManagementEdit Component', () => {
  const axiosStub = {
    get: sinon.stub(axios, 'get'),
    post: sinon.stub(axios, 'post'),
    put: sinon.stub(axios, 'put'),
  };
  let mountOptions: MountingOptions<UserManagementEditComponentType>['global'];
  let alertService: AlertService;

  beforeEach(() => {
    route = {};
    alertService = new AlertService({
      i18n: { t: vitest.fn() } as any,
      bvToast: {
        toast: vitest.fn(),
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

    axiosStub.get.reset();
    axiosStub.post.reset();
    axiosStub.put.reset();
  });

  describe('init', () => {
    it('Should load user', async () => {
      // GIVEN
      axiosStub.get.withArgs('api/admin/users/' + 123).resolves({});
      axiosStub.get.withArgs('api/authorities').resolves({ data: [] });
      route = {
        params: {
          userId: '' + 123,
        },
      };
      const wrapper = shallowMount(UserManagementEdit, { global: mountOptions });
      const userManagementEdit: UserManagementEditComponentType = wrapper.vm;

      // WHEN
      await userManagementEdit.$nextTick();

      // THEN
      expect(axiosStub.get.calledWith('api/authorities')).toBeTruthy();
      expect(axiosStub.get.calledWith('api/admin/users/' + 123)).toBeTruthy();
    });
    it('Should open create user', async () => {
      // GIVEN
      axiosStub.get.resolves({});
      axiosStub.get.withArgs('api/authorities').resolves({ data: [] });
      route = {
        params: {},
      };
      const wrapper = shallowMount(UserManagementEdit, { global: mountOptions });
      const userManagementEdit: UserManagementEditComponentType = wrapper.vm;

      // WHEN
      await userManagementEdit.$nextTick();

      // THEN
      expect(axiosStub.get.calledWith('api/authorities')).toBeTruthy();
      expect(axiosStub.get.callCount).toBe(1);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing user', async () => {
      // GIVEN
      axiosStub.put.resolves({
        headers: {
          'x-jhipstersampleapplicationvueapp-alert': '',
          'x-jhipstersampleapplicationvueapp-params': '',
        },
      });
      axiosStub.get.withArgs('api/admin/users/' + 123).resolves({
        data: { id: 123, authorities: [] },
      });
      axiosStub.get.withArgs('api/authorities').resolves({ data: [] });
      route = {
        params: {
          userId: '' + 123,
        },
      };
      const wrapper = shallowMount(UserManagementEdit, { global: mountOptions });
      const userManagementEdit: UserManagementEditComponentType = wrapper.vm;
      await userManagementEdit.$nextTick();

      // WHEN
      userManagementEdit.save();
      await userManagementEdit.$nextTick();

      // THEN
      expect(axiosStub.put.calledWith('api/admin/users', { id: 123, authorities: [] })).toBeTruthy();
      expect(userManagementEdit.isSaving).toEqual(false);
    });

    it('Should call create service on save for new user', async () => {
      // GIVEN
      axiosStub.post.resolves({
        headers: {
          'x-jhipstersampleapplicationvueapp-alert': '',
          'x-jhipstersampleapplicationvueapp-params': '',
        },
      });
      axiosStub.get.resolves({});
      axiosStub.get.withArgs('api/authorities').resolves({ data: [] });
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
      expect(
        axiosStub.post.calledWith('api/admin/users', {
          authorities: [],
        })
      ).toBeTruthy();
      expect(userManagementEdit.isSaving).toEqual(false);
    });
  });
});
