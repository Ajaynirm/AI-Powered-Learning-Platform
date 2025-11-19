import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env': process.env,
  },
  server: { // <-- This is where 'allowedHosts' belongs
    allowedHosts: ['3cb0074af127.ngrok-free.app'],
    // You might also need 'host: true' if running in a containerized environment (e.g., Docker)
    // host: true, 
  },
  
})


