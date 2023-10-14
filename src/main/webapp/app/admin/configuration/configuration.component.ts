import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ConfigurationService from './configuration.service';
import { orderAndFilterBy } from '@/shared/computables';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiConfiguration',
  setup() {
    const configurationService = inject('configurationService', () => new ConfigurationService(), true);

    const orderProp = ref('prefix');
    const reverse = ref(false);
    const allConfiguration: Ref<any> = ref({});
    const configuration: Ref<any[]> = ref([]);
    const configKeys: Ref<any[]> = ref([]);
    const filtered = ref('');

    const filteredConfiguration = computed(() =>
      orderAndFilterBy(configuration.value, {
        filterByTerm: filtered.value,
        orderByProp: orderProp.value,
        reverse: reverse.value,
      }),
    );

    return {
      configurationService,
      orderProp,
      reverse,
      allConfiguration,
      configuration,
      configKeys,
      filtered,
      filteredConfiguration,
      t$: useI18n().t,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(): void {
      this.configurationService.loadConfiguration().then(res => {
        this.configuration = res;

        for (const config of this.configuration) {
          if (config.properties !== undefined) {
            this.configKeys.push(Object.keys(config.properties));
          }
        }
      });

      this.configurationService.loadEnvConfiguration().then(res => {
        this.allConfiguration = res;
      });
    },
    changeOrder(prop: string): void {
      this.orderProp = prop;
      this.reverse = !this.reverse;
    },
    keys(dict: any): string[] {
      return dict === undefined ? [] : Object.keys(dict);
    },
  },
});
