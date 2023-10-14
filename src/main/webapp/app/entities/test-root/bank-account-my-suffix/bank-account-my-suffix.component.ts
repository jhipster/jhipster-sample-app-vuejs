import { defineComponent, inject, onMounted, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import BankAccountMySuffixService from './bank-account-my-suffix.service';
import { type IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import useDataUtils from '@/shared/data/data-utils.service';
import { useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankAccountMySuffix',
  setup() {
    const { t: t$ } = useI18n();
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const bankAccountService = inject('bankAccountService', () => new BankAccountMySuffixService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const bankAccounts: Ref<IBankAccountMySuffix[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveBankAccountMySuffixs = async () => {
      isFetching.value = true;
      try {
        const res = await bankAccountService().retrieve();
        bankAccounts.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveBankAccountMySuffixs();
    };

    onMounted(async () => {
      await retrieveBankAccountMySuffixs();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IBankAccountMySuffix) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeBankAccountMySuffix = async () => {
      try {
        await bankAccountService().delete(removeId.value);
        const message = t$('jhipsterSampleApplicationVueApp.testRootBankAccount.deleted', { param: removeId.value }).toString();
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveBankAccountMySuffixs();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      bankAccounts,
      handleSyncList,
      isFetching,
      retrieveBankAccountMySuffixs,
      clear,
      ...dateFormat,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeBankAccountMySuffix,
      t$,
      ...dataUtils,
    };
  },
});
