/**
 * @file vite.config.ts
 * Configuración de Vite para la aplicación CoopTuber
 * 
 * Este archivo contiene la configuración de Vite para:
 * - Plugins
 * - Servidor de desarrollo
 * - Build
 * - ESBuild
 * - Optimización de dependencias
 */

import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

/**
 * Configuración principal de Vite
 * @returns Configuración de Vite
 */
export default defineConfig({
  base:'/',
  /**
   * Plugins utilizados
   * - solid: Plugin para SolidJS
   */
  plugins: [solidPlugin()],

  /**
   * Configuración del servidor de desarrollo
   * - Headers de seguridad para CORS
   */
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },

  /**
   * Configuración del build
   * - Generación de sourcemaps
   * - Configuración de Rollup
   * - Target ESNext
   * - Polyfill para preload
   */
  build: {
    assetsDir: './',
    sourcemap: true,
    rollupOptions: {
      /**
       * Dependencias externas
       * - @mediapipe/tasks-vision: Excluida para evitar bundling
       */
      external: ['@mediapipe/tasks-vision'],
    },
    target: 'esnext',
    modulePreload: {
      polyfill: true
    }
  },

  /**
   * Configuración de ESBuild
   * - Target ESNext
   */
  esbuild: {
    target: 'esnext'
  },

  /**
   * Optimización de dependencias
   * - Exclusión de @mediapipe/tasks-vision
   * - Target ESNext
   */
  optimizeDeps: {
    exclude: ['@mediapipe/tasks-vision'],
    esbuildOptions: {
      target: 'esnext'
    }
  }
})
