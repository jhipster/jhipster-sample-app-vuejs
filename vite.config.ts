import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const { getAbsoluteFSPath } = await import('swagger-ui-dist');
const swaggerUiPath = getAbsoluteFSPath();
const webappDir = fileURLToPath(new URL('./src/main/webapp/', import.meta.url));

const config = defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: [
            `${normalizePath(swaggerUiPath)}/*.{js,css,html,png}`,
            `!${normalizePath(swaggerUiPath)}/**/index.html`,
            normalizePath(fileURLToPath(new URL('./dist/axios.min.js', import.meta.resolve('axios/package.json')))),
            normalizePath(fileURLToPath(new URL('./src/main/webapp/swagger-ui/index.html', import.meta.url))),
          ],
          dest: 'swagger-ui',
          rename: (name, ext, srcPath) => {
            const rel = path.relative(webappDir, path.dirname(srcPath)).replace(/^(\.\.\/)+/, '');
            return `${'../'.repeat(rel === '.' ? 0 : rel.split('/').length)}${name}.${ext}`;
          },
        },
      ],
    }),
  ],
  root: fileURLToPath(new URL('./src/main/webapp/', import.meta.url)),
  publicDir: fileURLToPath(new URL('./target/classes/static/public', import.meta.url)),
  cacheDir: fileURLToPath(new URL('./target/.vite-cache', import.meta.url)),
  optimizeDeps: {
    // Discover dependencies of lazily loaded modules (translations, ...) at startup,
    // a dependency discovered at runtime triggers a re-optimization and a page reload.
    entries: [fileURLToPath(new URL('./src/main/webapp/**/*.{ts,vue,js}', import.meta.url))],
  },
  build: {
    emptyOutDir: true,
    outDir: fileURLToPath(new URL('./target/classes/static/', import.meta.url)),
    rollupOptions: {
      input: {
        app: fileURLToPath(new URL('./src/main/webapp/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  define: {
    SERVER_API_URL: '"/"',
    APP_VERSION: `"${process.env.APP_VERSION ? process.env.APP_VERSION : 'DEV'}"`,
  },
  server: {
    host: true,
    port: 9000,
    proxy: Object.fromEntries(
      ['/api', '/management', '/v3/api-docs', '/h2-console'].map(res => [
        res,
        {
          target: 'http://localhost:8080',
        },
      ]),
    ),
  },
});

// jhipster-needle-add-vite-config - JHipster will add custom config

export default config;
