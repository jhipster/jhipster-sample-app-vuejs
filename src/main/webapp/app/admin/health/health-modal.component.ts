import { defineComponent, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import HealthService from './health.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiHealthModal',
  props: {
    currentHealth: {},
  },
  setup() {
    const healthService = inject('healthService', () => new HealthService(), true);

    return {
      healthService,
      t$: useI18n().t,
    };
  },
  methods: {
    baseName(name: string): any {
      return this.healthService.getBaseName(name);
    },
    subSystemName(name: string): any {
      return this.healthService.getSubSystemName(name);
    },
    readableValue(value: any): string {
      if (this.currentHealth.name === 'diskSpace') {
        // Should display storage space in an human readable unit
        const val = value / 1073741824;
        if (val > 1) {
          // Value
          return `${val.toFixed(2)} GB`;
        }
        return `${(value / 1048576).toFixed(2)} MB`;
      }

      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return value.toString();
    },
  },
});
