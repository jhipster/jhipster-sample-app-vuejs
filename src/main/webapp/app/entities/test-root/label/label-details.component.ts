import { type Ref, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import LabelService from './label.service';
import { type ILabel } from '@/shared/model/test-root/label.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'LabelDetails',
  setup() {
    const labelService = inject('labelService', () => new LabelService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const label: Ref<ILabel> = ref({});

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

    return {
      alertService,
      label,

      previousState,
      t$: useI18n().t,
    };
  },
});
