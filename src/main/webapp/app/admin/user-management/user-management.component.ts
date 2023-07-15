import { ComputedRef, defineComponent, inject, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import UserManagementService from './user-management.service';
import { useAlertService } from '@/shared/alert/alert.service';

import { useDateFormat } from '@/shared/composables';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiUserManagementComponent',
  mounted(): void {
    this.loadAll();
  },
  setup(prop) {
    const alertService = inject('alertService', () => useAlertService(), true);
    const { formatDateShort: formatDate } = useDateFormat();
    const userManagementService = inject('userManagementService', () => new UserManagementService(), true);
    const username = inject<ComputedRef<string>>('currentUsername');

    const error = ref('');
    const success = ref('');
    const itemsPerPage = ref(20);
    const page = ref(1);
    const previousPage = ref(1);
    const propOrder = ref('id');
    const reverse = ref(false);
    const isLoading = ref(false);
    const removeId: Ref<number> = ref(null);
    const users: Ref<any[]> = ref([]);
    const totalItems = ref(0);
    const queryCount: Ref<number> = ref(null);

    return {
      formatDate,
      userManagementService,
      alertService,
      error,
      success,
      itemsPerPage,
      page,
      previousPage,
      propOrder,
      reverse,
      isLoading,
      removeId,
      users,
      username,
      totalItems,
      queryCount,
      t$: useI18n().t,
    };
  },
  methods: {
    setActive(user, isActivated): void {
      user.activated = isActivated;
      this.userManagementService
        .update(user)
        .then(() => {
          this.error = null;
          this.success = 'OK';
          this.loadAll();
        })
        .catch(() => {
          this.success = null;
          this.error = 'ERROR';
          user.activated = false;
        });
    },
    loadAll(): void {
      this.isLoading = true;

      this.userManagementService
        .retrieve({
          sort: this.sort(),
          page: this.page - 1,
          size: this.itemsPerPage,
        })
        .then(res => {
          this.isLoading = false;
          this.users = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    handleSyncList(): void {
      this.loadAll();
    },
    sort(): any {
      const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
      if (this.propOrder !== 'id') {
        result.push('id');
      }
      return result;
    },
    loadPage(page: number): void {
      if (page !== this.previousPage) {
        this.previousPage = page;
        this.transition();
      }
    },
    transition(): void {
      this.loadAll();
    },
    changeOrder(propOrder: string): void {
      this.propOrder = propOrder;
      this.reverse = !this.reverse;
      this.transition();
    },
    deleteUser(): void {
      this.userManagementService
        .remove(this.removeId)
        .then(res => {
          this.alertService.showInfo(
            this.t$(res.headers['x-jhipstersampleapplicationvueapp-alert'].toString(), {
              param: decodeURIComponent(res.headers['x-jhipstersampleapplicationvueapp-params'].replace(/\+/g, ' ')),
            }),
            { variant: 'danger' }
          );
          this.removeId = null;
          this.loadAll();
          this.closeDialog();
        })
        .catch(error => {
          this.alertService.showHttpError(error.response);
        });
    },
    prepareRemove(instance): void {
      this.removeId = instance.login;
      if (<any>this.$refs.removeUser) {
        (<any>this.$refs.removeUser).show();
      }
    },
    closeDialog(): void {
      if (<any>this.$refs.removeUser) {
        (<any>this.$refs.removeUser).hide();
      }
    },
  },
});
