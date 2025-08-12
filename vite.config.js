import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Use a relative base so the app can be served from any subpath (e.g., GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
})
