import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import UserManagementEdit from '@/admin/user-management/user-management-edit.vue';
import UserManagementEditClass from '@/admin/user-management/user-management-edit.component';
import UserManagementService from '@/admin/user-management/user-management.service';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', FontAwesomeIcon);
localVue.component('b-alert', {});

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

describe('UserManagementEdit Component', () => {
  let wrapper: Wrapper<UserManagementEditClass>;
  let userManagementEdit: UserManagementEditClass;

  beforeEach(() => {
    const router = new VueRouter();
    wrapper = shallowMount<UserManagementEditClass>(UserManagementEdit, {
      store,
      router,
      i18n,
      localVue,
      provide: {
        alertService: () => new AlertService(store),
        userService: () => new UserManagementService(),
      },
    });
    userManagementEdit = wrapper.vm;
  });

  describe('init', () => {
    it('Should load user', async () => {
      // GIVEN
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      // WHEN
      userManagementEdit.init(123);
      await userManagementEdit.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalledWith('api/users/' + 123);
    });
  });

  describe('initAuthorities', () => {
    it('Should load authorities', async () => {
      // GIVEN
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      // WHEN
      userManagementEdit.initAuthorities();
      await userManagementEdit.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalledWith(`api/users/authorities`);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing user', async () => {
      // GIVEN
      mockedAxios.put.mockReturnValue(Promise.resolve({ headers: {} }));
      userManagementEdit.userAccount = { id: 123, authorities: [] };

      // WHEN
      userManagementEdit.save();
      await userManagementEdit.$nextTick();

      // THEN
      expect(mockedAxios.put).toHaveBeenCalledWith(`api/users`, { id: 123, authorities: [] });
      expect(userManagementEdit.isSaving).toEqual(false);
    });

    it('Should call create service on save for new user', async () => {
      // GIVEN
      mockedAxios.post.mockReturnValue(Promise.resolve({ headers: {} }));
      userManagementEdit.userAccount = { authorities: [] };

      // WHEN
      userManagementEdit.save();
      await userManagementEdit.$nextTick();

      // THEN
      expect(mockedAxios.post).toHaveBeenCalledWith(`api/users`, { authorities: [] });
      expect(userManagementEdit.isSaving).toEqual(false);
    });
  });
});
