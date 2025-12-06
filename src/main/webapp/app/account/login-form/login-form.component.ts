import { type Ref, defineComponent, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import axios from 'axios';

import { useLoginModal } from '@/account/login-modal';
import type AccountService from '../account.service';

export default defineComponent({
  setup() {
    const authenticationError: Ref<boolean> = ref(false);
    const login: Ref<string> = ref(null);
    const password: Ref<string> = ref(null);
    const rememberMe: Ref<boolean> = ref(false);

    const { hideLogin } = useLoginModal();
    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const accountService = inject<AccountService>('accountService');

    const doLogin = async () => {
      const data = { username: login.value, password: password.value, rememberMe: rememberMe.value };
      try {
        const result = await axios.post('api/authenticate', data);
        const bearerToken = result.headers.authorization;
        if (bearerToken?.startsWith('Bearer ')) {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (rememberMe.value) {
            localStorage.setItem('jhi-authenticationToken', jwt);
            sessionStorage.removeItem('jhi-authenticationToken');
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
            localStorage.removeItem('jhi-authenticationToken');
          }
        }

        authenticationError.value = false;
        hideLogin();
        await accountService.retrieveAccount();
        if (route.path === '/forbidden') {
          previousState();
        }
      } catch {
        authenticationError.value = true;
      }
    };
    return {
      authenticationError,
      login,
      password,
      rememberMe,
      accountService,
      doLogin,
      t$: useI18n().t,
    };
  },
});
