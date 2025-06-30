import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
    }) as any,
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/styles/variables.scss" as *;
        @use "sass:map";
        @use "@/assets/styles/mixins.scss" as *;
      `,
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
  base: '/', // Ensure this matches your BASE_URL

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@types': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
})
