import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor';
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/@splinetool')) return 'spline';
          if (id.includes('node_modules/@supabase')) return 'supabase';
          if (id.includes('node_modules/@emailjs')) return 'emailjs';
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  css: {
    devSourcemap: false
  }
})
