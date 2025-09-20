import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting and chunk optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          spline: ['@splinetool/react-spline'],
          supabase: ['@supabase/supabase-js'],
          emailjs: ['@emailjs/browser']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Use esbuild for minification (faster and less memory intensive)
    minify: 'esbuild'
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false // Reduce HMR overhead
    }
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false // Disable CSS sourcemaps in dev for better performance
  }
})
