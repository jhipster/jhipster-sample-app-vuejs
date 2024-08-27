import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import BankAccountMySuffixService from './bank-account-my-suffix.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { useDateFormat, useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';
import { BankAccountMySuffix, type IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import { BankAccountType } from '@/shared/model/enumerations/bank-account-type.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'BankAccountMySuffixUpdate',
  setup() {
    const bankAccountService = inject('bankAccountService', () => new BankAccountMySuffixService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const bankAccount: Ref<IBankAccountMySuffix> = ref(new BankAccountMySuffix());
    const userService = inject('userService', () => new UserService());
    const users: Ref<Array<any>> = ref([]);
    const bankAccountTypeValues: Ref<string[]> = ref(Object.keys(BankAccountType));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveBankAccountMySuffix = async bankAccountId => {
      try {
        const res = await bankAccountService().find(bankAccountId);
        res.lastOperationDate = new Date(res.lastOperationDate);
        bankAccount.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.bankAccountId) {
      retrieveBankAccountMySuffix(route.params.bankAccountId);
    }

    const initRelationships = () => {
      userService()
        .retrieve()
        .then(res => {
          users.value = res.data;
        });
    };

    initRelationships();

    const dataUtils = useDataUtils();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      name: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      bankNumber: {},
      agencyNumber: {},
      lastOperationDuration: {},
      meanOperationDuration: {},
      balance: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      openingDay: {},
      lastOperationDate: {},
      active: {},
      accountType: {},
      attachment: {},
      description: {},
      user: {},
    };
    const v$ = useVuelidate(validationRules, bankAccount as any);
    v$.value.$validate();

    return {
      bankAccountService,
      alertService,
      bankAccount,
      previousState,
      bankAccountTypeValues,
      isSaving,
      currentLanguage,
      users,
      ...dataUtils,
      v$,
      ...useDateFormat({ entityRef: bankAccount }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.bankAccount.id) {
        this.bankAccountService()
          .update(this.bankAccount)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('jhipsterSampleApplicationVueApp.testRootBankAccount.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.bankAccountService()
          .create(this.bankAccount)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(
              this.t$('jhipsterSampleApplicationVueApp.testRootBankAccount.created', { param: param.id }).toString(),
            );
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
