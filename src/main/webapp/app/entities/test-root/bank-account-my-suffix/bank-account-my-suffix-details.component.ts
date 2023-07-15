import { defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import useDataUtils from '@/shared/data/data-utils.service';
import { useDateFormat } from '@/shared/composables';
import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import BankAccountMySuffixService from './bank-account-my-suffix.service';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankAccountMySuffixDetails',
  setup() {
    const dateFormat = useDateFormat();
    const bankAccountService = inject('bankAccountService', () => new BankAccountMySuffixService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const dataUtils = useDataUtils();

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const bankAccount: Ref<IBankAccountMySuffix> = ref({});

    const retrieveBankAccountMySuffix = async bankAccountId => {
      try {
        const res = await bankAccountService().find(bankAccountId);
        bankAccount.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.bankAccountId) {
      retrieveBankAccountMySuffix(route.params.bankAccountId);
    }

    return {
      ...dateFormat,
      alertService,
      bankAccount,

      ...dataUtils,

      previousState,
      t$: useI18n().t,
    };
  },
});
