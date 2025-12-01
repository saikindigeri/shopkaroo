// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Remove this line completely:
// import tailwindcss from '@tailwindcss/vite'  ← DOES NOT EXIST!

export default defineConfig({
  plugins: [react()],  // Only React plugin here

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://shopkaroo-pdso.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },

  // This makes sure assets (images, fonts) work on Vercel
  base: '/',
})