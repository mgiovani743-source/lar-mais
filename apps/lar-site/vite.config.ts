import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lar/shared': path.resolve(__dirname, '../../packages/lar-shared/src/index.ts'),
    },
  },
})
