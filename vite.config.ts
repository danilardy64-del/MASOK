import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the warning limit to 1500kb to suppress warnings for necessary large libs
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate third-party dependencies into their own chunks
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('@google/genai')) {
              return 'vendor-genai';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'vendor-pdf';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // Put other small node_modules in a generic vendor file
            return 'vendor-utils';
          }
        }
      }
    }
  },
  define: {
    // API Key injection required for the frontend
    'process.env.API_KEY': JSON.stringify("AIzaSyD16HjE2Cg70oHx-iLwYPb3UutzvDJvLx8"),
  }
})