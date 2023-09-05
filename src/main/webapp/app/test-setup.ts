import { beforeAll } from 'vitest';
import axios from 'axios';
import { config } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';

beforeAll(() => {
  window.location.href = 'https://jhipster.tech/';

  // Make sure axios is never executed.
  axios.interceptors.request.use(request => {
    throw new Error(`Error axios should be mocked ${request.url}`);
  });

  config.global.plugins.push(
    createI18n({
      legacy: false,
      missingWarn: false,
      fallbackWarn: false,
    }),
  );
});
