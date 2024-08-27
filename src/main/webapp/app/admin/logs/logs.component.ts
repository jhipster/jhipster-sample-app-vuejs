import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import LogsService from './logs.service';
import { orderAndFilterBy } from '@/shared/computables';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiLogs',
  setup() {
    const logsService = inject('logsService', () => new LogsService(), true);

    const loggers: Ref<any[]> = ref([]);
    const filtered = ref('');
    const orderProp = ref('name');
    const reverse = ref(false);
    const filteredLoggers = computed(() =>
      orderAndFilterBy(loggers.value, {
        filterByTerm: filtered.value,
        orderByProp: orderProp.value,
        reverse: reverse.value,
      }),
    );

    return {
      logsService,
      loggers,
      filtered,
      orderProp,
      reverse,
      filteredLoggers,
      t$: useI18n().t,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(): void {
      this.logsService.findAll().then(response => {
        this.extractLoggers(response);
      });
    },
    updateLevel(name: string, level: string): void {
      this.logsService.changeLevel(name, level).then(() => {
        this.init();
      });
    },
    changeOrder(orderProp: string): void {
      this.orderProp = orderProp;
      this.reverse = !this.reverse;
    },
    extractLoggers(response) {
      this.loggers = [];
      if (response.data) {
        for (const key of Object.keys(response.data.loggers)) {
          const logger = response.data.loggers[key];
          this.loggers.push({ name: key, level: logger.effectiveLevel });
        }
      }
    },
  },
});
