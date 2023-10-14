import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import HealthService from './health.service';
import JhiHealthModal from './health-modal.vue';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiHealth',
  components: {
    'health-modal': JhiHealthModal,
  },
  setup() {
    const healthService = inject('healthService', () => new HealthService(), true);

    const healthData: Ref<any> = ref(null);
    const currentHealth: Ref<any> = ref(null);
    const updatingHealth = ref(false);

    return {
      healthService,
      healthData,
      currentHealth,
      updatingHealth,
      t$: useI18n().t,
    };
  },
  mounted(): void {
    this.refresh();
  },
  methods: {
    baseName(name: any): any {
      return this.healthService.getBaseName(name);
    },
    getBadgeClass(statusState: any): string {
      if (statusState === 'UP') {
        return 'badge-success';
      }
      return 'badge-danger';
    },
    refresh(): void {
      this.updatingHealth = true;
      this.healthService
        .checkHealth()
        .then(res => {
          this.healthData = this.healthService.transformHealthData(res.data);
          this.updatingHealth = false;
        })
        .catch(error => {
          if (error.status === 503) {
            this.healthData = this.healthService.transformHealthData(error.error);
          }
          this.updatingHealth = false;
        });
    },
    showHealth(health: any): void {
      this.currentHealth = health;
      (<any>this.$refs.healthModal).show();
    },
    subSystemName(name: string): string {
      return this.healthService.getSubSystemName(name);
    },
  },
});
