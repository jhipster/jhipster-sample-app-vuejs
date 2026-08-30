import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';

import type AccountService from '@/account/account.service';
import { useLoginModal } from '@/account/login-modal';
import EntitiesMenu from '@/entities/entities-menu.vue';
import languages from '@/shared/config/languages';
import { AUTHENTICATION_TOKEN_KEY } from '@/shared/jhipster/constants';
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

    const isActiveLanguage = (key: string) => key === currentLanguage.value;

    const router = useRouter();
    const store = useStore();

    const version = `v${APP_VERSION}`;
    const hasAnyAuthorityValues: Ref = ref({});

    const openAPIEnabled = computed(() => store.activeProfiles.includes('api-docs'));
    const inProduction = computed(() => store.activeProfiles.includes('prod'));
    const { authenticated } = storeToRefs(store);

    const subIsActive = (input: string | string[]) => {
      const paths = Array.isArray(input) ? input : [input];
      // current path starts with this path string
      return paths.some(path => router.currentRoute.value.path.startsWith(path));
    };

    const logout = async () => {
      localStorage.removeItem(AUTHENTICATION_TOKEN_KEY);
      sessionStorage.removeItem(AUTHENTICATION_TOKEN_KEY);
      store.logout();
      if (router.currentRoute.value.path !== '/') {
        await router.push('/');
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
