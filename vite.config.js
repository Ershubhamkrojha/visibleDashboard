import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 
  server: {
    proxy: {
      '/api': {
        target: 'https://visible-gain-dashboard.onrender.com', // Ensure this is the correct port for your backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  plugins: [react()],
})
