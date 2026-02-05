import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import type AccountService from '@/account/account.service';
import { useLoginModal } from '@/account/login-modal';
import EntitiesMenu from '@/entities/entities-menu.vue';
import languages from '@/shared/config/languages';
import { useStore } from '@/store';

export default defineComponent({
  name: 'JhiNavbar',
  components: {
    'entities-menu': EntitiesMenu,
  },
  setup() {
    const { showLogin } = useLoginModal();
    const accountService = inject<AccountService>('accountService');
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);
    const changeLanguage = inject<(string) => Promise<void>>('changeLanguage');

    const isActiveLanguage = (key: string) => {
      return key === currentLanguage.value;
    };

    const router = useRouter();
    const store = useStore();

    const version = `v${APP_VERSION}`;
    const hasAnyAuthorityValues: Ref<any> = ref({});

    const openAPIEnabled = computed(() => store.activeProfiles.includes('api-docs'));
    const inProduction = computed(() => store.activeProfiles.includes('prod'));
    const authenticated = computed(() => store.authenticated);

    const subIsActive = (input: string | string[]) => {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return router.currentRoute.value.path.startsWith(path); // current path starts with this path string
      });
    };

    const logout = async () => {
      localStorage.removeItem('jhi-authenticationToken');
      sessionStorage.removeItem('jhi-authenticationToken');
      store.logout();
      if (router.currentRoute.value.path !== '/') {
        router.push('/');
      }
    };

    return {
      logout,
      subIsActive,
      accountService,
      showLogin,
      changeLanguage,
      languages: languages(),
      isActiveLanguage,
      version,
      currentLanguage,
      hasAnyAuthorityValues,
      openAPIEnabled,
      inProduction,
      authenticated,
      t$: useI18n().t,
    };
  },
  methods: {
    hasAnyAuthority(authorities: any): boolean {
      this.accountService.hasAnyAuthorityAndCheckAuth(authorities).then(value => {
        if (this.hasAnyAuthorityValues[authorities] !== value) {
          this.hasAnyAuthorityValues = { ...this.hasAnyAuthorityValues, [authorities]: value };
        }
      });
      return this.hasAnyAuthorityValues[authorities] ?? false;
    },
  },
});
