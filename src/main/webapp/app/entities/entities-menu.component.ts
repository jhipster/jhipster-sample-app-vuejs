import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'EntitiesMenu',
  setup() {
    const i18n = useI18n();
    return {
      t$: i18n.t,
    };
  },
});
