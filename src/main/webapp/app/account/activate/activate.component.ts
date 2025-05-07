import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import ActivateService from './activate.service';
import { useLoginModal } from '@/account/login-modal';

export default defineComponent({
  compatConfig: { MODE: 3 },
  setup() {
    const activateService = inject('activateService', () => new ActivateService(), true);
    const { showLogin } = useLoginModal();
    const route = useRoute();

    const success: Ref<boolean> = ref(false);
    const error: Ref<boolean> = ref(false);

    onMounted(async () => {
      const key = Array.isArray(route.query.key) ? route.query.key[0] : route.query.key;
      try {
        await activateService.activateAccount(key);
        success.value = true;
        error.value = false;
      } catch {
        error.value = true;
        success.value = false;
      }
    });

    return {
      activateService,
      showLogin,
      success,
      error,
      t$: useI18n().t,
    };
  },
});
