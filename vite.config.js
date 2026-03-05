import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // Si la variable DEPLOY_ENV existe y es 'gh-pages', usa esa base.
  // Si no, por defecto usa la ruta raíz '/' (que es la correcta para Netlify y Local)
  base: process.env.DEPLOY_ENV === 'gh-pages' ? '/m7_abp_product-showcase/' : '/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
