import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import LabelService from './label.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import OperationService from '@/entities/test-root/operation/operation.service';
import { type IOperation } from '@/shared/model/test-root/operation.model';
import { type ILabel, Label } from '@/shared/model/test-root/label.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LabelUpdate',
  setup() {
    const labelService = inject('labelService', () => new LabelService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const label: Ref<ILabel> = ref(new Label());

    const operationService = inject('operationService', () => new OperationService());

    const operations: Ref<IOperation[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveLabel = async labelId => {
      try {
        const res = await labelService().find(labelId);
        label.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.labelId) {
      retrieveLabel(route.params.labelId);
    }

    const initRelationships = () => {
      operationService()
        .retrieve()
        .then(res => {
          operations.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      labelName: {
        required: validations.required(t$('entity.validation.required').toString()),
        minLength: validations.minLength(t$('entity.validation.minlength', { min: 3 }).toString(), 3),
      },
      operations: {},
    };
    const v$ = useVuelidate(validationRules, label as any);
    v$.value.$validate();

    return {
      labelService,
      alertService,
      label,
      previousState,
      isSaving,
      currentLanguage,
      operations,
      v$,
      t$,
    };
  },
  created(): void {
    this.label.operations = [];
  },
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.label.id) {
        this.labelService()
          .update(this.label)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('jhipsterSampleApplicationVueApp.testRootLabel.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.labelService()
          .create(this.label)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('jhipsterSampleApplicationVueApp.testRootLabel.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    getSelected(selectedVals, option, pkField = 'id'): any {
      if (selectedVals) {
        return selectedVals.find(value => option[pkField] === value[pkField]) ?? option;
      }
      return option;
    },
  },
});
