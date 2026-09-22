import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { createLogger } from 'vite'
import { fileURLToPath } from 'url'

// Suppress two upstream deprecation warnings that have no config-level fix:
// 1. optimizeDeps.esbuildOptions — flagged by Vite 5.4 but still required by some plugins
// 2. esbuild/oxc conflict — @vitejs/plugin-react-swc sets esbuild:false internally; Vitest 4 warns but there is no override
const logger = createLogger()
const warn = logger.warn.bind(logger)
logger.warn = (msg, opts) => {
  if (msg.includes('optimizeDeps.esbuildOptions')) return
  if (msg.includes('esbuild') && msg.includes('oxc')) return
  warn(msg, opts)
}

export default defineConfig({
  customLogger: logger,
  plugins: [react()],
  resolve: {
    alias: {
      // fileURLToPath decodes %20 — needed because the project path contains spaces
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/recharts'))     return 'vendor-charts'
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-router-dom')) return 'vendor-react'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
