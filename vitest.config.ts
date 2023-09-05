import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import config from './webpack/config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': './src/main/webapp/app/',
    },
  },
  define: {
    I18N_HASH: '"generated_hash"',
    SERVER_API_URL: `"${config.serverApiUrl}"`,
    VERSION: `"${config.version}"`,
  },
  test: {
    globals: true,
    environment: 'happy-dom', // happy-dom provides a better performance but doesn't have a default url.
    setupFiles: ['./src/main/webapp/app/test-setup.ts'],
    reporters: ['default', 'vitest-sonar-reporter'],
    outputFile: {
      'vitest-sonar-reporter': './target/test-results/TESTS-results-vitest.xml',
    },
    coverage: {
      provider: 'v8',
      statements: 85,
      branches: 75,
      lines: 85,
    },
  },
});
