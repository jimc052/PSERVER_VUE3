import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 使用相对路径
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: "/Users/jimc/Documents/git.io/jimc052.github.io/PSERVER_VUE3", // 'dist',
    assetsDir: 'assets',
    rollupOptions: {
        output: {
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,
            assetFileNames: `assets/[name].[ext]`
        }
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  }
})
