import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    // Include the Tailwind CSS plugin here
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Make the server accessible externally (needed for Render)
    port: 5173, // Use the port provided by Render or default to 5173
    strictPort: true, // Ensure the specified port is used
  },
  preview: {
    allowedHosts: ['.onrender.com', 'localhost'], // Allow Render and localhost for preview
  }
});
