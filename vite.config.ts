import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

const ENV_PREFIX = 'REACT_APP_'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env', ENV_PREFIX)
  return {
    base: '/pharmacy_frontend/',
    plugins: [
      react(),
      svgr(),
      checker({
        terminal: false,
        overlay: {
          initialIsOpen: false,
        },
        typescript: true,
        eslint: {
          lintCommand: 'eslint ./**/*.{ts,tsx}',
        },
      }),
    ],
    server: {
      port: 3000,
      open: env.SERVER_OPEN_BROWSER === 'true',
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@assets': resolve(__dirname, './assets'),
        '@pharmacy-ui': resolve(__dirname, './src/pharmacy-ui/index.ts'),
        '@hooks-api': resolve(__dirname, './src/hooks-api/index.ts'),
      },
    },
  }
})
