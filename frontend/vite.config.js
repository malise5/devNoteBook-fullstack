import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
    react()],

  define:{

  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      
    },
  },
})
