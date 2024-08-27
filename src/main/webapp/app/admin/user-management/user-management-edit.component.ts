import { type Ref, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { useRoute, useRouter } from 'vue-router';
import UserManagementService from './user-management.service';
import { type IUser, User } from '@/shared/model/user.model';
import { useAlertService } from '@/shared/alert/alert.service';
import languages from '@/shared/config/languages';

const loginValidator = (value: string) => {
  if (!value) {
    return true;
  }
  return /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/.test(value);
};

const validations: any = {
  userAccount: {
    login: {
      required,
      maxLength: maxLength(254),
      pattern: loginValidator,
    },
    firstName: {
      maxLength: maxLength(50),
    },
    lastName: {
      maxLength: maxLength(50),
    },
    email: {
      required,
      email,
      minLength: minLength(5),
      maxLength: maxLength(50),
    },
  },
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiUserManagementEdit',
  validations,
  setup() {
    const route = useRoute();
    const router = useRouter();

    const alertService = inject('alertService', () => useAlertService(), true);
    const userManagementService = inject('userManagementService', () => new UserManagementService(), true);
    const previousState = () => router.go(-1);

    const userAccount: Ref<IUser> = ref({ ...new User(), authorities: [] });
    const isSaving: Ref<boolean> = ref(false);
    const authorities: Ref<string[]> = ref([]);

    const initAuthorities = async () => {
      const response = await userManagementService.retrieveAuthorities();
      authorities.value = response.data;
    };

    const loadUser = async (userId: string) => {
      const response = await userManagementService.get(userId);
      userAccount.value = response.data;
    };

    initAuthorities();
    const userId = route.params?.userId;
    if (userId) {
      loadUser(userId);
    }

    return {
      alertService,
      userAccount,
      isSaving,
      authorities,
      userManagementService,
      previousState,
      v$: useVuelidate(),
      languages: languages(),
      t$: useI18n().t,
    };
  },
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.userAccount.id) {
        this.userManagementService
          .update(this.userAccount)
          .then(res => {
            this.returnToList();
            this.alertService.showInfo(this.getToastMessageFromHeader(res));
          })
          .catch(error => {
            this.isSaving = true;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.userManagementService
          .create(this.userAccount)
          .then(res => {
            this.returnToList();
            this.alertService.showSuccess(this.getToastMessageFromHeader(res));
          })
          .catch(error => {
            this.isSaving = true;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    returnToList(): void {
      this.isSaving = false;
      this.previousState();
    },

    getToastMessageFromHeader(res: any): string {
      return this.t$(res.headers['x-jhipstersampleapplicationvueapp-alert'], {
        param: decodeURIComponent(res.headers['x-jhipstersampleapplicationvueapp-params'].replace(/\+/g, ' ')),
      }).toString();
    },
  },
});
