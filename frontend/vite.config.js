import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  preview: {
    host: '0.0.0.0',  // Make the server accessible externally
    port: 4173,        // Use the same port as your local setup
    allowedHosts: ['alfredtask-5.onrender.com'], // Add your Render app's domain here
  },
})
