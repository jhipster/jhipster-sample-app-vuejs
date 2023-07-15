import { computed, defineComponent, inject, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import BankAccountMySuffixService from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import LabelService from '@/entities/test-root/label/label.service';
import { ILabel } from '@/shared/model/test-root/label.model';
import { IOperation, Operation } from '@/shared/model/test-root/operation.model';
import OperationService from './operation.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'OperationUpdate',
  setup() {
    const operationService = inject('operationService', () => new OperationService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const operation: Ref<IOperation> = ref(new Operation());
    const bankAccountService = inject('bankAccountService', () => new BankAccountMySuffixService());
    const bankAccounts: Ref<IBankAccountMySuffix[]> = ref([]);
    const labelService = inject('labelService', () => new LabelService());
    const labels: Ref<ILabel[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveOperation = async operationId => {
      try {
        const res = await operationService().find(operationId);
        res.date = new Date(res.date);
        operation.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.operationId) {
      retrieveOperation(route.params.operationId);
    }

    const initRelationships = () => {
      bankAccountService()
        .retrieve()
        .then(res => {
          bankAccounts.value = res.data;
        });
      labelService()
        .retrieve()
        .then(res => {
          labels.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      date: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      description: {},
      amount: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      bankAccount: {},
      labels: {},
    };
    const v$ = useVuelidate(validationRules, operation as any);
    v$.value.$validate();

    return {
      operationService,
      alertService,
      operation,
      previousState,
      isSaving,
      currentLanguage,
      bankAccounts,
      labels,
      v$,
      ...useDateFormat({ entityRef: operation }),
      t$,
    };
  },
  created(): void {
    this.operation.labels = [];
  },
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.operation.id) {
        this.operationService()
          .update(this.operation)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('jhipsterSampleApplicationVueApp.testRootOperation.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.operationService()
          .create(this.operation)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(
              this.t$('jhipsterSampleApplicationVueApp.testRootOperation.created', { param: param.id }).toString()
            );
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    getSelected(selectedVals, option): any {
      if (selectedVals) {
        return selectedVals.find(value => option.id === value.id) ?? option;
      }
      return option;
    },
  },
});
