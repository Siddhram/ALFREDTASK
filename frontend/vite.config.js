import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  preview: {
    host: '0.0.0.0', // Make the server accessible externally
    port: 4173, // You can specify a port here, just like the local one
  },
})
