import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'JhiFooter',
  setup() {
    return {
      t$: useI18n().t,
    };
  },
});
