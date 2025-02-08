import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Ribbon',
  setup() {
    const store = useStore();
    const ribbonEnv = computed(() => store.ribbonOnProfiles);
    const ribbonEnabled = computed(() => store.ribbonOnProfiles && store.activeProfiles.indexOf(store.ribbonOnProfiles) > -1);

    return {
      ribbonEnv,
      ribbonEnabled,
      t$: useI18n().t,
    };
  },
});
