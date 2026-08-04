import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@lar/shared': fileURLToPath(new URL('../../packages/lar-shared/src/index.ts', import.meta.url)),
    },
  },
})
