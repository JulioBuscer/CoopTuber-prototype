import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ['@mediapipe/tasks-vision'],
    },
    target: 'esnext',
    modulePreload: {
      polyfill: true
    }
  },
  esbuild: {
    target: 'esnext'
  },
  optimizeDeps: {
    exclude: ['@mediapipe/tasks-vision'],
    esbuildOptions: {
      target: 'esnext'
    }
  }
})
