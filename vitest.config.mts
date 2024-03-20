import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        vue: 'vue',
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom', // happy-dom provides a better performance but doesn't have a default url.
      setupFiles: [fileURLToPath(new URL('./src/main/webapp/app/test-setup.ts', import.meta.url))],
      reporters: ['default', 'vitest-sonar-reporter'],
      outputFile: {
        'vitest-sonar-reporter': fileURLToPath(new URL('./target/test-results/TESTS-results-vitest.xml', import.meta.url)),
      },
      coverage: {
        provider: 'v8',
        statements: 85,
        branches: 75,
        lines: 85,
        reportsDirectory: fileURLToPath(new URL('./target/vite-coverage', import.meta.url)),
      },
    },
  }),
);
